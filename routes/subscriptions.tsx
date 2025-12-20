import Layout from "../components/Layout.tsx";

export default function Subscriptions() {
  const headerActions = (
    <button
      type="button"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
    >
      <span>📋</span> 添加訂閱
    </button>
  );

  const subscriptions = [
    {
      id: 1,
      name: "天成/黃信訊/心臟內科",
      category: "醫療服務",
      url: "https://www.tcmg.com.tw/index.php/main/schedule_time?id=18",
      price: "NT$ 530",
      nextPayment: "2025-12-26",
      daysLeft: 5,
      status: "active",
    },
    {
      id: 2,
      name: "kiro pro",
      category: "軟體服務",
      url: "https://app.kiro.dev/account/",
      price: "NT$ 640",
      nextPayment: "2026-01-01",
      daysLeft: 12,
      status: "active",
    },
  ];

  return (
    <Layout
      currentPath="/subscriptions"
      title="訂閱管理系統"
      subtitle="智能的合約訂閱和帳單管理"
      headerActions={headerActions}
    >
      <div class="mb-6">
        <div class="flex gap-4">
          <div class="relative flex-1">
            <input
              type="text"
              placeholder="搜尋訂閱名稱或網站..."
              class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            >
              <span class="text-lg">🔍</span>
            </button>
          </div>
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <span>🔄</span> 重新載入
          </button>
        </div>
      </div>

      <div class="space-y-4">
        {subscriptions.map((sub) => (
          <div key={sub.id} class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-white font-medium text-lg">{sub.name}</h3>
                  <span class="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                    {sub.category}
                  </span>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-white/60">網站:</span>
                    <div class="text-white mt-1 break-all">{sub.url}</div>
                  </div>
                  <div>
                    <span class="text-white/60">價格:</span>
                    <div class="text-white mt-1 font-medium">{sub.price}</div>
                  </div>
                  <div>
                    <span class="text-white/60">下次付款:</span>
                    <div class="text-white mt-1">{sub.nextPayment}</div>
                  </div>
                  <div>
                    <span class="text-white/60">剩餘天數:</span>
                    <div class="text-green-400 mt-1 font-medium">
                      {sub.daysLeft} 天
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-2 ml-4">
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  刪除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
