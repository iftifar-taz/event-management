import { deleteSessoin } from "@/services/session.service";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setIsAuthenticated, setIsAdmin } = useSessionStore();

  useEffect(() => {
    async function logoutNow() {
      try {
        const result = await deleteSessoin();
        if (result.isSuccess) {
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    }
    logoutNow();
  }, [setUser, navigate]);

  return <></>;
};

export default Logout;
