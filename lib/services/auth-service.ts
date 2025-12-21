/**
 * Authentication Service
 * Handles user authentication with Back4App and session management
 */

import { Back4AppClient } from "./back4app-client.ts";
import type { AuthCredentials, ParseUser, ApiError } from "../types/api.ts";

export interface AuthState {
  isAuthenticated: boolean;
  user: ParseUser | null;
  sessionToken: string | null;
}

export class AuthService {
  private static instance: AuthService;
  private back4appClient: Back4AppClient;
  private authState: AuthState;
  private listeners: Array<(state: AuthState) => void> = [];

  private constructor() {
    this.back4appClient = Back4AppClient.getInstance();
    this.authState = {
      isAuthenticated: false,
      user: null,
      sessionToken: null,
    };
  }

  /**
   * Get singleton instance of AuthService
   */
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize authentication service
   */
  async initialize(): Promise<void> {
    try {
      await this.back4appClient.initialize();
      
      // Try to restore session from localStorage if available
      await this.restoreSession();
    } catch (error) {
      console.error("Failed to initialize auth service:", error);
      throw error;
    }
  }

  /**
   * Authenticate user with username and password
   */
  async login(username: string, password: string): Promise<ParseUser> {
    try {
      const user = await this.back4appClient.authenticate({
        username,
        password,
      });

      this.updateAuthState({
        isAuthenticated: true,
        user,
        sessionToken: user.sessionToken,
      });

      // Store session token for persistence
      this.storeSession(user.sessionToken);

      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw this.createAuthError("Login failed", error);
    }
  }

  /**
   * Authenticate user with session token
   */
  async loginWithSessionToken(sessionToken: string): Promise<ParseUser> {
    try {
      const user = await this.back4appClient.authenticate({
        sessionToken,
      });

      this.updateAuthState({
        isAuthenticated: true,
        user,
        sessionToken: user.sessionToken,
      });

      return user;
    } catch (error) {
      console.error("Session token authentication failed:", error);
      // Clear invalid session
      this.clearSession();
      throw this.createAuthError("Session authentication failed", error);
    }
  }

  /**
   * Log out current user
   */
  async logout(): Promise<void> {
    try {
      // Clear local state
      this.updateAuthState({
        isAuthenticated: false,
        user: null,
        sessionToken: null,
      });

      // Clear stored session
      this.clearSession();

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state
      this.updateAuthState({
        isAuthenticated: false,
        user: null,
        sessionToken: null,
      });
      this.clearSession();
    }
  }

  /**
   * Get current authentication state
   */
  getAuthState(): AuthState {
    return { ...this.authState };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  /**
   * Get current user
   */
  getCurrentUser(): ParseUser | null {
    return this.authState.user;
  }

  /**
   * Get current session token
   */
  getSessionToken(): string | null {
    return this.authState.sessionToken;
  }

  /**
   * Subscribe to authentication state changes
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Refresh current user session
   */
  async refreshSession(): Promise<ParseUser | null> {
    if (!this.authState.sessionToken) {
      return null;
    }

    try {
      const user = await this.loginWithSessionToken(this.authState.sessionToken);
      return user;
    } catch (error) {
      console.error("Session refresh failed:", error);
      await this.logout();
      return null;
    }
  }

  /**
   * Update authentication state and notify listeners
   */
  private updateAuthState(newState: AuthState): void {
    this.authState = { ...newState };
    this.notifyListeners();
  }

  /**
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.getAuthState());
      } catch (error) {
        console.error("Error in auth state listener:", error);
      }
    });
  }

  /**
   * Store session token in localStorage
   */
  private storeSession(sessionToken: string): void {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("back4app_session_token", sessionToken);
      }
    } catch (error) {
      console.warn("Failed to store session token:", error);
    }
  }

  /**
   * Clear stored session token
   */
  private clearSession(): void {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("back4app_session_token");
      }
    } catch (error) {
      console.warn("Failed to clear session token:", error);
    }
  }

  /**
   * Restore session from localStorage
   */
  private async restoreSession(): Promise<void> {
    try {
      if (typeof localStorage === "undefined") {
        return;
      }

      const sessionToken = localStorage.getItem("back4app_session_token");
      if (sessionToken) {
        await this.loginWithSessionToken(sessionToken);
      }
    } catch (error) {
      console.warn("Failed to restore session:", error);
      this.clearSession();
    }
  }

  /**
   * Create standardized authentication error
   */
  private createAuthError(message: string, originalError: any): Error {
    const error = new Error(message);
    error.cause = originalError;
    return error;
  }

  /**
   * Handle authentication errors with retry logic
   */
  async handleAuthError(error: any): Promise<boolean> {
    if (error.message?.includes("invalid session token")) {
      // Try to refresh session
      const refreshedUser = await this.refreshSession();
      return refreshedUser !== null;
    }

    if (error.message?.includes("unauthorized")) {
      // Force logout on unauthorized errors
      await this.logout();
      return false;
    }

    // For other errors, don't automatically handle
    return false;
  }
}