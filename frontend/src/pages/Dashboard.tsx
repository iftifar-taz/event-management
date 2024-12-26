import AppLayout from "@/components/layouts/AppLayout";
import { useUserStore } from "@/store/userStore";

const Dashboard = () => {
  const { user } = useUserStore();
  return (
    <AppLayout>
      <div>Dashboard</div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </AppLayout>
  );
};

export default Dashboard;
