/**
 * Dashboard Island
 * 儀表板組件 - 顯示系統統計資訊和提醒
 */

import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface DashboardStats {
  subscriptions: {
    total: number;
    expiring3Days: number;
    expiring7Days: number;
    expired: number;
    totalMonthlySpending: number;
  };
  foods: {
    total: number;
    expiring7Days: number;
    expiring30Days: number;
    expired: number;
    totalValue: number;
  };
}

interface DashboardData {
  stats: DashboardStats;
  recentSubscriptions: any[];
  recentFoods: any[];
  expiringSubscriptions: any[];
  expiringFoods: any[];
}

const dashboardData = signal<DashboardData>({
  stats: {
    subscriptions: {
      total: 0,
      expiring3Days: 0,
      expiring7Days: 0,
      expired: 0,
      totalMonthlySpending: 0,
    },
    foods: {
      total: 0,
      expiring7Days: 0,
      expiring30Days: 0,
      expired: 0,
      totalValue: 0,
    },
  },
  recentSubscriptions: [],
  recentFoods: [],
  expiringSubscriptions: [],
  expiringFoods: [],
});

const loading = signal(false);
const error = signal<string | null>(null);

// 載入儀表板資料
const loadDashboardData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // 並行載入所有資料
    const [statsResponse, subscriptionsResponse, foodsResponse] = await Promise.all([
      fetch("/api/dashboard/stats"),
      fetch("/api/subscriptions?limit=5"),
      fetch("/api/foods?limit=5")
    ]);

    const [statsResult, subscriptionsResult, foodsResult] = await Promise.all([
      statsResponse.json(),
      subscriptionsResponse.json(),
      foodsResponse.json()
    ]);

    if (statsResult.success && subscriptionsResult.success && foodsResult.success) {
      // 處理日期格式並排序
      const processedSubscriptions = subscriptionsResult.data
        .map((sub: any) => ({
          ...sub,
          nextdate: sub.nextdate?.iso ? sub.nextdate.iso.split('T')[0] : sub.nextdate,
        }))
        .sort((a: any, b: any) => {
          // 按下次付款日期排序（由近至遠）
          if (!a.nextdate && !b.nextdate) return 0;
          if (!a.nextdate) return 1;
          if (!b.nextdate) return -1;
          
          const dateA = new Date(a.nextdate);
          const dateB = new Date(b.nextdate);
          
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          
          return dateA.getTime() - dateB.getTime();
        });

      const processedFoods = foodsResult.data
        .map((food: any) => ({
          ...food,
          todate: food.todate?.iso ? food.todate.iso.split('T')[0] : food.todate,
        }))
        .sort((a: any, b: any) => {
          // 按到期日期排序（由近至遠）
          if (!a.todate && !b.todate) return 0;
          if (!a.todate) return 1;
          if (!b.todate) return -1;
          
          const dateA = new Date(a.todate);
          const dateB = new Date(b.todate);
          
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          
          return dateA.getTime() - dateB.getTime();
        });

      // 計算即將到期的項目
      const today = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(today.getDate() + 3);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);

      const expiringSubscriptions = processedSubscriptions
        .filter((sub: any) => {
          if (!sub.nextdate) return false;
          const nextDate = new Date(sub.nextdate);
          return nextDate >= today && nextDate <= sevenDaysFromNow;
        })
        .sort((a: any, b: any) => {
          const dateA = new Date(a.nextdate);
          const dateB = new Date(b.nextdate);
          return dateA.getTime() - dateB.getTime();
        });

      const expiringFoods = processedFoods
        .filter((food: any) => {
          if (!food.todate) return false;
          const expiryDate = new Date(food.todate);
          return expiryDate >= today && expiryDate <= sevenDaysFromNow;
        })
        .sort((a: any, b: any) => {
          const dateA = new Date(a.todate);
          const dateB = new Date(b.todate);
          return dateA.getTime() - dateB.getTime();
        });

      dashboardData.value = {
        stats: statsResult.data,
        recentSubscriptions: processedSubscriptions,
        recentFoods: processedFoods,
        expiringSubscriptions,
        expiringFoods,
      };
    } else {
      error.value = "載入儀表板資料失敗";
    }
  } catch (err) {
    error.value = "網路錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};

export default function Dashboard() {
  // 組件載入時自動載入儀表板資料
  useEffect(() => {
    loadDashboardData();
  }, []);

  const subscriptionStats = dashboardData.value.stats.subscriptions;
  const foodStats = dashboardData.value.stats.foods;

  return (
    <div class="space-y-8">
      {/* 錯誤訊息 */}
      {error.value && (
        <div class="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
          {error.value}
        </div>
      )}

      {/* 頁面標題和重新載入按鈕 */}
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">系統儀表板</h1>
          <p class="text-white/70">訂閱管理與食品管理系統統計概覽</p>
        </div>
        <button
          onClick={loadDashboardData}
          disabled={loading.value}
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <span>🔄</span> {loading.value ? "載入中..." : "重新載入"}
        </button>
      </div>

      {loading.value && dashboardData.value.stats.subscriptions.total === 0 ? (
        <div class="text-center text-white/60 py-8">載入儀表板資料中...</div>
      ) : (
        <div class="space-y-8">
          {/* 統計卡片 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 訂閱管理統計 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-3xl">📋</span>
                <div>
                  <h2 class="text-xl font-semibold text-white">訂閱管理</h2>
                  <p class="text-white/60 text-sm">合約訂閱和帳單管理</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/5 rounded-lg p-4">
                  <div class="text-2xl font-bold text-white">{subscriptionStats.total}</div>
                  <div class="text-white/60 text-sm">項目總數</div>
                </div>
                <div class="bg-white/5 rounded-lg p-4">
                  <div class="text-2xl font-bold text-green-400">TWD {subscriptionStats.totalMonthlySpending}</div>
                  <div class="text-white/60 text-sm">月度支出</div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-red-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-red-400">⚠️</span>
                    <span class="text-white">3天內到期</span>
                  </div>
                  <span class="text-red-400 font-semibold">{subscriptionStats.expiring3Days} 項</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-yellow-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-400">⏰</span>
                    <span class="text-white">7天內到期</span>
                  </div>
                  <span class="text-yellow-400 font-semibold">{subscriptionStats.expiring7Days} 項</span>
                </div>

                <div class="flex justify-between items-center p-3 bg-gray-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-400">❌</span>
                    <span class="text-white">已過期</span>
                  </div>
                  <span class="text-gray-400 font-semibold">{subscriptionStats.expired} 項</span>
                </div>
              </div>

              <div class="mt-6">
                <a
                  href="/subscriptions"
                  class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center block transition-colors"
                >
                  管理訂閱 →
                </a>
              </div>
            </div>

            {/* 食品管理統計 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-3xl">🍎</span>
                <div>
                  <h2 class="text-xl font-semibold text-white">食品管理</h2>
                  <p class="text-white/60 text-sm">食品存放和到期提醒</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/5 rounded-lg p-4">
                  <div class="text-2xl font-bold text-white">{foodStats.total}</div>
                  <div class="text-white/60 text-sm">項目總數</div>
                </div>
                <div class="bg-white/5 rounded-lg p-4">
                  <div class="text-2xl font-bold text-green-400">TWD {foodStats.totalValue}</div>
                  <div class="text-white/60 text-sm">總價值</div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-yellow-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-400">⏰</span>
                    <span class="text-white">7天內到期</span>
                  </div>
                  <span class="text-yellow-400 font-semibold">{foodStats.expiring7Days} 項</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-orange-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-orange-400">📅</span>
                    <span class="text-white">30天內到期</span>
                  </div>
                  <span class="text-orange-400 font-semibold">{foodStats.expiring30Days} 項</span>
                </div>

                <div class="flex justify-between items-center p-3 bg-red-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-red-400">❌</span>
                    <span class="text-white">已過期</span>
                  </div>
                  <span class="text-red-400 font-semibold">{foodStats.expired} 項</span>
                </div>
              </div>

              <div class="mt-6">
                <a
                  href="/food"
                  class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-center block transition-colors"
                >
                  管理食品 →
                </a>
              </div>
            </div>
          </div>

          {/* 項目列表區域 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 最近訂閱項目 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">最近訂閱</h3>
                <a href="/subscriptions" class="text-blue-400 hover:text-blue-300 text-sm">查看全部 →</a>
              </div>
              
              {dashboardData.value.recentSubscriptions.length === 0 ? (
                <div class="text-center text-white/60 py-4">暫無訂閱項目</div>
              ) : (
                <div class="space-y-3">
                  {dashboardData.value.recentSubscriptions.map((subscription: any) => (
                    <div key={subscription.objectId} class="bg-white/5 rounded-lg p-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <h4 class="text-white font-medium">{subscription.name}</h4>
                          <p class="text-white/60 text-sm">
                            {subscription.nextdate ? `下次付款: ${subscription.nextdate}` : '未設定付款日期'}
                          </p>
                        </div>
                        <div class="text-right">
                          <div class="text-white font-medium">TWD {subscription.price || 0}</div>
                          {subscription.nextdate && (
                            <div class="text-xs text-white/60">
                              {(() => {
                                try {
                                  const today = new Date();
                                  const nextDate = new Date(subscription.nextdate);
                                  if (isNaN(nextDate.getTime())) {
                                    return '日期格式錯誤';
                                  }
                                  const diffTime = nextDate.getTime() - today.getTime();
                                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                  return diffDays < 0 ? '已過期' : `${diffDays} 天後`;
                                } catch (error) {
                                  return '日期計算錯誤';
                                }
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 最近食品項目 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">最近食品</h3>
                <a href="/food" class="text-green-400 hover:text-green-300 text-sm">查看全部 →</a>
              </div>
              
              {dashboardData.value.recentFoods.length === 0 ? (
                <div class="text-center text-white/60 py-4">暫無食品項目</div>
              ) : (
                <div class="space-y-3">
                  {dashboardData.value.recentFoods.map((food: any) => (
                    <div key={food.objectId} class="bg-white/5 rounded-lg p-3">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center overflow-hidden">
                            {food.photo ? (
                              <img 
                                src={food.photo} 
                                alt={food.name || "食品照片"} 
                                class="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).nextElementSibling!.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <span class={`text-white text-sm ${food.photo ? 'hidden' : ''}`}>🍿</span>
                          </div>
                          <div>
                            <h4 class="text-white font-medium">{food.name || '未命名'}</h4>
                            <p class="text-white/60 text-sm">
                              數量: {food.amount || 1} {food.shop && `• ${food.shop}`}
                            </p>
                          </div>
                        </div>
                        <div class="text-right">
                          {food.price && food.price > 0 && (
                            <div class="text-white font-medium">TWD {food.price}</div>
                          )}
                          {food.todate && (
                            <div class="text-xs text-white/60">
                              {(() => {
                                try {
                                  const today = new Date();
                                  const expiryDate = new Date(food.todate);
                                  if (isNaN(expiryDate.getTime())) {
                                    return '日期格式錯誤';
                                  }
                                  const diffTime = expiryDate.getTime() - today.getTime();
                                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                  return diffDays < 0 ? '已過期' : `${diffDays} 天後到期`;
                                } catch (error) {
                                  return '日期計算錯誤';
                                }
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 即將到期提醒 */}
          {(dashboardData.value.expiringSubscriptions.length > 0 || dashboardData.value.expiringFoods.length > 0) && (
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <div class="flex items-center gap-2 mb-4">
                <span class="text-yellow-400 text-xl">⚠️</span>
                <h3 class="text-lg font-semibold text-white">即將到期提醒</h3>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dashboardData.value.expiringSubscriptions.length > 0 && (
                  <div>
                    <h4 class="text-white font-medium mb-3">📋 即將到期的訂閱</h4>
                    <div class="space-y-2">
                      {dashboardData.value.expiringSubscriptions.map((subscription: any) => (
                        <div key={subscription.objectId} class="bg-yellow-500/20 rounded-lg p-3">
                          <div class="flex items-center justify-between">
                            <span class="text-white">{subscription.name}</span>
                            <span class="text-yellow-300 text-sm">{subscription.nextdate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {dashboardData.value.expiringFoods.length > 0 && (
                  <div>
                    <h4 class="text-white font-medium mb-3">🍎 即將到期的食品</h4>
                    <div class="space-y-2">
                      {dashboardData.value.expiringFoods.map((food: any) => (
                        <div key={food.objectId} class="bg-yellow-500/20 rounded-lg p-3">
                          <div class="flex items-center justify-between">
                            <span class="text-white">{food.name || '未命名'}</span>
                            <span class="text-yellow-300 text-sm">{food.todate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 快速操作區域 */}
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4">快速操作</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/subscriptions"
            class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-4 rounded-lg text-center transition-colors"
          >
            <div class="text-2xl mb-2">📋</div>
            <div class="text-sm">新增訂閱</div>
          </a>
          <a
            href="/food"
            class="bg-green-500/20 hover:bg-green-500/30 text-green-300 p-4 rounded-lg text-center transition-colors"
          >
            <div class="text-2xl mb-2">🍎</div>
            <div class="text-sm">新增食品</div>
          </a>
          <a
            href="/demo"
            class="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 p-4 rounded-lg text-center transition-colors"
          >
            <div class="text-2xl mb-2">🎯</div>
            <div class="text-sm">系統展示</div>
          </a>
          <button
            onClick={loadDashboardData}
            class="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 p-4 rounded-lg text-center transition-colors"
          >
            <div class="text-2xl mb-2">🔄</div>
            <div class="text-sm">重新載入</div>
          </button>
        </div>
      </div>
    </div>
  );
}