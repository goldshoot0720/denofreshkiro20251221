interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const menuItems = [
    { path: "/", icon: "🏠", label: "首頁" },
    { path: "/dashboard", icon: "📊", label: "儀表板" },
    { path: "/images", icon: "🖼️", label: "圖片庫" },
    { path: "/videos", icon: "🎬", label: "影片庫" },
    { path: "/subscriptions", icon: "📋", label: "訂閱管理" },
    { path: "/food", icon: "🍎", label: "食品管理" },
  ];

  return (
    <div class="w-48 bg-white/10 backdrop-blur-sm border-r border-white/20 min-h-screen">
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
              href={item.path}
              class={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPath === item.path
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span class="text-lg">{item.icon}</span>
              <span class="text-sm">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
