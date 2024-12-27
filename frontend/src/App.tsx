import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { withAuthentication, withNoAuthentication } from "./middleware";
import Loader from "./components/Loader";
import { PAGE_MODE } from "./lib/consts";
import env from "@/lib/validateEnv";
import { getAuthenticatedUser } from "./services/user.service";
import { useSessionStore } from "./store/sessionStore";
import { useUserStore } from "./store/userStore";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const EventList = lazy(() => import("./pages/EventList"));
const EventItem = lazy(() => import("./pages/EventItem"));
const Logout = lazy(() => import("./pages/Logout"));

const UnauthenticatedLogin = withNoAuthentication(Login);
const UnauthenticatedRegister = withNoAuthentication(Register);

const AuthenticatedDashboard = withAuthentication(Dashboard);
const AuthenticatedEventList = withAuthentication(EventList);
const AuthenticatedEventItem = withAuthentication(EventItem);
const AuthenticatedLogout = withAuthentication(Logout);

const App = () => {
  const { setUser } = useUserStore();
  const {
    checkingAuthentication,
    setCheckingAuthentication,
    setIsAuthenticated,
    setIsAdmin,
  } = useSessionStore();
  const authorizedEmails = env.VITE_AUTHORIZED_EMAILS.split(",");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setCheckingAuthentication(true);
    async function setSessionNow() {
      try {
        const result = await getAuthenticatedUser();
        setIsAuthenticated(!!result?.id);
        setIsAdmin(authorizedEmails.includes(result?.email));
        setUser(result || null);
        setCheckingAuthentication(false);
        navigate(location.pathname, { replace: true });
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        console.error(error);
      } finally {
        setCheckingAuthentication(false);
      }
    }
    setSessionNow();
  }, []);

  return (
    <>
      {checkingAuthentication && <Loader />}
      {!checkingAuthentication && (
        <Suspense fallback={<Loader />}>
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
                path="/events"
                element={
                  <>
                    <PageTitle title="Events" />
                    <AuthenticatedEventList />
                  </>
                }
              />
              <Route
                path="/events/create"
                element={
                  <>
                    <PageTitle title="Create Event" />
                    <AuthenticatedEventItem mode={PAGE_MODE.create} />
                  </>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <>
                    <PageTitle title="Create Event" />
                    <AuthenticatedEventItem mode={PAGE_MODE.update} />
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
      )}
    </>
  );
};

export default App;
