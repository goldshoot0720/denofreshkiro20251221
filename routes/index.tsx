import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout
      currentPath="/"
      title="鋒兄AI資訊系統"
      subtitle="智能管理您的訂閱和食品，支援智能分類和快速搜尋"
    >
      <div class="max-w-4xl mx-auto">
        {/* 歡迎區域 */}
        <div class="text-center mb-6 sm:mb-8">
          <div class="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl font-bold">鋒</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">鋒兄AI資訊系統</h1>
          <p class="text-white/80 text-sm sm:text-lg">
            智能管理您的訂閱和食品，支援智能分類和快速搜尋
          </p>
        </div>

        {/* 主要功能卡片 */}
        <div class="space-y-4 mb-6 sm:mb-8">
          {/* 首頁卡片 */}
          <a href="/" class="block bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span class="text-2xl">🏠</span>
              </div>
              <h3 class="text-white font-medium text-lg">首頁</h3>
            </div>
            <p class="text-white/70 text-sm">系統主頁面和功能導航</p>
          </a>

          {/* 儀表板卡片 */}
          <a href="/dashboard" class="block bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span class="text-2xl">📊</span>
              </div>
              <h3 class="text-white font-medium text-lg">儀表板</h3>
            </div>
            <p class="text-white/70 text-sm">訂閱管理與食品管理系統統計概覽</p>
          </a>

          {/* 訂閱管理卡片 */}
          <a href="/subscriptions" class="block bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span class="text-2xl">📋</span>
              </div>
              <h3 class="text-white font-medium text-lg">訂閱管理</h3>
            </div>
            <p class="text-white/70 text-sm mb-2">合約訂閱和帳單管理</p>
            <div class="text-xs text-white/50">
              公開資訊 © 版權所有 2025 ~ 2125
            </div>
          </a>

          {/* 食品管理卡片 */}
          <a href="/food" class="block bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span class="text-2xl">🍎</span>
              </div>
              <h3 class="text-white font-medium text-lg">食品管理</h3>
            </div>
            <p class="text-white/70 text-sm">食品存放和到期提醒</p>
          </a>
        </div>

        {/* 技術資訊區域 */}
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 border border-white/10">
          <h3 class="text-orange-300 font-medium text-lg mb-4 flex items-center gap-2">
            <span>🔧</span> 前端技術
          </h3>
          <ul class="text-white/80 text-sm space-y-2 mb-6">
            <li>• SolidJS (SolidStart)</li>
            <li>• 網頁存放於 Netlify</li>
            <li>• 響應式設計 + Tailwind CSS</li>
          </ul>

          <h3 class="text-pink-300 font-medium text-lg mb-4 flex items-center gap-2">
            <span>💎</span> 後端技術
          </h3>
          <ul class="text-white/80 text-sm space-y-2">
            <li>• Strapi CMS</li>
            <li>• 影片存放於 Strapi</li>
          </ul>
        </div>

        {/* 快速操作區域 */}
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
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
