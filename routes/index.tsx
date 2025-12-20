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
                <li>• SolidJS (SolidStart)</li>
                <li>• 響應式設計 Netlify</li>
                <li>• 響應式設計 + Tailwind CSS</li>
              </ul>
            </div>

            <div>
              <h3 class="text-pink-300 font-medium mb-4 flex items-center gap-2">
                <span>💎</span> 後端技術
              </h3>
              <ul class="text-white/80 text-sm space-y-2">
                <li>• Strapi CMS</li>
                <li>• 多平台發佈 Strapi</li>
                <li>• RESTful API 支援</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-yellow-300 font-medium mb-4 flex items-center justify-center gap-2">
            <span>⭐</span> 系統功能選單
          </h3>
        </div>
      </div>
    </Layout>
  );
}
