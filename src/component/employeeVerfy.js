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

  const handleShopLocation = async () => {
    if (!shopLocation) {
      toast.error("Please select a shop location");
      return 
    }
    const updates = {
      shopLocation
    }
    try {
      setLoading(true)
      const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(response.status === 200){
        setAppointment(response.data.appointment)
        setStep(5)
        return
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  };

  const handleFrontDesk = async () => {
   if (!frontDeskEmployee) {
      toast.error("Please select a frontdesk Employee name");
      return 
    }
    const updates = {
      frontDeskEmployee
    }
    try {
      setLoading(true)
      const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(response.status === 200){
        setAppointment(response.data.appointment)
        setFinalAlert(!finalAlert)
        return
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
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
        <div className="w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white">
          <div className="w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white">
            <label className="text-white font-bold md:text-3xl text-lg">
              {t("Select Shop Location")}
            </label>
            <select
              className="p-2 rounded-xl md:w-1/4 w-full text-black font-semibold"
              value={shopLocation}
              onChange={(e) => setShopLocation(e.target.value)}
            >
              {shopLocationOption.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full md:w-1/2 flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
              onClick={() =>
                appointment.typeofservice === "tattoo" && appointment.minor
                  ? setStep(3)
                  : setStep(2)
              }
            >
              {t("Back")}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
              onClick={handleShopLocation}
            >
              {t("Submit")}
            </button>
          </div>
        </div>
      )}
      {step === 5 && (
        <div className="w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white">
          <div className="w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white">
            <label className="text-white font-bold md:text-3xl text-lg">
              {t("Select Employee Name")}
            </label>
            <select
              className="p-2 rounded-xl md:w-1/4 w-full text-black font-semibold"
              value={frontDeskEmployee}
              onChange={(e) => setFrontDeskEmployee(e.target.value)}
            >
              <option value={""}>Select Employee Name</option>
              {artists.map((employee, index) => (
                <option className="capitalize" value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 flex justify-between">
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
              onClick={() => setStep(4)}
            >
              {t("Back")}
            </button>
            <button
              className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
              onClick={handleFrontDesk}
            >
              {t("Submit")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IDVerificationComponent;
