import Sidebar from "./Sidebar.tsx";
import MobileNavToggle from "../islands/MobileNavToggle.tsx";
import { ComponentChildren } from "preact";

interface LayoutProps {
  children: ComponentChildren;
  currentPath: string;
  title?: string;
  subtitle?: string;
  headerActions?: ComponentChildren;
}

export default function Layout(
  { children, currentPath, title, subtitle, headerActions }: LayoutProps,
) {
  return (
    <div class="flex min-h-screen">
      {/* 桌面端側邊欄 */}
      <div class="hidden md:block">
        <Sidebar currentPath={currentPath} />
      </div>

      {/* 移動端導航 */}
      <MobileNavToggle currentPath={currentPath} />

      <div class="flex-1 flex flex-col">
        {/* 桌面端頂部 */}
        <header class="hidden md:block bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-white text-xl font-medium">
                歡迎使用鋒兄AI資訊系統
              </h1>
            </div>
          </div>
        </header>

        <main class="flex-1 p-4 md:p-6">
          {title && (
            <div class="mb-6">
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span class="text-white text-lg">📊</span>
                  </div>
                  <div>
                    <h2 class="text-white text-xl font-medium">{title}</h2>
                    {subtitle && (
                      <p class="text-white/70 text-sm">{subtitle}</p>
                    )}
                  </div>
                </div>
                <div class="flex-shrink-0">
                  {headerActions}
                </div>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
