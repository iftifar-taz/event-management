import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSessionStore } from "@/store/sessionStore";

const withNoAuthentication = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const { isAuthenticated } = useSessionStore();
    if (!isAuthenticated) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/dashboard" replace />;
  };
};

export default withNoAuthentication;
