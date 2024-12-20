import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  const location = useLocation();
  useEffect(() => {
    document.title = location.pathname !== "/" ? `${title} - Events` : "Events";
  }, [location, title]);

  return null; // This component doesn't render anything
};

export default PageTitle;
