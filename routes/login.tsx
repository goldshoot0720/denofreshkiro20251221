/**
 * Login Page
 * User authentication interface
 */

import Layout from "../components/Layout.tsx";

export default function Login() {
  return (
    <Layout
      currentPath="/login"
      title="用戶登入"
      subtitle="登入以存取訂閱和食品管理功能"
    >
      <div class="max-w-md mx-auto">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <h2 class="text-2xl font-bold text-white mb-6 text-center">登入帳戶</h2>
          
          <form class="space-y-4">
            <div>
              <label class="block text-white/80 text-sm font-medium mb-2">
                用戶名稱
              </label>
              <input
                type="text"
                name="username"
                required
                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="請輸入用戶名稱"
              />
            </div>
            
            <div>
              <label class="block text-white/80 text-sm font-medium mb-2">
                密碼
              </label>
              <input
                type="password"
                name="password"
                required
                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="請輸入密碼"
              />
            </div>
            
            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              登入
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-white/60 text-sm">
              還沒有帳戶？
              <a href="/register" class="text-blue-400 hover:text-blue-300 ml-1">
                立即註冊
              </a>
            </p>
          </div>
          
          <div class="mt-4 text-center">
            <a
              href="/api/health"
              class="text-white/60 hover:text-white/80 text-sm"
            >
              檢查系統狀態
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}