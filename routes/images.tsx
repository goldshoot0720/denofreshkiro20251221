import Layout from "../components/Layout.tsx";

export default function Images() {
  const headerActions = (
    <div class="flex gap-2">
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
      >
        <span>🔄</span> 重新整理
      </button>
      <button
        type="button"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
      >
        <span>📷</span> 添加圖片
      </button>
    </div>
  );

  const images = [
    { id: 1, name: "1761405813-e...", format: "JPG", size: "88.7 KB" },
    { id: 2, name: "1761405863-3...", format: "JPG", size: "73.1 KB" },
    { id: 3, name: "1761405934-7...", format: "JPG", size: "84.0 KB" },
    { id: 4, name: "20240917_183...", format: "PNG", size: "7.46 MB" },
    { id: 5, name: "202509_A4_2...", format: "PNG", size: "9.78 MB" },
    { id: 6, name: "20251026_214...", format: "JPG", size: "689.4 KB" },
  ];

  return (
    <Layout
      currentPath="/images"
      title="鋒兄圖片庫"
      subtitle="鋒兄的精彩圖片收藏和AI創作 (241 張圖片)"
      headerActions={headerActions}
    >
      <div class="mb-6">
        <div class="flex gap-4 mb-4">
          <div class="relative flex-1">
            <input
              type="text"
              placeholder="搜尋圖片名稱或標籤..."
              class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            >
              <span class="text-lg">🔍</span>
            </button>
          </div>
          <select class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40">
            <option>所有類型</option>
            <option>JPG</option>
            <option>PNG</option>
          </select>
          <select class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40">
            <option>按名稱排序</option>
            <option>按大小排序</option>
            <option>按日期排序</option>
          </select>
        </div>

        <div class="flex gap-4 text-sm text-white/70">
          <span>顯示 241 / 241 張圖片</span>
          <span class="text-green-400">總大小 825.95 MB</span>
          <span>PNG: 192</span>
          <span>JPG: 41</span>
          <span>JPEG: 8</span>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            class="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-colors"
          >
            <div class="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <span class="text-white/50 text-2xl">🖼️</span>
              <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {image.format}
              </div>
            </div>
            <div class="p-3">
              <h3 class="text-white text-sm font-medium mb-1 truncate">
                {image.name}
              </h3>
              <div class="flex justify-between items-center text-xs text-white/60">
                <span>{image.format}</span>
                <span>{image.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
