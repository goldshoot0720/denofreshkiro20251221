/**
 * 完整的 CRUD 測試
 * 測試訂閱管理和食品管理的所有 CRUD 操作
 */

import "https://deno.land/std@0.216.0/dotenv/load.ts";

async function testCRUD() {
  console.log("🚀 開始完整的 CRUD 測試...\n");

  const baseUrl = "http://localhost:8000/api";
  let testResults = {
    subscriptions: { create: false, read: false, update: false, delete: false },
    foods: { create: false, read: false, update: false, delete: false }
  };

  try {
    // ========== 訂閱管理 CRUD 測試 ==========
    console.log("📋 測試訂閱管理 CRUD 操作");
    console.log("=" .repeat(50));

    // 1. CREATE - 建立訂閱
    console.log("1️⃣ 測試建立訂閱...");
    const createSubscriptionResponse = await fetch(`${baseUrl}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Spotify Premium",
        price: 149,
        nextdate: "2025-02-15",
        site: "https://spotify.com",
        account: "test@example.com",
        note: "個人音樂串流服務"
      })
    });

    if (createSubscriptionResponse.ok) {
      const createResult = await createSubscriptionResponse.json();
      if (createResult.success) {
        console.log("   ✅ 訂閱建立成功:", createResult.data.name);
        testResults.subscriptions.create = true;
        var subscriptionId = createResult.data.objectId;
      } else {
        console.log("   ❌ 訂閱建立失敗:", createResult.error);
      }
    } else {
      console.log("   ❌ 訂閱建立請求失敗:", createSubscriptionResponse.statusText);
    }

    // 2. READ - 讀取訂閱列表
    console.log("\n2️⃣ 測試讀取訂閱列表...");
    const readSubscriptionsResponse = await fetch(`${baseUrl}/subscriptions`);
    
    if (readSubscriptionsResponse.ok) {
      const readResult = await readSubscriptionsResponse.json();
      if (readResult.success) {
        console.log(`   ✅ 訂閱列表讀取成功，共 ${readResult.data.length} 筆資料`);
        testResults.subscriptions.read = true;
        
        // 顯示部分資料
        if (readResult.data.length > 0) {
          const latest = readResult.data[0];
          console.log(`   📄 最新訂閱: ${latest.name} - $${latest.price}`);
        }
      } else {
        console.log("   ❌ 訂閱列表讀取失敗:", readResult.error);
      }
    } else {
      console.log("   ❌ 訂閱列表請求失敗:", readSubscriptionsResponse.statusText);
    }

    // 3. UPDATE - 更新訂閱
    if (subscriptionId) {
      console.log("\n3️⃣ 測試更新訂閱...");
      const updateSubscriptionResponse = await fetch(`${baseUrl}/subscriptions/${subscriptionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: 179,
          note: "升級為家庭方案"
        })
      });

      if (updateSubscriptionResponse.ok) {
        const updateResult = await updateSubscriptionResponse.json();
        if (updateResult.success) {
          console.log("   ✅ 訂閱更新成功，新價格:", updateResult.data.price);
          testResults.subscriptions.update = true;
        } else {
          console.log("   ❌ 訂閱更新失敗:", updateResult.error);
        }
      } else {
        console.log("   ❌ 訂閱更新請求失敗:", updateSubscriptionResponse.statusText);
      }
    }

    // 4. DELETE - 刪除訂閱
    if (subscriptionId) {
      console.log("\n4️⃣ 測試刪除訂閱...");
      const deleteSubscriptionResponse = await fetch(`${baseUrl}/subscriptions/${subscriptionId}`, {
        method: "DELETE"
      });

      if (deleteSubscriptionResponse.ok) {
        const deleteResult = await deleteSubscriptionResponse.json();
        if (deleteResult.success) {
          console.log("   ✅ 訂閱刪除成功");
          testResults.subscriptions.delete = true;
        } else {
          console.log("   ❌ 訂閱刪除失敗:", deleteResult.error);
        }
      } else {
        console.log("   ❌ 訂閱刪除請求失敗:", deleteSubscriptionResponse.statusText);
      }
    }

    console.log("\n" + "=" .repeat(50));

    // ========== 食品管理 CRUD 測試 ==========
    console.log("🍎 測試食品管理 CRUD 操作");
    console.log("=" .repeat(50));

    // 1. CREATE - 建立食品
    console.log("1️⃣ 測試建立食品...");
    const createFoodResponse = await fetch(`${baseUrl}/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "有機雞蛋",
        amount: 12,
        price: 120,
        shop: "有機超市",
        todate: "2025-01-10"
      })
    });

    if (createFoodResponse.ok) {
      const createResult = await createFoodResponse.json();
      if (createResult.success) {
        console.log("   ✅ 食品建立成功:", createResult.data.name);
        testResults.foods.create = true;
        var foodId = createResult.data.objectId;
      } else {
        console.log("   ❌ 食品建立失敗:", createResult.error);
      }
    } else {
      console.log("   ❌ 食品建立請求失敗:", createFoodResponse.statusText);
    }

    // 2. READ - 讀取食品列表
    console.log("\n2️⃣ 測試讀取食品列表...");
    const readFoodsResponse = await fetch(`${baseUrl}/foods`);
    
    if (readFoodsResponse.ok) {
      const readResult = await readFoodsResponse.json();
      if (readResult.success) {
        console.log(`   ✅ 食品列表讀取成功，共 ${readResult.data.length} 筆資料`);
        testResults.foods.read = true;
        
        // 顯示部分資料
        if (readResult.data.length > 0) {
          const latest = readResult.data[0];
          console.log(`   🥚 最新食品: ${latest.name || '未命名'} - 數量: ${latest.amount}`);
        }
      } else {
        console.log("   ❌ 食品列表讀取失敗:", readResult.error);
      }
    } else {
      console.log("   ❌ 食品列表請求失敗:", readFoodsResponse.statusText);
    }

    // 3. UPDATE - 更新食品
    if (foodId) {
      console.log("\n3️⃣ 測試更新食品...");
      const updateFoodResponse = await fetch(`${baseUrl}/foods/${foodId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 6,
          price: 60,
          todate: "2025-01-08"
        })
      });

      if (updateFoodResponse.ok) {
        const updateResult = await updateFoodResponse.json();
        if (updateResult.success) {
          console.log("   ✅ 食品更新成功，新數量:", updateResult.data.amount);
          testResults.foods.update = true;
        } else {
          console.log("   ❌ 食品更新失敗:", updateResult.error);
        }
      } else {
        console.log("   ❌ 食品更新請求失敗:", updateFoodResponse.statusText);
      }
    }

    // 4. DELETE - 刪除食品
    if (foodId) {
      console.log("\n4️⃣ 測試刪除食品...");
      const deleteFoodResponse = await fetch(`${baseUrl}/foods/${foodId}`, {
        method: "DELETE"
      });

      if (deleteFoodResponse.ok) {
        const deleteResult = await deleteFoodResponse.json();
        if (deleteResult.success) {
          console.log("   ✅ 食品刪除成功");
          testResults.foods.delete = true;
        } else {
          console.log("   ❌ 食品刪除失敗:", deleteResult.error);
        }
      } else {
        console.log("   ❌ 食品刪除請求失敗:", deleteFoodResponse.statusText);
      }
    }

    console.log("\n" + "=" .repeat(50));

    // ========== 測試結果總結 ==========
    console.log("📊 CRUD 測試結果總結");
    console.log("=" .repeat(50));

    console.log("\n📋 訂閱管理系統:");
    console.log(`   建立 (CREATE): ${testResults.subscriptions.create ? '✅ 通過' : '❌ 失敗'}`);
    console.log(`   讀取 (READ):   ${testResults.subscriptions.read ? '✅ 通過' : '❌ 失敗'}`);
    console.log(`   更新 (UPDATE): ${testResults.subscriptions.update ? '✅ 通過' : '❌ 失敗'}`);
    console.log(`   刪除 (DELETE): ${testResults.subscriptions.delete ? '✅ 通過' : '❌ 失敗'}`);

    console.log("\n🍎 食品管理系統:");
    console.log(`   建立 (CREATE): ${testResults.foods.create ? '✅ 通過' : '❌ 失敗'}`);
    console.log(`   讀取 (READ):   ${testResults.foods.read ? '✅ 通過' : '❌ 失敗'}`);
    console.log(`   更新 (UPDATE): ${testResults.foods.update ? '✅ 通過' : '❌ 失敗'}`);
    console.log(`   刪除 (DELETE): ${testResults.foods.delete ? '✅ 通過' : '❌ 失敗'}`);

    // 計算總體成功率
    const totalTests = 8;
    const passedTests = Object.values(testResults.subscriptions).filter(Boolean).length + 
                       Object.values(testResults.foods).filter(Boolean).length;
    const successRate = (passedTests / totalTests * 100).toFixed(1);

    console.log(`\n🎯 總體測試結果: ${passedTests}/${totalTests} 通過 (${successRate}%)`);

    if (passedTests === totalTests) {
      console.log("\n🎉 所有 CRUD 操作測試通過！系統完全正常運作！");
    } else {
      console.log(`\n⚠️  有 ${totalTests - passedTests} 個測試失敗，請檢查相關功能。`);
    }

  } catch (error) {
    console.error("\n❌ CRUD 測試過程中發生錯誤:", error.message);
  }
}

if (import.meta.main) {
  testCRUD();
}