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
    <div class="min-h-screen">
      {/* 電腦版：左右並排佈局 */}
      <div class="hidden md:flex min-h-screen">
        {/* 桌面端側邊欄 - 左側固定 */}
        <div class="flex-shrink-0">
          <Sidebar currentPath={currentPath} />
        </div>

        {/* 桌面端主內容區域 - 右側 */}
        <div class="flex-1 flex flex-col min-w-0">
          {/* 桌面端頂部 */}
          <header class="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-white text-xl font-medium">
                  歡迎使用鋒兄AI資訊系統
                </h1>
              </div>
            </div>
          </header>

          <main class="flex-1 p-6 overflow-x-hidden">
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

      {/* 手機版：正常佈局 + 漢堡選單控制的懸浮側邊欄 */}
      <div class="md:hidden min-h-screen">
        {/* 移動端導航（包含漢堡選單控制的側邊欄） */}
        <MobileNavToggle currentPath={currentPath} />

        {/* 手機版主內容區域 - 全寬度，無懸浮側邊欄 */}
        <div class="flex flex-col min-h-screen">
          <main class="flex-1 p-4">
            {title && (
              <div class="mb-6">
                <div class="flex flex-col gap-4">
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
    </div>
  );
}
