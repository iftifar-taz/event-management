import { Navigate } from "react-router-dom";

const NoRouteFallback = () => {
  return <Navigate to="/dashboard" replace />;
};

export default NoRouteFallback;
