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
      <div class="md:hidden bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
              鋒
            </div>
            <span class="text-white font-medium">鋒兄AI系統</span>
          </div>
          <button
            type="button"
            class="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span class="text-xl">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* 移動端側邊欄覆蓋層 */}
      {isOpen && (
        <div class="md:hidden fixed inset-0 z-50">
          <div
            class="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
          </div>
          <div class="absolute left-0 top-0 w-64 h-full bg-purple-900/95 backdrop-blur-sm">
            <div class="p-4">
              <div class="flex items-center gap-2 mb-8">
                <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                  鋒
                </div>
                <span class="text-white font-medium">鋒兄AI系統</span>
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
