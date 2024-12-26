import { deleteSessoin } from "@/services/session.service";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    async function logoutNow() {
      try {
        const result = await deleteSessoin();
        if (result.isSuccess) {
          setUser(null);
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
