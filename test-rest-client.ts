/**
 * 測試 Back4App REST 客戶端
 */

import "https://deno.land/std@0.216.0/dotenv/load.ts";
import { Back4AppRestClient } from "./lib/services/back4app-rest-client.ts";

async function testRestClient() {
  console.log("🧪 測試 Back4App REST 客戶端...\n");

  try {
    const client = Back4AppRestClient.getInstance();
    
    console.log("1. 初始化客戶端...");
    await client.initialize();
    console.log("✅ 客戶端初始化成功");

    console.log("\n2. 查詢訂閱資料...");
    const subscriptions = await client.query("subscription", {});
    console.log("✅ 查詢成功，資料:", JSON.stringify(subscriptions, null, 2));

    console.log("\n3. 查詢食品資料...");
    const foods = await client.query("food", {});
    console.log("✅ 查詢成功，資料:", JSON.stringify(foods, null, 2));

  } catch (error) {
    console.error("❌ 測試失敗:", error);
  }
}

testRestClient();