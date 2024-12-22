import { ComponentType } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const withAuthentication = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const { user } = useAuthStore();
    if (user && user.id) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/login" replace />;
  };
};

export default withAuthentication;
