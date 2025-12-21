import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout
      currentPath="/"
      title="系統儀表板"
      subtitle="訂閱管理與食品管理系統統計概覽"
    >
      <div class="max-w-6xl mx-auto">
        {/* 歡迎區域 */}
        <div class="text-center mb-6 sm:mb-8">
          <div class="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl font-bold">鋒</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">鋒兄AI系統</h1>
          <p class="text-white/80 text-sm sm:text-lg">
            訂閱管理與食品管理系統統計概覽
          </p>
        </div>

        {/* 主要內容區域 - 電腦版左右分欄，手機版單欄 */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* 左側 - 系統功能 */}
          <div class="space-y-4 sm:space-y-6">
            {/* 系統儀表板卡片 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">📊</span>
                </div>
                <div>
                  <h3 class="text-white font-medium text-lg">系統儀表板</h3>
                  <p class="text-white/70 text-sm">訂閱管理與食品管理系統統計概覽</p>
                </div>
              </div>
              <a
                href="/dashboard"
                class="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 px-4 rounded-lg text-center block transition-colors"
              >
                <span>🔄</span> 重新載入
              </a>
            </div>

            {/* 訂閱管理卡片 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">📋</span>
                </div>
                <div>
                  <h3 class="text-white font-medium text-lg">訂閱管理</h3>
                  <p class="text-white/70 text-sm">合約訂閱和帳單管理</p>
                </div>
              </div>
              
              {/* 統計數據 */}
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">24</div>
                  <div class="text-white/60 text-xs">項目總數</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-400">TWD 8175</div>
                  <div class="text-white/60 text-xs">月度支出</div>
                </div>
              </div>

              {/* 提醒狀態 */}
              <div class="space-y-2">
                <div class="flex items-center justify-between p-2 bg-red-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-red-400">⚠️</span>
                    <span class="text-white text-sm">3天內到期</span>
                  </div>
                  <span class="text-red-400 font-semibold text-sm">0 項</span>
                </div>
                
                <div class="flex items-center justify-between p-2 bg-yellow-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-400">⏰</span>
                    <span class="text-white text-sm">7天內到期</span>
                  </div>
                  <span class="text-yellow-400 font-semibold text-sm">1 項</span>
                </div>

                <div class="flex items-center justify-between p-2 bg-gray-500/20 rounded-lg">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-400">❌</span>
                    <span class="text-white text-sm">已過期</span>
                  </div>
                  <span class="text-gray-400 font-semibold text-sm">0 項</span>
                </div>
              </div>

              <a
                href="/subscriptions"
                class="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 px-4 rounded-lg text-center block transition-colors mt-4"
              >
                管理訂閱 →
              </a>
            </div>
          </div>

          {/* 右側 - 食品管理與系統資訊 */}
          <div class="space-y-4 sm:space-y-6">
            {/* 食品管理卡片 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">🍎</span>
                </div>
                <div>
                  <h3 class="text-white font-medium text-lg">食品管理</h3>
                  <p class="text-white/70 text-sm">食品存放和到期提醒</p>
                </div>
              </div>

              {/* 統計數據 */}
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">12</div>
                  <div class="text-white/60 text-xs">項目總數</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-400">TWD 2450</div>
                  <div class="text-white/60 text-xs">總價值</div>
                </div>
              </div>

              <a
                href="/food"
                class="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 py-2 px-4 rounded-lg text-center block transition-colors"
              >
                管理食品 →
              </a>
            </div>

            {/* 版權資訊 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 text-center">
              <p class="text-white/90 mb-4">
                鋒兄途司公開資訊 © 版權所有<br />
                2025 ~ 2125
              </p>
            </div>

            {/* 技術資訊 */}
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 class="text-orange-300 font-medium text-lg mb-3 flex items-center gap-2">
                <span>🔧</span> 前端技術
              </h3>
              <ul class="text-white/80 text-sm space-y-1 mb-4">
                <li>• SolidJS (SolidStart)</li>
                <li>• 網頁存放於 Netlify</li>
                <li>• 響應式設計 + Tailwind CSS</li>
              </ul>

              <h3 class="text-pink-300 font-medium text-lg mb-3 flex items-center gap-2">
                <span>💎</span> 後端技術
              </h3>
              <ul class="text-white/80 text-sm space-y-1">
                <li>• Strapi CMS</li>
                <li>• 影片存放於 Strapi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 快速操作區域 */}
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 mt-6 sm:mt-8">
          <h3 class="text-white font-medium text-lg mb-4">快速操作</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href="/subscriptions"
              class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-3 rounded-lg text-center transition-colors"
            >
              <div class="text-xl mb-1">📋</div>
              <div class="text-xs">新增訂閱</div>
            </a>
            <a
              href="/food"
              class="bg-green-500/20 hover:bg-green-500/30 text-green-300 p-3 rounded-lg text-center transition-colors"
            >
              <div class="text-xl mb-1">🍎</div>
              <div class="text-xs">新增食品</div>
            </a>
            <a
              href="/dashboard"
              class="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 p-3 rounded-lg text-center transition-colors"
            >
              <div class="text-xl mb-1">📊</div>
              <div class="text-xs">查看統計</div>
            </a>
            <a
              href="/demo"
              class="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 p-3 rounded-lg text-center transition-colors"
            >
              <div class="text-xl mb-1">🎯</div>
              <div class="text-xs">系統展示</div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
