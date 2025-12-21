import { useState } from "preact/hooks";

interface MobileNavToggleProps {
  currentPath: string;
}

export default function MobileNavToggle({ currentPath }: MobileNavToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: "🏠", label: "首頁" },
    { path: "/dashboard", icon: "📊", label: "儀表板" },
    { path: "/images", icon: "🖼️", label: "圖片庫" },
    { path: "/videos", icon: "🎬", label: "影片庫" },
    { path: "/subscriptions", icon: "📋", label: "訂閱管理" },
    { path: "/food", icon: "🍎", label: "食品管理" },
  ];

  return (
    <>
      {/* 移動端頂部導航 */}
      <div class="bg-white/5 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-white text-lg font-medium text-center flex-1">
            歡迎使用鋒兄AI資訊系統
          </h1>
          <div class="w-10"></div> {/* 平衡右側空間 */}
        </div>
      </div>

      {/* 移動端側邊欄覆蓋層 */}
      {isOpen && (
        <div class="fixed inset-0 z-50">
          <div
            class="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
          </div>
          <div class="absolute left-0 top-0 w-64 h-full bg-purple-900/95 backdrop-blur-sm">
            <div class="p-4">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                    鋒
                  </div>
                  <span class="text-white font-medium">鋒兄AI系統</span>
                </div>
                <button
                  type="button"
                  class="text-white p-1 hover:bg-white/10 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav class="space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    class={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      currentPath === item.path
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span class="text-lg">{item.icon}</span>
                    <span class="text-sm">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
