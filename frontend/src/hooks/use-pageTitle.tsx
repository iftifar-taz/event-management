import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Events";
  }, [location]);
}

export default usePageTitle;
