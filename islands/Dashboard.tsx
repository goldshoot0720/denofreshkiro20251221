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

const stats = signal<DashboardStats>({
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
});

const loading = signal(false);
const error = signal<string | null>(null);

// 載入統計資料
const loadStats = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch("/api/dashboard/stats");
    const result = await response.json();
    
    if (result.success) {
      stats.value = result.data;
    } else {
      error.value = result.error || "載入統計資料失敗";
    }
  } catch (err) {
    error.value = "網路錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};

export default function Dashboard() {
  // 組件載入時自動載入統計資料
  useEffect(() => {
    loadStats();
  }, []);

  const subscriptionStats = stats.value.subscriptions;
  const foodStats = stats.value.foods;

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
          onClick={loadStats}
          disabled={loading.value}
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <span>🔄</span> {loading.value ? "載入中..." : "重新載入"}
        </button>
      </div>

      {loading.value && stats.value.subscriptions.total === 0 ? (
        <div class="text-center text-white/60 py-8">載入統計資料中...</div>
      ) : (
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
            onClick={loadStats}
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