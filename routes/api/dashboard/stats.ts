/**
 * Dashboard Statistics API
 * 儀表板統計資料 API 端點
 */

import { Handlers } from "$fresh/server.ts";
import { SubscriptionService } from "../../../lib/services/subscription-service.ts";
import { FoodService } from "../../../lib/services/food-service.ts";

const subscriptionService = SubscriptionService.getInstance();
const foodService = FoodService.getInstance();

export const handler: Handlers = {
  // GET /api/dashboard/stats - 取得儀表板統計資料
  async GET(req, ctx) {
    try {
      // 載入所有訂閱和食品資料
      const [subscriptions, foods] = await Promise.all([
        subscriptionService.getSubscriptions(),
        foodService.getFoods(),
      ]);

      const today = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(today.getDate() + 3);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      // 計算訂閱統計
      const subscriptionStats = {
        total: subscriptions.length,
        expiring3Days: 0,
        expiring7Days: 0,
        expired: 0,
        totalMonthlySpending: 0,
      };

      subscriptions.forEach(sub => {
        if (sub.nextdate) {
          // 處理 Parse 日期格式
          const nextDateStr = sub.nextdate?.iso || sub.nextdate;
          const nextDate = new Date(nextDateStr);
          const diffTime = nextDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 0) {
            subscriptionStats.expired++;
          } else if (diffDays <= 3) {
            subscriptionStats.expiring3Days++;
          } else if (diffDays <= 7) {
            subscriptionStats.expiring7Days++;
          }
        }

        // 計算月度支出（假設都是月付）
        if (sub.price) {
          subscriptionStats.totalMonthlySpending += sub.price;
        }
      });

      // 計算食品統計
      const foodStats = {
        total: foods.length,
        expiring7Days: 0,
        expiring30Days: 0,
        expired: 0,
        totalValue: 0,
      };

      foods.forEach(food => {
        if (food.todate) {
          // 處理 Parse 日期格式
          const expiryDateStr = food.todate?.iso || food.todate;
          const expiryDate = new Date(expiryDateStr);
          const diffTime = expiryDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 0) {
            foodStats.expired++;
          } else if (diffDays <= 7) {
            foodStats.expiring7Days++;
          } else if (diffDays <= 30) {
            foodStats.expiring30Days++;
          }
        }

        // 計算總價值
        if (food.price && food.amount) {
          foodStats.totalValue += food.price * food.amount;
        }
      });

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
      console.error("GET /api/dashboard/stats error:", error);
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