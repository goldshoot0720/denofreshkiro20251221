/**
 * Single Food Item API Routes
 * Handles operations for individual food items
 */

import { Handlers } from "$fresh/server.ts";
import { FoodService } from "../../../lib/services/food-service.ts";
import type { CreateFoodData } from "../../../lib/types/models.ts";

const foodService = FoodService.getInstance();

export const handler: Handlers = {
  // GET /api/foods/[id] - 取得單一食品項目
  async GET(req, ctx) {
    try {
      const { id } = ctx.params;
      const food = await foodService.getFood(id);
      
      if (!food) {
        return new Response(JSON.stringify({
          success: false,
          error: "Food item not found",
        }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        success: true,
        data: food,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(`GET /api/foods/${ctx.params.id} error:`, error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  // PUT /api/foods/[id] - 更新食品項目
  async PUT(req, ctx) {
    try {
      const { id } = ctx.params;
      const data: Partial<CreateFoodData> = await req.json();
      
      const food = await foodService.updateFood(id, data);
      
      return new Response(JSON.stringify({
        success: true,
        data: food,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(`PUT /api/foods/${ctx.params.id} error:`, error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  // DELETE /api/foods/[id] - 刪除食品項目
  async DELETE(req, ctx) {
    try {
      const { id } = ctx.params;
      await foodService.deleteFood(id);
      
      return new Response(JSON.stringify({
        success: true,
        message: "Food item deleted successfully",
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(`DELETE /api/foods/${ctx.params.id} error:`, error);
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