/**
 * 環境變數測試
 */

import "https://deno.land/std@0.216.0/dotenv/load.ts";

console.log("🔧 檢查環境變數...");
console.log("BACK4APP_APPLICATION_ID:", Deno.env.get("BACK4APP_APPLICATION_ID"));
console.log("BACK4APP_REST_API_KEY:", Deno.env.get("BACK4APP_REST_API_KEY"));
console.log("BACK4APP_MASTER_KEY:", Deno.env.get("BACK4APP_MASTER_KEY"));
console.log("BACK4APP_SERVER_URL:", Deno.env.get("BACK4APP_SERVER_URL"));

// 測試直接 API 調用
async function testDirectAPI() {
  console.log("\n🧪 測試直接 Back4App API 調用...");
  
  const headers = {
    "X-Parse-Application-Id": Deno.env.get("BACK4APP_APPLICATION_ID")!,
    "X-Parse-Master-Key": Deno.env.get("BACK4APP_MASTER_KEY")!,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch("https://parseapi.back4app.com/classes/subscription", {
      method: "GET",
      headers,
    });

    const result = await response.json();
    console.log("直接 API 回應:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("直接 API 調用失敗:", error);
  }
}

testDirectAPI();