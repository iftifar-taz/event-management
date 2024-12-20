import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/authStore";
import PageTitle from "./components/PageTitle";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  // TO:DO move all routesto a const
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Home" />
            <Home />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <PageTitle title="Dashboard" />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <>
              <PageTitle title="Dashboard" />
              <Login />
            </>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <>
              <PageTitle title="Dashboard" />
              <Register />
            </>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="*"
        element={
          <>
            <PageTitle title="Not Found" />
            <NotFound />
          </>
        }
      />
    </Routes>
  );
};

export default App;
