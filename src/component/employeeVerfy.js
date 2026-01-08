import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VerifyUpload from "./sub-Components/VerifyUpload";
import VerifyPin from "./sub-Components/VerifyPin";
import CustomAlertModal from "./modal/CustomAlertModal";
import LoaderModal from "./modal/LoaderModal";
import VerifyService from "./sub-Components/VerifyService";
import { artists } from "../data/artistsnames";
import UploadFL from "./sub-Components/UploadFL";
import { useAppointmentContext } from "../context/AppointmentContext";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import UpdateShopLocation from "./sub-Components/UpdateShopLocation";
import UpdateFrontDeskEmployee from "./sub-Components/UpdateFrontDeskEmployee";

const IDVerificationComponent = () => {
  const { t } = useTranslation();
  const { appointment, setAppointment } = useAppointmentContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [pin, setPin] = useState();
  const [spanMessage, setSpanMessage] = useState();
  const [shopLocation, setShopLocation] = useState("Hialeah, Fl");
  const [frontDeskEmployee, setFrontDeskEmployee] = useState("");
  const [finalAlert, setFinalAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlePinSubmit = (e) => {
    e.preventDefault()
    if (!pin) {
      toast.error(t("Please provide the pin"));
    } else {
      if (parseInt(pin) === 1409) {
        setStep(1);
      } else {
        setSpanMessage("Pin is not correct");
      }
    }
  };


  

  const handleFinalClick = () => {
    setFinalAlert(!finalAlert);
    navigate("/");
  };

  const shopLocationOption = ["Hialeah, FL"];

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <>
      <h1 className="text-3xl uppercase text-white font-bold mt-4">
        {appointment[0]?.typeofservice}
      </h1>
      {finalAlert && (
        <CustomAlertModal
          message={t("Verification Done")}
          onClick={handleFinalClick}
        />
      )}
      {step === 0 && (
        <VerifyPin
          handleSubmit={handlePinSubmit}
          pin={pin}
          setPin={setPin}
          spanMessage={spanMessage}
        />
      )}
      {step === 1 && <VerifyService step={step} setStep={setStep} />}
      {step === 2 && <VerifyUpload step={step} setStep={setStep} />}
      {step === 3 && <UploadFL step={step} setStep={setStep} />}
      {step === 4 && (
       <UpdateShopLocation step={step} setStep={setStep} loading={loading} setLoading={setLoading} />
      )}
      {step === 5 && (
        <UpdateFrontDeskEmployee step={step} setStep={setStep} loading={loading} setLoading={setLoading} finalAlert={finalAlert} setFinalAlert={setFinalAlert} />
      )}
    </>
  );
};

export default IDVerificationComponent;
