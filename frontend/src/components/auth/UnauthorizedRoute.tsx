import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const UnauthorizedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default UnauthorizedRoute;
