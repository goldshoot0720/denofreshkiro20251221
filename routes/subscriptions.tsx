import Layout from "../components/Layout.tsx";
import SubscriptionManager from "../islands/SubscriptionManager.tsx";

export default function Subscriptions() {
  return (
    <Layout
      currentPath="/subscriptions"
      title="訂閱管理系統"
      subtitle="智能的合約訂閱和帳單管理，整合 Back4App 雲端資料庫"
    >
      <SubscriptionManager />
    </Layout>
  );
}
