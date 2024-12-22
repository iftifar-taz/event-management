import { ComponentType } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const withNoAuthentication = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const { user } = useAuthStore();
    if (!user) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/dashboard" replace />;
  };
};

export default withNoAuthentication;
