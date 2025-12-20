import Layout from "../components/Layout.tsx";

export default function Videos() {
  const headerActions = (
    <button
      type="button"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
    >
      <span>📹</span> 添加影片
    </button>
  );

  const videos = [
    {
      id: 1,
      title: "鋒兄的傳奇人生",
      subtitle: "鋒兄人生傳記影片",
      duration: "00:45",
      size: "2.01 MB",
      thumbnail: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "鋒兄雜貨Show 🔴",
      subtitle: "鋒兄雜貨影片庫",
      duration: "01:23",
      size: "4.21 MB",
      thumbnail: "/api/placeholder/300/200",
    },
  ];

  return (
    <Layout
      currentPath="/videos"
      title="鋒兄影片庫"
      subtitle="鋒兄的精彩人生與雜貨庫存"
      headerActions={headerActions}
    >
      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            placeholder="搜尋影片名稱..."
            class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
          >
            <span class="text-lg">🔍</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            class="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-colors"
          >
            <div class="relative">
              <div class="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span class="text-white/50 text-4xl">🎬</span>
              </div>
              <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                MP4
              </div>
              <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-white font-medium mb-1">{video.title}</h3>
              <p class="text-white/70 text-sm mb-3">{video.subtitle}</p>
              <div class="flex justify-between items-center text-xs text-white/60">
                <span>大小: {video.size}</span>
                <span>時長: {video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
