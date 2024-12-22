import { Route, Routes } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { withAuthentication, withNoAuthentication } from "./middleware";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Logout = lazy(() => import("./pages/Logout"));

const UnauthenticatedLogin = withNoAuthentication(Login);
const UnauthenticatedRegister = withNoAuthentication(Register);

const AuthenticatedDashboard = withAuthentication(Dashboard);
const AuthenticatedLogout = withAuthentication(Logout);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
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
                <AuthenticatedDashboard />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              <>
                <AuthenticatedLogout />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <PageTitle title="Login" />
                <UnauthenticatedLogin />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <PageTitle title="Register" />
                <UnauthenticatedRegister />
              </>
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
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
