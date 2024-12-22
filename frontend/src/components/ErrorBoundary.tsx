import { useState, useEffect, FC, ErrorInfo } from "react";
import { RouteProps } from "react-router-dom";

const ErrorBoundary: FC<RouteProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Error handler for catching JavaScript errors
    const handleError = (error: Error, info: React.ErrorInfo) => {
      console.error("Error caught by ErrorBoundary:", error, info);
      setHasError(true);
    };

    // Add the global error listener for uncaught errors
    window.addEventListener("error", (event: ErrorEvent) => {
      handleError(event.error, event as ErrorInfo);
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("error", (event: ErrorEvent) => {
        handleError(event.error, event as ErrorInfo);
      });
    };
  }, []);

  if (hasError) {
    // Fallback UI when an error occurs
    return <div>Something went wrong. Please try again later.</div>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
