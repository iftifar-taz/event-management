import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/authStore";
import PageTitle from "./components/PageTitle";
import AuthorizedRoute from "./components/auth/AuthorizedRoute";
import UnauthorizedRoute from "./components/auth/UnauthorizedRoute";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  // TO:DO move all routes to a const
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
      <Route element={<AuthorizedRoute />}>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </>
          }
        />
      </Route>
      <Route element={<UnauthorizedRoute />}>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <>
                <PageTitle title="Login" />
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
                <PageTitle title="Register" />
                <Register />
              </>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
      </Route>
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
