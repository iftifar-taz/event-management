import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
