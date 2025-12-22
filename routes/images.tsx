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

  // 實際的圖片文件列表
  const images = [
    { id: 1, name: "1761405813-e8acecce-a968-4409-a254-d493d54e8c53.jpeg", format: "JPEG", size: "88.7 KB", path: "/images/1761405813-e8acecce-a968-4409-a254-d493d54e8c53.jpeg" },
    { id: 2, name: "1761405863-3ca40781-b24f-4c48-9795-7bc061f58ed6.jpeg", format: "JPEG", size: "73.1 KB", path: "/images/1761405863-3ca40781-b24f-4c48-9795-7bc061f58ed6.jpeg" },
    { id: 3, name: "1761405934-74814b15-9720-44af-a88e-91f4933748c3.jpeg", format: "JPEG", size: "84.0 KB", path: "/images/1761405934-74814b15-9720-44af-a88e-91f4933748c3.jpeg" },
    { id: 4, name: "20240917_183326-removebg.png", format: "PNG", size: "7.46 MB", path: "/images/20240917_183326-removebg.png" },
    { id: 5, name: "202509_A4_2.png", format: "PNG", size: "9.78 MB", path: "/images/202509_A4_2.png" },
    { id: 6, name: "20251026_2147_01k8gbv2ynecwrezhhpnx3cwg1.jpg", format: "JPG", size: "689.4 KB", path: "/images/20251026_2147_01k8gbv2ynecwrezhhpnx3cwg1.jpg" },
    { id: 7, name: "20251104_134814.jpg", format: "JPG", size: "2.1 MB", path: "/images/20251104_134814.jpg" },
    { id: 8, name: "248adc66-2260-491b-b5a9-91ca01099528.png", format: "PNG", size: "1.2 MB", path: "/images/248adc66-2260-491b-b5a9-91ca01099528.png" },
    { id: 9, name: "41debbc7-e26c-402d-8d29-7fa1b06441b7.png", format: "PNG", size: "856 KB", path: "/images/41debbc7-e26c-402d-8d29-7fa1b06441b7.png" },
    { id: 10, name: "497468912_1266719442124581_4172133962275491585_n.jpg", format: "JPG", size: "145 KB", path: "/images/497468912_1266719442124581_4172133962275491585_n.jpg" },
    { id: 11, name: "50a2f658-0691-4694-a692-7c53a73c175f.jpg", format: "JPG", size: "234 KB", path: "/images/50a2f658-0691-4694-a692-7c53a73c175f.jpg" },
    { id: 12, name: "717994e4-a0a9-4e7b-b8b5-9f12474f4c47--1-.png", format: "PNG", size: "1.8 MB", path: "/images/717994e4-a0a9-4e7b-b8b5-9f12474f4c47--1-.png" },
    { id: 13, name: "997e6f98-4db2-447c-8ec5-94a3cd2a5d51.jpg", format: "JPG", size: "178 KB", path: "/images/997e6f98-4db2-447c-8ec5-94a3cd2a5d51.jpg" },
    { id: 14, name: "9ed35a46-9d95-4376-bd47-a267b49a22c0.png", format: "PNG", size: "2.3 MB", path: "/images/9ed35a46-9d95-4376-bd47-a267b49a22c0.png" },
    { id: 15, name: "a31b59e0-088a-4d22-991b-a040af3884fa.png", format: "PNG", size: "1.5 MB", path: "/images/a31b59e0-088a-4d22-991b-a040af3884fa.png" },
    { id: 16, name: "ChatGPT Image 1111.png", format: "PNG", size: "892 KB", path: "/images/ChatGPT Image 1111.png" },
    { id: 17, name: "ChatGPT Image 2025年10月26日 下午07_21_51.png", format: "PNG", size: "1.1 MB", path: "/images/ChatGPT Image 2025年10月26日 下午07_21_51.png" },
    { id: 18, name: "ChatGPT Image 2025年10月26日 下午07_37_12.png", format: "PNG", size: "967 KB", path: "/images/ChatGPT Image 2025年10月26日 下午07_37_12.png" },
    { id: 19, name: "ChatGPT Image 2025年10月26日 下午07_44_21.png", format: "PNG", size: "1.3 MB", path: "/images/ChatGPT Image 2025年10月26日 下午07_44_21.png" },
    { id: 20, name: "ChatGPT Image 2025年10月26日 下午07_45_30.png", format: "PNG", size: "1.2 MB", path: "/images/ChatGPT Image 2025年10月26日 下午07_45_30.png" },
    { id: 21, name: "DonaldTrump.png", format: "PNG", size: "456 KB", path: "/images/DonaldTrump.png" },
    { id: 22, name: "ec6a52ef-397a-481d-a1c2-4336dabc2eb5.png", format: "PNG", size: "1.8 MB", path: "/images/ec6a52ef-397a-481d-a1c2-4336dabc2eb5.png" },
    { id: 23, name: "f56a77b4-342b-4624-aaee-0a1eefda1c02.png", format: "PNG", size: "2.1 MB", path: "/images/f56a77b4-342b-4624-aaee-0a1eefda1c02.png" },
    { id: 24, name: "fused_anime_girl.jpg", format: "JPG", size: "234 KB", path: "/images/fused_anime_girl.jpg" },
    { id: 25, name: "Google-logo_1.jpg", format: "JPG", size: "12 KB", path: "/images/Google-logo_1.jpg" },
    { id: 26, name: "IMG_0032.jpg", format: "JPG", size: "3.2 MB", path: "/images/IMG_0032.jpg" },
    { id: 27, name: "Rose.png", format: "PNG", size: "567 KB", path: "/images/Rose.png" },
    { id: 28, name: "sora2.jpg", format: "JPG", size: "89 KB", path: "/images/sora2.jpg" },
    { id: 29, name: "TUSHENDRAW.png", format: "PNG", size: "234 KB", path: "/images/TUSHENDRAW.png" },
    { id: 30, name: "TUSHENLOSE.png", format: "PNG", size: "198 KB", path: "/images/TUSHENLOSE.png" },
    { id: 31, name: "TUSHENWIN.png", format: "PNG", size: "245 KB", path: "/images/TUSHENWIN.png" },
    { id: 32, name: "vusgyIHWqpJtw3gPtWcw1tJrL7TP9rS5vaQpxPMA.jpg", format: "JPG", size: "156 KB", path: "/images/vusgyIHWqpJtw3gPtWcw1tJrL7TP9rS5vaQpxPMA.jpg" },
    { id: 33, name: "下載.jpeg", format: "JPEG", size: "45 KB", path: "/images/下載.jpeg" },
    { id: 34, name: "下載.png", format: "PNG", size: "78 KB", path: "/images/下載.png" },
    { id: 35, name: "未命名 LiveDoc(1).png", format: "PNG", size: "123 KB", path: "/images/未命名 LiveDoc(1).png" },
    { id: 36, name: "未命名.jpg", format: "JPG", size: "67 KB", path: "/images/未命名.jpg" },
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
          <span>顯示 36 / 200+ 張圖片</span>
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
            class="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-colors cursor-pointer group"
            onClick={() => window.open(image.path, '_blank')}
          >
            <div class="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
              <img
                src={image.path}
                alt={image.name}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div class="w-full h-full flex items-center justify-center" style="display: none;">
                <span class="text-white/50 text-2xl">🖼️</span>
              </div>
              <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {image.format}
              </div>
              <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-white text-lg">👁️</span>
              </div>
            </div>
            <div class="p-3">
              <h3 class="text-white text-sm font-medium mb-1 truncate" title={image.name}>
                {image.name.length > 15 ? image.name.substring(0, 15) + '...' : image.name}
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
