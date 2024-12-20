import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

export const RedirectAuthenticatedUser: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectAuthenticatedUser;
