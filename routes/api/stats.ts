/**
 * Statistics API Routes
 * Provides dashboard statistics for subscriptions and foods
 */

import { Handlers } from "$fresh/server.ts";
import { SubscriptionService } from "../../lib/services/subscription-service.ts";
import { FoodService } from "../../lib/services/food-service.ts";
import { AuthService } from "../../lib/services/auth-service.ts";

const subscriptionService = SubscriptionService.getInstance();
const foodService = FoodService.getInstance();
const authService = AuthService.getInstance();

export const handler: Handlers = {
  // GET /api/stats - 取得統計數據
  async GET(req) {
    try {
      await authService.initialize();
      
      const url = new URL(req.url);
      const type = url.searchParams.get("type");

      if (type === "subscriptions") {
        const stats = await subscriptionService.getSubscriptionStats();
        return new Response(JSON.stringify({
          success: true,
          data: stats,
        }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (type === "foods") {
        const stats = await foodService.getFoodStats();
        return new Response(JSON.stringify({
          success: true,
          data: stats,
        }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // 取得所有統計數據
      const [subscriptionStats, foodStats] = await Promise.all([
        subscriptionService.getSubscriptionStats(),
        foodService.getFoodStats(),
      ]);

      return new Response(JSON.stringify({
        success: true,
        data: {
          subscriptions: subscriptionStats,
          foods: foodStats,
        },
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("GET /api/stats error:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};