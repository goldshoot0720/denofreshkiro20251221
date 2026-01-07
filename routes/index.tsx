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
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-medium text-base sm:text-lg">儀表板</h3>
                <p class="text-white/70 text-xs sm:text-sm mt-1">查看系統統計和數據概覽</p>
              </div>
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
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-medium text-base sm:text-lg">影片庫</h3>
                <p class="text-white/70 text-xs sm:text-sm mt-1">管理和瀏覽您的影片收藏</p>
              </div>
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
                <p class="text-white/70 text-xs sm:text-sm mt-1">管理您的訂閱服務，追蹤到期時間和費用</p>
              </div>
            </div>
          </a>

          {/* 食品管理卡片 */}
          <a href="/food" class="block bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-white/15 transition-colors border border-white/10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg sm:text-2xl">🍎</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-medium text-base sm:text-lg">食品管理</h3>
                <p class="text-white/70 text-xs sm:text-sm mt-1">記錄和管理食品資訊，追蹤保存期限</p>
              </div>
            </div>
          </a>
        </div>

        {/* 技術資訊區域 - 手機版優化，移到底部 */}
        <div class="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 border border-white/5">
          <details class="group">
            <summary class="text-white/80 font-medium text-sm sm:text-base mb-2 cursor-pointer flex items-center gap-2 hover:text-white transition-colors">
              <span class="text-xs sm:text-sm">🔧</span> 
              技術資訊
              <span class="ml-auto text-xs group-open:rotate-180 transition-transform">▼</span>
            </summary>
            
            <div class="mt-3 space-y-4">
              <div>
                <h4 class="text-orange-300 font-medium text-sm mb-2 flex items-center gap-2">
                  <span class="text-xs">🔧</span> 前端技術
                </h4>
                <ul class="text-white/70 text-xs space-y-1">
                  <li>• SolidJS (SolidStart)</li>
                  <li>• 網頁存放於 Netlify</li>
                  <li>• 響應式設計 + Tailwind CSS</li>
                </ul>
              </div>

              <div>
                <h4 class="text-pink-300 font-medium text-sm mb-2 flex items-center gap-2">
                  <span class="text-xs">💎</span> 後端技術
                </h4>
                <ul class="text-white/70 text-xs space-y-1">
                  <li>• Back4App</li>
                  <li>• 影片存放於 Back4App</li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        {/* 版權信息 */}
        <div class="text-center py-4 border-t border-white/10">
          <p class="text-white/50 text-xs">
            © 2025 鋒兄AI資訊系統 版權所有
          </p>
        </div>
      </div>
    </Layout>
  );
}
