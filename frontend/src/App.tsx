import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import usePageTitle from "./hooks/use-pageTitle";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/authStore";

const App = () => {
  usePageTitle();
  const { isAuthenticated } = useAuthStore();
  // TO:DO move all routesto a const
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/login"
        element={
          !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
