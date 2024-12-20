import { Navigate } from "react-router-dom";

const NotFound = () => {
  return <Navigate to="/dashboard" replace />;
};

export default NotFound;
