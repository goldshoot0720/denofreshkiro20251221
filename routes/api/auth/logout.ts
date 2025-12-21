/**
 * Logout API Route
 * Handles user logout
 */

import { Handlers } from "$fresh/server.ts";
import { AuthService } from "../../../lib/services/auth-service.ts";

const authService = AuthService.getInstance();

export const handler: Handlers = {
  // POST /api/auth/logout - 用戶登出
  async POST() {
    try {
      await authService.initialize();
      await authService.logout();
      
      return new Response(JSON.stringify({
        success: true,
        message: "Logged out successfully",
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Logout error:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Logout failed",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};