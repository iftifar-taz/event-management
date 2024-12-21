import AppLayout from "@/components/layouts/AppLayout";
import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  return (
    <AppLayout>
      <div>Dashboard</div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </AppLayout>
  );
};

export default Dashboard;
