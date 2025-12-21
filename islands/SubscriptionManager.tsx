/**
 * Subscription Manager Island
 * Interactive component for managing subscriptions with Back4App integration
 */

import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { Subscription, CreateSubscriptionData } from "../lib/types/models.ts";

interface SubscriptionManagerProps {
  initialSubscriptions?: Subscription[];
}

const subscriptions = signal<Subscription[]>([]);
const loading = signal(false);
const error = signal<string | null>(null);
const searchTerm = signal("");
const showAddForm = signal(false);
const editingSubscription = signal<Subscription | null>(null);

// 表單狀態
const formData = signal<CreateSubscriptionData>({
  name: "",
  price: 0,
  nextdate: "",
  site: "",
  account: "",
  note: "",
});

// 載入訂閱列表
const loadSubscriptions = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("/api/subscriptions");
    const result = await response.json();
    
    if (result.success) {
      // 處理日期格式轉換
      const processedData = result.data.map((sub: any) => ({
        ...sub,
        nextdate: sub.nextdate?.iso ? sub.nextdate.iso.split('T')[0] : sub.nextdate,
      }));
      subscriptions.value = processedData;
    } else {
      error.value = result.error || "載入訂閱失敗";
    }
  } catch (err) {
    error.value = "網路錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};

// 建立或更新訂閱
const saveSubscription = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const url = editingSubscription.value 
      ? `/api/subscriptions/${editingSubscription.value.objectId}`
      : "/api/subscriptions";
    
    const method = editingSubscription.value ? "PUT" : "POST";
    
    // 準備資料，確保日期格式正確
    const submitData = {
      ...formData.value,
      nextdate: formData.value.nextdate || undefined, // 讓後端處理日期轉換
    };
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      await loadSubscriptions();
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

// 刪除訂閱
const deleteSubscription = async (id: string) => {
  if (!confirm("確定要刪除這個訂閱嗎？")) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: "DELETE",
    });
    
    const result = await response.json();
    
    if (result.success) {
      await loadSubscriptions();
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
    price: 0,
    nextdate: "",
    site: "",
    account: "",
    note: "",
  };
  showAddForm.value = false;
  editingSubscription.value = null;
};

// 開始編輯
const startEdit = (subscription: Subscription) => {
  formData.value = {
    name: subscription.name,
    price: subscription.price || 0,
    nextdate: subscription.nextdate || "",
    site: subscription.site || "",
    account: subscription.account || "",
    note: subscription.note || "",
  };
  editingSubscription.value = subscription;
  showAddForm.value = true;
};

// 計算剩餘天數
const getDaysLeft = (nextdate?: string) => {
  if (!nextdate) return null;
  const today = new Date();
  const paymentDate = new Date(nextdate);
  const diffTime = paymentDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function SubscriptionManager({ initialSubscriptions = [] }: SubscriptionManagerProps) {
  // 使用 useEffect 來載入資料
  useEffect(() => {
    if (initialSubscriptions.length > 0) {
      subscriptions.value = initialSubscriptions;
    } else {
      loadSubscriptions();
    }
  }, []);

  // 篩選訂閱
  const filteredSubscriptions = subscriptions.value.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    (sub.note && sub.note.toLowerCase().includes(searchTerm.value.toLowerCase()))
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
            placeholder="搜尋訂閱名稱或備註..."
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
          <span>📋</span> 添加訂閱
        </button>
        <button
          onClick={loadSubscriptions}
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
            {editingSubscription.value ? "編輯訂閱" : "新增訂閱"}
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="訂閱名稱"
              value={formData.value.name}
              onInput={(e) => formData.value = { ...formData.value, name: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="url"
              placeholder="網站 URL"
              value={formData.value.site}
              onInput={(e) => formData.value = { ...formData.value, site: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="number"
              placeholder="價格"
              value={formData.value.price}
              onInput={(e) => formData.value = { ...formData.value, price: parseFloat((e.target as HTMLInputElement).value) || 0 }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="text"
              placeholder="帳戶"
              value={formData.value.account}
              onInput={(e) => formData.value = { ...formData.value, account: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            
            <input
              type="date"
              placeholder="下次付款日期"
              value={formData.value.nextdate}
              onInput={(e) => formData.value = { ...formData.value, nextdate: (e.target as HTMLInputElement).value }}
              class="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
            />
          </div>
          
          <textarea
            placeholder="備註"
            value={formData.value.note}
            onInput={(e) => formData.value = { ...formData.value, note: (e.target as HTMLTextAreaElement).value }}
            class="w-full mt-4 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
            rows={3}
          />
          
          <div class="flex gap-2 mt-4">
            <button
              onClick={saveSubscription}
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

      {/* 訂閱列表 */}
      <div class="space-y-4">
        {loading.value && subscriptions.value.length === 0 ? (
          <div class="text-center text-white/60 py-8">載入中...</div>
        ) : filteredSubscriptions.length === 0 ? (
          <div class="text-center text-white/60 py-8">
            {searchTerm.value ? "找不到符合條件的訂閱" : "尚無訂閱項目"}
          </div>
        ) : (
          filteredSubscriptions.map((subscription) => {
            const daysLeft = getDaysLeft(subscription.nextPaymentDate);
            return (
              <div key={subscription.objectId} class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="text-white font-medium text-lg">{subscription.name}</h3>
                      {subscription.status && (
                        <span class={`px-2 py-1 rounded text-xs ${
                          subscription.status === 'active' ? 'bg-green-500/20 text-green-300' :
                          subscription.status === 'paused' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {subscription.status}
                        </span>
                      )}
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {subscription.site && (
                        <div>
                          <span class="text-white/60">網站:</span>
                          <div class="text-white mt-1 break-all">{subscription.site}</div>
                        </div>
                      )}
                      <div>
                        <span class="text-white/60">價格:</span>
                        <div class="text-white mt-1 font-medium">
                          TWD {subscription.price || 0}
                        </div>
                      </div>
                      <div>
                        <span class="text-white/60">下次付款:</span>
                        <div class="text-white mt-1">{subscription.nextdate || '未設定'}</div>
                      </div>
                      <div>
                        <span class="text-white/60">剩餘天數:</span>
                        <div class={`mt-1 font-medium ${
                          !subscription.nextdate ? 'text-gray-400' :
                          daysLeft < 0 ? 'text-red-400' :
                          daysLeft <= 3 ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {!subscription.nextdate ? '未設定' : 
                           daysLeft < 0 ? '已過期' : `${daysLeft} 天`}
                        </div>
                      </div>
                      {subscription.account && (
                        <div class="col-span-2">
                          <span class="text-white/60">帳戶:</span>
                          <div class="text-white mt-1">{subscription.account}</div>
                        </div>
                      )}
                      {subscription.note && (
                        <div class="col-span-2">
                          <span class="text-white/60">備註:</span>
                          <div class="text-white mt-1">{subscription.note}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="flex gap-2 ml-4">
                    <button
                      onClick={() => startEdit(subscription)}
                      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => deleteSubscription(subscription.objectId)}
                      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}