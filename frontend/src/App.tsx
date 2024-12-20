import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/auth/RegisterPage";
import usePageTitle from "./hooks/use-pageTitle";
import NoRouteFallback from "./pages/NoRouteFallback";
import { useAuthStore } from "./store/authStore";

const App = () => {
  usePageTitle();
  const { isAuthenticated } = useAuthStore();
  // TO:DO move all routesto a const
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <RegisterPage />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route path="*" element={<NoRouteFallback />} />
    </Routes>
  );
};

export default App;
