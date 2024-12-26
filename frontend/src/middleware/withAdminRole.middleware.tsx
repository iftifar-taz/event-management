import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSessionStore } from "@/store/sessionStore";

const withAdminRole = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const { isAdmin } = useSessionStore();
    if (isAdmin) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/dashboard" replace />;
  };
};

export default withAdminRole;
