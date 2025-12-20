import Layout from "../components/Layout.tsx";

export default function Food() {
  const headerActions = (
    <button
      type="button"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
    >
      <span>🍎</span> 添加食品
    </button>
  );

  const foods = [
    {
      id: 1,
      name: "【張君雅】五香海苔休閒丸子",
      brand: "張君雅",
      quantity: 3,
      price: "NT$ 0",
      status: "未設定",
      expiryDate: "2026-01-06",
      daysLeft: 17,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "【張君雅】日式串燒休閒丸子",
      brand: "張君雅",
      quantity: 6,
      price: "NT$ 0",
      status: "未設定",
      expiryDate: "2026-01-07",
      daysLeft: 18,
      image: "/api/placeholder/80/80",
    },
  ];

  return (
    <Layout
      currentPath="/food"
      title="食品管理系統"
      subtitle="智能的食品存放和到期提醒"
      headerActions={headerActions}
    >
      <div class="mb-6">
        <div class="flex gap-4">
          <div class="relative flex-1">
            <input
              type="text"
              placeholder="搜尋食品名稱或商品..."
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {foods.map((food) => (
          <div
            key={food.id}
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div class="flex gap-4">
              <div class="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <span class="text-white text-2xl">🍿</span>
              </div>

              <div class="flex-1">
                <h3 class="text-white font-medium mb-2">{food.name}</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-white/60">數量:</span>
                    <span class="text-white ml-2">{food.quantity}</span>
                  </div>
                  <div>
                    <span class="text-white/60">價格:</span>
                    <span class="text-white ml-2">{food.price}</span>
                  </div>
                  <div>
                    <span class="text-white/60">狀態:</span>
                    <span class="text-white ml-2">{food.status}</span>
                  </div>
                  <div>
                    <span class="text-white/60">到期日期:</span>
                    <span class="text-white ml-2">{food.expiryDate}</span>
                  </div>
                </div>
                <div class="mt-3">
                  <span class="text-white/60 text-sm">剩餘天數:</span>
                  <span class="text-green-400 ml-2 font-medium">
                    {food.daysLeft} 天
                  </span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 mt-4">
              <button
                type="button"
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
              >
                編輯
              </button>
              <button
                type="button"
                class="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
