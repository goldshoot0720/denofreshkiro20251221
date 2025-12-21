import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout
      currentPath="/"
      title="鋒兄AI資訊系統"
      subtitle="智能管理您的影片和圖片收藏，支援智能分類和快速搜尋"
    >
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <div class="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white text-2xl font-bold">鋒</span>
          </div>
          <h1 class="text-3xl font-bold text-white mb-4">鋒兄AI資訊系統</h1>
          <p class="text-white/80 text-lg mb-8">
            智能管理您的影片和圖片收藏，支援智能分類和快速搜尋
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <p class="text-white/90 mb-6">
            鋒兄資訊公開資訊 © 版權所有 2025 - 2125
          </p>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-orange-300 font-medium mb-4 flex items-center gap-2">
                <span>🔧</span> 前端技術
              </h3>
              <ul class="text-white/80 text-sm space-y-2">
                <li>• Deno Fresh</li>
                <li>• Deno Deploy</li>
                <li>• 響應式設計 + Tailwind CSS</li>
              </ul>
            </div>

            <div>
              <h3 class="text-pink-300 font-medium mb-4 flex items-center gap-2">
                <span>💎</span> 後端技術
              </h3>
              <ul class="text-white/80 text-sm space-y-2">
                <li>• Back4App</li>
                <li>• Vercel Blob(abu..17)</li>
                <li>• 雲端資料庫服務</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-yellow-300 font-medium mb-6 flex items-center justify-center gap-2">
            <span>⭐</span> 系統功能選單
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="/dashboard"
              class="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl p-6 transition-all hover:scale-105"
            >
              <div class="text-3xl mb-3">📊</div>
              <h4 class="text-white font-medium mb-2">系統儀表板</h4>
              <p class="text-white/70 text-sm">統計概覽和快速操作</p>
            </a>
            
            <a
              href="/subscriptions"
              class="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl p-6 transition-all hover:scale-105"
            >
              <div class="text-3xl mb-3">📋</div>
              <h4 class="text-white font-medium mb-2">訂閱管理</h4>
              <p class="text-white/70 text-sm">管理您的訂閱服務</p>
            </a>
            
            <a
              href="/food"
              class="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl p-6 transition-all hover:scale-105"
            >
              <div class="text-3xl mb-3">🍎</div>
              <h4 class="text-white font-medium mb-2">食品管理</h4>
              <p class="text-white/70 text-sm">追蹤食品到期日期</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
