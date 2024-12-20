import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default AuthorizedRoute;
