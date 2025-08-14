


import { useEffect, useState } from "react";
import { Navigate,useLocation} from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoutes = ({children}) => {
  const { user, isCheckingLogin } = useAuthContext();
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false);

  
  useEffect(() => {
    if (!isCheckingLogin) {
      setIsLoaded(true);
    }
  }, [isCheckingLogin]);


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoutes;
