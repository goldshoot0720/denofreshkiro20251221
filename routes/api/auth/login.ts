/**
 * Login API Route
 * Handles user authentication
 */

import { Handlers } from "$fresh/server.ts";
import { AuthService } from "../../../lib/services/auth-service.ts";

const authService = AuthService.getInstance();

export const handler: Handlers = {
  // POST /api/auth/login - 用戶登入
  async POST(req) {
    try {
      await authService.initialize();
      
      const { username, password } = await req.json();
      
      if (!username || !password) {
        return new Response(JSON.stringify({
          success: false,
          error: "Username and password are required",
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const user = await authService.login(username, password);
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          user,
          sessionToken: user.sessionToken,
        },
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Login error:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};