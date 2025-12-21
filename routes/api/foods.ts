/**
 * Foods API Routes
 * Handles CRUD operations for food management
 */

import { Handlers } from "$fresh/server.ts";
import { FoodService } from "../../lib/services/food-service.ts";
import { Back4AppRestClient } from "../../lib/services/back4app-rest-client.ts";
import type { CreateFoodData, FoodQueryOptions } from "../../lib/types/models.ts";

const foodService = FoodService.getInstance();
const back4appClient = Back4AppRestClient.getInstance();

export const handler: Handlers = {
  // GET /api/foods - 取得食品列表
  async GET(req) {
    try {
      await back4appClient.initialize();
      
      const url = new URL(req.url);
      const options: FoodQueryOptions = {
        status: url.searchParams.get("status") || undefined,
        category: url.searchParams.get("category") || undefined,
        search: url.searchParams.get("search") || undefined,
        expiringWithinDays: url.searchParams.get("expiringWithinDays") ? 
          parseInt(url.searchParams.get("expiringWithinDays")!) : undefined,
        sortBy: (url.searchParams.get("sortBy") as any) || undefined,
        sortOrder: (url.searchParams.get("sortOrder") as "asc" | "desc") || undefined,
        limit: url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")!) : undefined,
        skip: url.searchParams.get("skip") ? parseInt(url.searchParams.get("skip")!) : undefined,
      };

      const foods = await foodService.getFoods(options);
      
      return new Response(JSON.stringify({
        success: true,
        data: foods,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("GET /api/foods error:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  // POST /api/foods - 建立新食品項目
  async POST(req) {
    try {
      await back4appClient.initialize();
      
      const data: CreateFoodData = await req.json();
      
      // 驗證必要欄位 (Back4App food 表沒有必填欄位，除了 name)
      if (!data.name) {
        return new Response(JSON.stringify({
          success: false,
          error: "Missing required field: name",
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const food = await foodService.createFood(data);
      
      return new Response(JSON.stringify({
        success: true,
        data: food,
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("POST /api/foods error:", error);
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