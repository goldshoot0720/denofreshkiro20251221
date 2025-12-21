import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout
      currentPath="/"
      title="鋒兄AI資訊系統"
      subtitle="智能管理您的訂閱和食品，支援智能分類和快速搜尋"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 歡迎區域 - 手機版優化 */}
        <div class="text-center mb-4 sm:mb-8">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span class="text-white text-lg sm:text-2xl font-bold">鋒</span>
          </div>
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">鋒兄AI資訊系統</h1>
          <p class="text-white/80 text-xs sm:text-sm md:text-lg px-2">
            智能管理您的影片和圖片收藏，支援智能分類和快速搜尋
          </p>
        </div>

        {/* 功能模塊卡片 - 手機版優化 */}
        <div class="space-y-3 sm:space-y-4 mb-4 sm:mb-8">
          {/* 首頁卡片 */}
          <a href="/" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">🏠</span>
              </div>
              <h3 class="text-white font-medium text-base sm:text-lg">首頁</h3>
            </div>
          </a>

          {/* 儀表板卡片 */}
          <a href="/dashboard" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">📊</span>
              </div>
              <h3 class="text-white font-medium text-base sm:text-lg">儀表板</h3>
            </div>
          </a>

          {/* 圖片庫卡片 */}
          <a href="/images" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">🖼️</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-medium text-base sm:text-lg">圖片庫</h3>
                <p class="text-white/70 text-xs sm:text-sm mt-1 line-clamp-2">智能管理您的影片和圖片收藏，支援智能分類和快速搜尋</p>
              </div>
            </div>
          </a>

          {/* 影片庫卡片 */}
          <a href="/videos" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">🎬</span>
              </div>
              <h3 class="text-white font-medium text-base sm:text-lg">影片庫</h3>
            </div>
          </a>

          {/* 訂閱管理卡片 */}
          <a href="/subscriptions" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">📋</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-medium text-base sm:text-lg">訂閱管理</h3>
                <p class="text-white/70 text-xs sm:text-sm mt-1">公開資訊 © 版權所有 2025 ~ 2125</p>
              </div>
            </div>
          </a>

          {/* 食品管理卡片 */}
          <a href="/food" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">🍎</span>
              </div>
              <h3 class="text-white font-medium text-base sm:text-lg">食品管理</h3>
            </div>
          </a>
        </div>

        {/* 技術資訊區域 - 手機版優化 */}
        <div class="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 border border-white/10">
          <h3 class="text-orange-300 font-medium text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
            <span class="text-sm sm:text-base">🔧</span> 前端技術
          </h3>
          <ul class="text-white/80 text-xs sm:text-sm space-y-1 sm:space-y-2 mb-4 sm:mb-6">
            <li>• SolidJS (SolidStart)</li>
            <li>• 網頁存放於 Netlify</li>
            <li>• 響應式設計 + Tailwind CSS</li>
          </ul>

          <h3 class="text-pink-300 font-medium text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
            <span class="text-sm sm:text-base">💎</span> 後端技術
          </h3>
          <ul class="text-white/80 text-xs sm:text-sm space-y-1 sm:space-y-2">
            <li>• Strapi CMS</li>
            <li>• 影片存放於 Strapi</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
