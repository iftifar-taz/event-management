import { ComponentType } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import env from "../lib/validateEnv";

const withAuthorizedEmail = <T extends object>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const { user } = useAuthStore();
    const authorizedEmails = env.VITE_AUTHORIZED_EMAILS.split(",");
    if (user && user.email && authorizedEmails.includes(user.email)) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/dashboard" replace />;
  };
};

export default withAuthorizedEmail;
