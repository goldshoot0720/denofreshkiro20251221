/**
 * API 測試腳本
 * 測試前端 API 端點是否正常工作
 */

async function testAPIs() {
  console.log("🧪 開始測試 API 端點...\n");

  try {
    // 測試訂閱 API
    console.log("📋 測試訂閱 API...");
    const subscriptionsResponse = await fetch("http://localhost:8000/api/subscriptions");
    const subscriptionsResult = await subscriptionsResponse.json();
    console.log("訂閱 API 回應:", JSON.stringify(subscriptionsResult, null, 2));

    // 測試食品 API
    console.log("\n🍎 測試食品 API...");
    const foodsResponse = await fetch("http://localhost:8000/api/foods");
    const foodsResult = await foodsResponse.json();
    console.log("食品 API 回應:", JSON.stringify(foodsResult, null, 2));

    // 測試儀表板統計 API
    console.log("\n📊 測試儀表板統計 API...");
    const statsResponse = await fetch("http://localhost:8000/api/dashboard/stats");
    const statsResult = await statsResponse.json();
    console.log("統計 API 回應:", JSON.stringify(statsResult, null, 2));

  } catch (error) {
    console.error("❌ API 測試失敗:", error);
  }
}

if (import.meta.main) {
  testAPIs();
}