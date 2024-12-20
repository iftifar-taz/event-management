import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/SignInPage";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectAuthenticatedUser from "./components/auth/RedirectAuthenticatedUser ";
import SignUpPage from "./pages/auth/SignUpPage";
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
        path="/sign-in"
        element={
          <RedirectAuthenticatedUser>
            <SignInPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/sign-up"
        element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="*" element={<NoRouteFallback />} />
    </Routes>
  );
};

export default App;
