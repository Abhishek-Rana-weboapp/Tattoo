import { createContext, useContext, useEffect, useState } from "react";
import { createInitialsAndFullName } from "../utils/helperFunctions";
import i18n from "i18next";
import axiosInstance from "../config/axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const token = sessionStorage.getItem("token");
  const [initials, setInitials] = useState("");
  const [guardianInitials, setGuardianInitials] = useState("");
  const [fullName, setFullName] = useState("");
  const [guardianfullName, setGuardianFullName] = useState("");
  const [guardianInfo, setGuardianInfo] = useState({});
  const [updateValues, setUpdateValues] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get(`check`);
      setUser(response.data.user);
      if (response.data.user.minor && response.data.user.guardian_info) {
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsCheckingLogin(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const { initials, fullname } = createInitialsAndFullName(
        user.firstName,
        user.lastName
      );
      setInitials(initials);
      setFullName(fullname);
      let newUpdateValues = {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName ? user.lastName : "",
        minor: user.minor,
        initials: initials,
      };

      if (user.minor && user.guardianInfo) {
        const guardianInfoObj = JSON.parse(user.guardianInfo);
        const { initials: guardianInitials, fullname: guardianFullName } =
          createInitialsAndFullName(
            guardianInfoObj.firstName,
            guardianInfoObj.lastName
          );
        setGuardianInfo(guardianInfoObj);
        setGuardianFullName(guardianFullName);
        setGuardianInitials(guardianInitials);
        newUpdateValues.guardianInfo = user.guardianInfo;
        newUpdateValues.guardianInitials = guardianInitials;
      }
      setUpdateValues(newUpdateValues);

      i18n.changeLanguage(user.lang);
    }
  }, [user]);

  console.log({ updateValues });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        checkAuth,
        isCheckingLogin,
        initials,
        setInitials,
        guardianInitials,
        setGuardianInitials,
        guardianfullName,
        setGuardianFullName,
        fullName,
        setFullName,
        guardianInfo,
        setGuardianInfo,
        updateValues,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used inside the AuthContextProvider"
    );
  }

  return context;
};
