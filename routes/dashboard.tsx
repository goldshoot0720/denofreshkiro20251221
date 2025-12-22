/**
 * Dashboard Page
 * 儀表板頁面 - 顯示訂閱管理和食品管理的統計資訊
 */

import Layout from "../components/Layout.tsx";
import Dashboard from "../islands/Dashboard.tsx";

export default function DashboardPage() {
  return (
    <Layout
      currentPath="/dashboard"
      title="系統儀表板"
      subtitle="訂閱管理與食品管理系統的統計概覽"
    >
      <Dashboard />
    </Layout>
  );
}