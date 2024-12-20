import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectAuthenticatedUser from "./components/auth/RedirectAuthenticatedUser ";
import RegisterPage from "./pages/auth/RegisterPage";
import usePageTitle from "./hooks/use-pageTitle";
import NoRouteFallback from "./pages/NoRouteFallback";

const App = () => {
  usePageTitle();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectAuthenticatedUser>
            <RegisterPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="*" element={<NoRouteFallback />} />
    </Routes>
  );
};

export default App;
