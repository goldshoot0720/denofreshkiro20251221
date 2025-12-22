/**
 * Single Subscription API Routes
 * Handles operations for individual subscriptions
 */

import { Handlers } from "$fresh/server.ts";
import { SubscriptionService } from "../../../lib/services/subscription-service.ts";
import type { CreateSubscriptionData } from "../../../lib/types/models.ts";

const subscriptionService = SubscriptionService.getInstance();

export const handler: Handlers = {
  // GET /api/subscriptions/[id] - 取得單一訂閱
  async GET(req, ctx) {
    try {
      const { id } = ctx.params;
      const subscription = await subscriptionService.getSubscription(id);
      
      if (!subscription) {
        return new Response(JSON.stringify({
          success: false,
          error: "Subscription not found",
        }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        success: true,
        data: subscription,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(`GET /api/subscriptions/${ctx.params.id} error:`, error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  // PUT /api/subscriptions/[id] - 更新訂閱
  async PUT(req, ctx) {
    try {
      const { id } = ctx.params;
      const data: Partial<CreateSubscriptionData> = await req.json();
      
      const subscription = await subscriptionService.updateSubscription(id, data);
      
      return new Response(JSON.stringify({
        success: true,
        data: subscription,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(`PUT /api/subscriptions/${ctx.params.id} error:`, error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  // DELETE /api/subscriptions/[id] - 刪除訂閱
  async DELETE(req, ctx) {
    try {
      const { id } = ctx.params;
      await subscriptionService.deleteSubscription(id);
      
      return new Response(JSON.stringify({
        success: true,
        message: "Subscription deleted successfully",
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(`DELETE /api/subscriptions/${ctx.params.id} error:`, error);
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