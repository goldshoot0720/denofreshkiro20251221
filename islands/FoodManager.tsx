/**
 * Food Manager Island
 * Interactive component for managing food items with Back4App integration
 */

import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { Food, CreateFoodData } from "../lib/types/models.ts";

interface FoodManagerProps {
  initialFoods?: Food[];
}

const foods = signal<Food[]>([]);
const loading = signal(false);
const error = signal<string | null>(null);
const searchTerm = signal("");
const showAddForm = signal(false);
const editingFood = signal<Food | null>(null);

// 表單狀態
const formData = signal<CreateFoodData>({
  name: "",
  amount: 1,
  price: 0,
  shop: "",
  todate: "",
  photo: "",
  photohash: "",
});

// 載入食品列表
const loadFoods = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("/api/foods");
    const result = await response.json();
    
    if (result.success) {
      // 處理日期格式轉換
      const processedData = result.data.map((food: any) => ({
        ...food,
        todate: food.todate?.iso ? food.todate.iso.split('T')[0] : food.todate,
      }));
      foods.value = processedData;
    } else {
      error.value = result.error || "載入食品失敗";
    }
  } catch (err) {
    error.value = "網路錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};

// 建立或更新食品
const saveFood = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const url = editingFood.value 
      ? `/api/foods/${editingFood.value.objectId}`
      : "/api/foods";
    
    const method = editingFood.value ? "PUT" : "POST";
    
    // 準備資料，確保日期格式正確
    const submitData = {
      ...formData.value,
      todate: formData.value.todate || undefined, // 讓後端處理日期轉換
    };
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      await loadFoods();
      resetForm();
    } else {
      error.value = result.error || "儲存失敗";
    }
  } catch (err) {
    error.value = "網路錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};

// 刪除食品
const deleteFood = async (id: string) => {
  if (!confirm("確定要刪除這個食品項目嗎？")) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(`/api/foods/${id}`, {
      method: "DELETE",
    });
    
    const result = await response.json();
    
    if (result.success) {
      await loadFoods();
    } else {
      error.value = result.error || "刪除失敗";
    }
  } catch (err) {
    error.value = "網路錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};

// 重置表單
const resetForm = () => {
  formData.value = {
    name: "",
    amount: 1,
    price: 0,
    shop: "",
    todate: "",
    photo: "",
    photohash: "",
  };
  showAddForm.value = false;
  editingFood.value = null;
};

// 開始編輯
const startEdit = (food: Food) => {
  formData.value = {
    name: food.name || "",
    amount: food.amount || 1,
    price: food.price || 0,
    shop: food.shop || "",
    todate: food.todate || "",
    photo: food.photo || "",
    photohash: food.photohash || "",
  };
  editingFood.value = food;
  showAddForm.value = true;
};

// 計算剩餘天數
const getDaysLeft = (todate?: string) => {
  if (!todate) return null;
  const today = new Date();
  const expiry = new Date(todate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// 取得狀態顏色
const getStatusColor = (status: string, daysLeft: number | null) => {
  if (status === "expired" || (daysLeft !== null && daysLeft < 0)) {
    return "text-red-400";
  }
  if (status === "expiring_soon" || (daysLeft !== null && daysLeft <= 3)) {
    return "text-yellow-400";
  }
  if (status === "consumed") {
    return "text-gray-400";
  }
  return "text-green-400";
};

export default function FoodManager({ initialFoods = [] }: FoodManagerProps) {
  // 使用 useEffect 來載入資料
  useEffect(() => {
    if (initialFoods.length > 0) {
      foods.value = initialFoods;
    } else {
      loadFoods();
    }
  }, []);

  // 篩選食品
  const filteredFoods = foods.value.filter(food =>
    (food.name && food.name.toLowerCase().includes(searchTerm.value.toLowerCase())) ||
    (food.shop && food.shop.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );

  return (
    <div class="space-y-6">
      {/* 錯誤訊息 */}
      {error.value && (
        <div class="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
          {error.value}
        </div>
      )}

      {/* 搜尋和操作列 */}
      <div class="flex gap-4">
        <div class="relative flex-1">
          <input
            type="text"
            placeholder="搜尋食品名稱、品牌或分類..."
            value={searchTerm.value}
            onInput={(e) => searchTerm.value = (e.target as HTMLInputElement).value}
            class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 text-lg">🔍</span>
        </div>
        <button
          onClick={() => showAddForm.value = true}
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <span>🍎</span> 添加食品
        </button>
        <button
          onClick={loadFoods}
          disabled={loading.value}
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <span>🔄</span> 重新載入
        </button>
      </div>

      {/* 新增/編輯表單 */}
      {showAddForm.value && (
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-white font-medium text-lg mb-4">
            {editingFood.value ? "編輯食品" : "新增食品"}
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="食品名稱"
              value={formData.value.name}
              onInput={(e) => formData.value = { ...formData.value, name: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="number"
              placeholder="數量"
              value={formData.value.amount}
              onInput={(e) => formData.value = { ...formData.value, amount: parseInt((e.target as HTMLInputElement).value) || 1 }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="number"
              step="0.01"
              placeholder="價格 (選填)"
              value={formData.value.price}
              onInput={(e) => formData.value = { ...formData.value, price: parseFloat((e.target as HTMLInputElement).value) || 0 }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="text"
              placeholder="商店"
              value={formData.value.shop}
              onInput={(e) => formData.value = { ...formData.value, shop: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="date"
              placeholder="到期日期"
              value={formData.value.todate}
              onInput={(e) => formData.value = { ...formData.value, todate: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
            />
          </div>
          
          <textarea
            placeholder="備註 (選填)"
            value={formData.value.note}
            onInput={(e) => formData.value = { ...formData.value, note: (e.target as HTMLTextAreaElement).value }}
            class="w-full mt-4 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
            rows={3}
          />
          
          <div class="flex gap-2 mt-4">
            <button
              onClick={saveFood}
              disabled={loading.value || !formData.value.name}
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {loading.value ? "儲存中..." : "儲存"}
            </button>
            <button
              onClick={resetForm}
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 食品列表 */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading.value && foods.value.length === 0 ? (
          <div class="col-span-full text-center text-white/60 py-8">載入中...</div>
        ) : filteredFoods.length === 0 ? (
          <div class="col-span-full text-center text-white/60 py-8">
            {searchTerm.value ? "找不到符合條件的食品" : "尚無食品項目"}
          </div>
        ) : (
          filteredFoods.map((food) => {
            const daysLeft = getDaysLeft(food.todate || "");
            return (
              <div key={food.objectId} class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="flex gap-4">
                  <div class="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                    <span class="text-white text-2xl">🍿</span>
                  </div>

                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="text-white font-medium">{food.name}</h3>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-white/60">數量:</span>
                        <span class="text-white ml-2">{food.amount || 1}</span>
                      </div>
                      {food.price && food.price > 0 && (
                        <div>
                          <span class="text-white/60">價格:</span>
                          <span class="text-white ml-2">TWD {food.price}</span>
                        </div>
                      )}
                      {food.shop && (
                        <div>
                          <span class="text-white/60">商店:</span>
                          <span class="text-white ml-2">{food.shop}</span>
                        </div>
                      )}
                      {food.todate && (
                        <div>
                          <span class="text-white/60">到期日期:</span>
                          <span class="text-white ml-2">{food.todate}</span>
                        </div>
                      )}
                    </div>
                    
                    {food.todate && (
                      <div class="mt-3">
                        <span class="text-white/60 text-sm">剩餘天數:</span>
                        <span class={`ml-2 font-medium ${getStatusColor('fresh', getDaysLeft(food.todate))}`}>
                          {getDaysLeft(food.todate) < 0 ? '已過期' : `${getDaysLeft(food.todate)} 天`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div class="flex gap-2 mt-4">
                  <button
                    onClick={() => startEdit(food)}
                    class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => deleteFood(food.objectId)}
                    class="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}