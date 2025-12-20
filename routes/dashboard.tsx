import Layout from "../components/Layout.tsx";

export default function Dashboard() {
  const headerActions = (
    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
    >
      <span>🔄</span> 刷新數據
    </button>
  );

  return (
    <Layout
      currentPath="/dashboard"
      title="系統儀表板"
      subtitle="即時監控訂閱和食品到期狀態"
      headerActions={headerActions}
    >
      <div class="space-y-6">
        {/* 訂閱管理統計 */}
        <div>
          <h3 class="text-white font-medium mb-4 flex items-center gap-2">
            <span class="text-lg">📋</span> 訂閱管理
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-blue-300 mb-1">24</div>
              <div class="text-white/70 text-sm">總訂閱數</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-red-300 mb-1">0</div>
              <div class="text-white/70 text-sm">3天內到期</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-yellow-300 mb-1">1</div>
              <div class="text-white/70 text-sm">7天內到期</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-gray-300 mb-1">0</div>
              <div class="text-white/70 text-sm">已過期</div>
            </div>
          </div>
        </div>

        {/* 食品管理統計 */}
        <div>
          <h3 class="text-white font-medium mb-4 flex items-center gap-2">
            <span class="text-lg">🍎</span> 食品管理
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-green-300 mb-1">13</div>
              <div class="text-white/70 text-sm">總食品數</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-red-300 mb-1">0</div>
              <div class="text-white/70 text-sm">3天內到期</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-yellow-300 mb-1">0</div>
              <div class="text-white/70 text-sm">7天內到期</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-orange-300 mb-1">2</div>
              <div class="text-white/70 text-sm">30天內到期</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-gray-300 mb-1">0</div>
              <div class="text-white/70 text-sm">已過期</div>
            </div>
          </div>
        </div>

        {/* 提醒區域 */}
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
            <h4 class="text-yellow-300 font-medium mb-2 flex items-center gap-2">
              <span>⚠️</span> 訂閱到期提醒
            </h4>
            <p class="text-white/80 text-sm">暫無即將到期的訂閱</p>
          </div>

          <div class="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <h4 class="text-red-300 font-medium mb-2 flex items-center gap-2">
              <span>🍎</span> 食品到期提醒
            </h4>
            <p class="text-white/80 text-sm">暫無即將到期的食品</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
