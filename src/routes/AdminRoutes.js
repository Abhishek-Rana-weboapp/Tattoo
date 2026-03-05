import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isCheckingLogin } = useAuthContext();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isCheckingLogin) {
      setIsLoaded(true);
    }
  }, [isCheckingLogin]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // Logged in but NOT admin
  if (user.userType !== "admin" ) {
    return <Navigate to={user.userType === "artist" ? "/artist-dashboard":"/dashboard"} replace />;
  }

  return children;
};

export default AdminRoute;