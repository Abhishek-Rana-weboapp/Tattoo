import { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../component/login";
import SignUp from "../component/signup";
import ForgetPassword from "../component/forgetPassword";
import Resetpassword from "../component/resetPassword";
import Dashboard from "../component/dashboard";
import TattooDashboard from "../component/tatoodashboard/tatoodashboard";

import PiercingDashboard from "../component/piercingdashboard/piercingDashboard";
import ToothGem from "../component/toothGem";
import PermanentMakeup from "../component/permanentMakeup";
import HairLossPatternSelection from "../component/smp";
import EmergencyContactForm from "../component/emergency";
import DoctorContactForm from "../component/doctorInfo";
import ConsentForm from "../component/consent";
import HoldHarmlessAgreement from "../component/harmlessAgreement";
import TermsOfService from "../component/termofService";
// import UserContextProvider from '../context/UserContextProvider';
import ConsentFormGuard from "../component/consentForm";
import IDVerificationComponent from "../component/employeeVerfy";
import AdminDashboard from "../component/Admin";
import UserContext from "../context/UserContext";
import PrivateRoutes from "./PrivateRoutes";
import AlertModal from "../component/modal/AlertModal";
import ArtistDashboard from "../component/artistDashboard/ArtistDashboard";
import BillingComponent from "../component/billing";
import AdminInvite from "../component/artistDashboard/AdminInvite";
import BriefDescription from "../component/tatoodashboard/BriefDescription";
import GaurdianInfo from "../component/GaurdianInfo";
import Complications from "../component/artistDashboard/Complications";
import TattooCount from "../component/TattooCount";
import NewMedicalHistory from "../component/medicalComponents/NewMedicalHistory";
import CustomerInfo from "../component/CustomerInfo";
import { FaPowerOff } from "react-icons/fa";
import AppointmentDetails from "../component/artistDashboard/AppointmentDetails";
import i18n from "i18next";
import { Toaster } from "react-hot-toast";

export default function RoutesComponent() {
  const {
    isVisible,
    setIsVisible,
    alert,
    user,
    setUser,
    finalUser,
    setFinalUser,
    description,
    setDescription,
    formData,
    setFormData,
    emerformData,
    setemerFormData,
    drformData,
    setdrFormData,
  } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/signup" ||
      location.pathname === "/forget_password"
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedFinalUser = JSON.parse(sessionStorage.getItem("finalUser"));
    const storedDescription = JSON.parse(sessionStorage.getItem("description"));
    const storedMedicalHistory = sessionStorage.getItem("medicalHistory");
    const storedemerformData = sessionStorage.getItem("emerformData");
    const storeddrformData = sessionStorage.getItem("drformData");

    if (storedFinalUser) {
      setFinalUser(storedFinalUser);
    }
    if (storedDescription) {
      setDescription(storedDescription);
    }

    if (storedUser) {
      setUser(storedUser);
    }
    if (storedMedicalHistory) {
      setFormData(JSON.parse(storedMedicalHistory));
    }
    if (storedemerformData) {
      setemerFormData(JSON.parse(storedemerformData));
    }
    if (storeddrformData) {
      if (
        storeddrformData.name !== "" &&
        storeddrformData.state !== "Florida" &&
        storeddrformData.city !== "" &&
        storeddrformData.phone !== ""
      ) {
        setdrFormData(JSON.parse(storeddrformData));
      }
    }
    const handleBeforeUnload = (event) => {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("finalUser", JSON.stringify(finalUser));
      sessionStorage.setItem("description", JSON.stringify(description));
      if (Object.keys(formData).length > 0) {
        sessionStorage.setItem("medicalHistory", JSON.stringify(formData));
      }
      sessionStorage.setItem("emerformData", JSON.stringify(emerformData));
      sessionStorage.setItem("drformData", JSON.stringify(drformData));
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = "";

      // Your logic here (e.g., showing a confirmation dialog)
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // For Chrome
      return message; // For other browsers
    };

    // Add the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/") {
      i18n.changeLanguage("en");
    }
  }, [location]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Toaster />
      {alert && <AlertModal />}
      {isVisible && (
        <div className="flex justify-center relative">
          <img src="/Title.png" alt="logo" className="w-4/5 md:w-2/5"></img>
          <button
            className="yellowButton px-4 py-2 rounded-3xl font-semibold md:block hidden absolute right-10 top-5"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="text-yellow-600 top-2 right-2 absolute flex flex-col text-[8px] items-center md:hidden "
            onClick={handleLogout}
          >
            <FaPowerOff size={20} />
            LogOut
          </button>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />\
        <Route exact path="/forget_password" element={<ForgetPassword />} />
        <Route exact path="/reset_password" element={<Resetpassword />} />
        <Route exact path="/invite_artist" element={<AdminInvite />} />
        {/* <Route element={<PrivateRoutes/>} > */}
        <Route
          exact
          path="/detailedinfo"
          element={
            <PrivateRoutes>
              <CustomerInfo />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/gaurdian-info"
          element={
            <PrivateRoutes>
              <GaurdianInfo />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/complication"
          element={
            <PrivateRoutes>
              <Complications />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/tattoo"
          element={
            <PrivateRoutes>
              <TattooDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/count"
          element={
            <PrivateRoutes>
              <TattooCount />
            </PrivateRoutes>
          }
        />
        <Route exact path="/description" element={<BriefDescription />} />
        <Route
          exact
          path="/piercing"
          element={
            <PrivateRoutes>
              <PiercingDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/tooth-gems"
          element={
            <PrivateRoutes>
              <ToothGem />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/permanent-makeup"
          element={
            <PrivateRoutes>
              <PermanentMakeup />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/smp"
          element={
            <PrivateRoutes>
              <HairLossPatternSelection />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/medical-form"
          element={
            <PrivateRoutes>
              <NewMedicalHistory />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/emergency-contact"
          element={
            <PrivateRoutes>
              <EmergencyContactForm />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/doctor-info"
          element={
            <PrivateRoutes>
              <DoctorContactForm />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/consent"
          element={
            <PrivateRoutes>
              <ConsentForm />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/harmless-agreement"
          element={
            <PrivateRoutes>
              <HoldHarmlessAgreement />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/term"
          element={
            <PrivateRoutes>
              <TermsOfService />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/verify"
          element={
            <PrivateRoutes>
              <IDVerificationComponent />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/consent-guard"
          element={
            <PrivateRoutes>
              <ConsentFormGuard />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <PrivateRoutes>
              <AdminDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/appointmentdetails"
          element={
            <PrivateRoutes>
              <AppointmentDetails />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/artist-dashboard"
          element={
            <PrivateRoutes>
              <ArtistDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/billing/:step"
          element={
            <PrivateRoutes>
              <BillingComponent />
            </PrivateRoutes>
          }
        />
        {/* </Route> */}
        {/* <Route element={<AdminRoutes/>}>
      </Route> */}
      </Routes>
    </>
  );
}
