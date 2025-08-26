import {  useEffect } from "react";
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
import IDVerificationComponent from "../component/employeeVerfy";
import AdminDashboard from "../component/Admin";
import PrivateRoutes from "./PrivateRoutes";
import ArtistDashboard from "../component/artistDashboard/ArtistDashboard";
import BillingComponent from "../component/billing";
import GaurdianInfo from "../component/GaurdianInfo";
import Complications from "../component/artistDashboard/Complications";
import TattooCount from "../component/TattooCount";
import NewMedicalHistory from "../component/medicalComponents/NewMedicalHistory";
import CustomerInfo from "../component/CustomerInfo";
import { FaPowerOff } from "react-icons/fa";
import AppointmentDetails from "../component/artistDashboard/AppointmentDetails";
import i18n from "i18next";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function RoutesComponent() {
  const {
    isVisible,
    setIsVisible,
  } = useAuthContext();
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
    const handleBeforeUnload = (event) => {
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
      {isVisible && (
        <div className="flex justify-center relative w-full max-w-3xl">
          <img src="/Title.png" alt="logo" className="w-3/5 object-cover"></img>
          <button
            className="yellowButton px-4 py-2 rounded-3xl font-semibold md:block hidden absolute right-5 top-3"
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
