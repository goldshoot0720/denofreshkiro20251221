/**
 * Subscriptions API Routes
 * Handles CRUD operations for subscription management
 */

import { Handlers } from "$fresh/server.ts";
import { SubscriptionService } from "../../lib/services/subscription-service.ts";
import type { CreateSubscriptionData, SubscriptionQueryOptions } from "../../lib/types/models.ts";

const subscriptionService = SubscriptionService.getInstance();

export const handler: Handlers = {
  // GET /api/subscriptions - 取得訂閱列表
  async GET(req) {
    try {
      const url = new URL(req.url);
      const options: SubscriptionQueryOptions = {
        status: url.searchParams.get("status") || undefined,
        category: url.searchParams.get("category") || undefined,
        search: url.searchParams.get("search") || undefined,
        sortBy: (url.searchParams.get("sortBy") as any) || undefined,
        sortOrder: (url.searchParams.get("sortOrder") as "asc" | "desc") || undefined,
        limit: url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")!) : undefined,
        skip: url.searchParams.get("skip") ? parseInt(url.searchParams.get("skip")!) : undefined,
      };

      const subscriptions = await subscriptionService.getSubscriptions(options);
      
      return new Response(JSON.stringify({
        success: true,
        data: subscriptions,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("GET /api/subscriptions error:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  // POST /api/subscriptions - 建立新訂閱
  async POST(req) {
    try {
      const data: CreateSubscriptionData = await req.json();
      
      // 驗證必要欄位
      if (!data.name) {
        return new Response(JSON.stringify({
          success: false,
          error: "Missing required field: name",
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const subscription = await subscriptionService.createSubscription(data);
      
      return new Response(JSON.stringify({
        success: true,
        data: subscription,
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("POST /api/subscriptions error:", error);
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