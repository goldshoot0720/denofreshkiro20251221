/**
 * Demo Page - Shows UI functionality with mock data
 */

import Layout from "../components/Layout.tsx";
import SubscriptionManager from "../islands/SubscriptionManager.tsx";
import FoodManager from "../islands/FoodManager.tsx";

const mockSubscriptions = [
  {
    objectId: "demo1",
    name: "Netflix",
    price: 390,
    nextdate: "2025-01-15",
    site: "https://netflix.com",
    account: "user@example.com",
    note: "家庭方案",
    category: "娛樂",
    currency: "TWD",
    status: "active" as const,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z",
  },
  {
    objectId: "demo2", 
    name: "Spotify",
    price: 149,
    nextdate: "2025-01-20",
    site: "https://spotify.com",
    account: "user@example.com",
    note: "個人方案",
    category: "音樂",
    currency: "TWD",
    status: "active" as const,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z",
  }
];

const mockFoods = [
  {
    objectId: "food1",
    name: "牛奶",
    amount: 2,
    price: 65,
    shop: "全聯",
    todate: "2025-01-05",
    brand: "光泉",
    category: "乳製品",
    unit: "瓶",
    currency: "TWD",
    status: "fresh" as const,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z",
  },
  {
    objectId: "food2",
    name: "麵包",
    amount: 1,
    price: 35,
    shop: "7-11",
    todate: "2024-12-25",
    brand: "統一",
    category: "烘焙食品",
    unit: "包",
    currency: "TWD", 
    status: "expiring_soon" as const,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z",
  }
];

export default function Demo() {
  return (
    <Layout
      currentPath="/demo"
      title="系統展示"
      subtitle="訂閱管理與食品管理系統功能展示 (使用模擬資料)"
    >
      <div class="space-y-12">
        {/* 訂閱管理展示 */}
        <section>
          <h2 class="text-2xl font-bold text-white mb-6">📋 訂閱管理系統</h2>
          <SubscriptionManager initialSubscriptions={mockSubscriptions} />
        </section>

        {/* 食品管理展示 */}
        <section>
          <h2 class="text-2xl font-bold text-white mb-6">🍎 食品管理系統</h2>
          <FoodManager initialFoods={mockFoods} />
        </section>

        {/* 說明 */}
        <section class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-white font-medium text-lg mb-4">💡 系統說明</h3>
          <div class="text-white/80 space-y-2">
            <p>• 這是一個完整的訂閱管理與食品管理系統展示</p>
            <p>• 目前使用模擬資料展示 UI 功能</p>
            <p>• 系統已整合 Back4App 雲端資料庫，需要正確的 Master Key 才能進行資料操作</p>
            <p>• 支援完整的 CRUD 操作：建立、讀取、更新、刪除</p>
            <p>• 具備智能提醒功能：即將到期的訂閱和食品會有顏色提醒</p>
            <p>• 響應式設計，支援桌面和行動裝置</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}