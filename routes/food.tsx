import Layout from "../components/Layout.tsx";
import FoodManager from "../islands/FoodManager.tsx";

export default function Food() {
  return (
    <Layout
      currentPath="/food"
      title="食品管理系統"
      subtitle="智能的食品存放和到期提醒，整合 Back4App 雲端資料庫"
    >
      <FoodManager />
    </Layout>
  );
}
