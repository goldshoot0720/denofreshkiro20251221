/**
 * Initialize Test Data API
 * 初始化測試數據
 */

import { Handlers } from "$fresh/server.ts";
import { Back4AppRestClient } from "../../lib/services/back4app-rest-client.ts";

export const handler: Handlers = {
  async POST() {
    try {
      const client = Back4AppRestClient.getInstance();
      await client.initialize();

      // 創建測試訂閱數據
      const testSubscription = {
        name: "Netflix",
        price: 390,
        nextdate: new Date("2025-01-15"),
        site: "https://netflix.com",
        account: "test@example.com",
        note: "測試訂閱數據",
        status: "active",
        billingCycle: "monthly"
      };

      // 創建測試食品數據
      const testFood = {
        name: "牛奶",
        brand: "光泉",
        category: "乳製品",
        quantity: 1,
        unit: "瓶",
        price: 25,
        currency: "TWD",
        purchaseDate: new Date("2024-12-20"),
        expiryDate: new Date("2024-12-30"),
        status: "fresh",
        location: "冰箱",
        notes: "測試食品數據"
      };

      const results = [];

      try {
        const subscription = await client.create("subscription", testSubscription);
        results.push({ type: "subscription", success: true, data: subscription });
      } catch (error) {
        results.push({ type: "subscription", success: false, error: error.message });
      }

      try {
        const food = await client.create("food", testFood);
        results.push({ type: "food", success: true, data: food });
      } catch (error) {
        results.push({ type: "food", success: false, error: error.message });
      }

      return new Response(JSON.stringify({
        success: true,
        message: "Test data initialization completed",
        results
      }), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: "Failed to initialize test data",
        error: error.message
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};