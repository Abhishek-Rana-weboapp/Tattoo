import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./modal/Modal";
import { useTranslation } from "react-i18next";
import { states } from "../data/states";
import { useAppointmentContext } from "../context/AppointmentContext";
import toast from "react-hot-toast";

function DoctorContactForm() {
  const { t } = useTranslation();
  const {
    appointmentData,
    setAppointmentData,
    doctorInfo,
    setDoctorInfo,
    prevFormsInfo,
  } = useAppointmentContext();

  const navigate = useNavigate();
  const [showPopup_, setShowPopup_] = useState(false);

  useEffect(() => {
    if (appointmentData?.doctorInfo) {
      setDoctorInfo(JSON.parse(appointmentData.doctorInfo));
      setShowPopup_(true)
      return;
    }

    if (prevFormsInfo?.doctorInfo) {
      setDoctorInfo(JSON.parse(prevFormsInfo.doctorInfo));
      setAppointmentData(prev=>({...prev, doctorInfo:prevFormsInfo.doctorInfo}))
      setShowPopup_(true);
      return;
    }
    setDoctorInfo({
      name: "",
      phone: "",
      city: "",
      state: "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseThisInformation = () => {
    setDoctorInfo({
      name: "Carbon Health Urgent Care of Hialeah",
      phone: "13052001225",
      city: "Hialeah",
      state: "Florida",
    });
  };

  const handleNo = () => {
    navigate("/consent");
  };

  const handleYes = () => {
    setShowPopup_(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !doctorInfo.name ||
      !doctorInfo.phone ||
      !doctorInfo.city ||
      !doctorInfo.state
    ) {
      toast.error("All fields are required");
      return; // Stop further execution
    }
    setAppointmentData(prev=>({
      ...prev, doctorInfo:JSON.stringify(doctorInfo) 
    }))
    navigate("/consent");
  };

  const handlePrev = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto p-8 text-white">
      {showPopup_ && (
        <Modal>
          <h3 className="text-center md:text-3xl text-xl font-bold mb-2 text-black">
            {t("Do you want to update your Doctor's contact?")}
          </h3>
          <div className="flex  gap-5 items-center">
            <button
              className="yellowButton text-black py-2 px-8 rounded-3xl font-bold "
              onClick={handleYes}
            >
              {t("Yes")}
            </button>
            <button
              className="yellowButton text-black py-2 px-8 rounded-3xl font-bold "
              onClick={handleNo}
            >
              {t("No")}
            </button>
          </div>
        </Modal>
      )}
      <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">
        {t("Doctor Contact Information")}
      </label>
      <form
        className="p-6 rounded-md flex flex-col flex-1 gap-3 shadow-md w-full md:w-4/5 lg:w-2/3 xl:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="w-full max-w-md md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md md:w-20 w-full text-start">
              {t("Name")}
            </label>

            <input
              className="bg-white text-black rounded-md m-1 p-1  md:flex-1 w-full"
              type="text"
              name="name"
              value={doctorInfo?.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full max-w-md md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md md:w-20 w-full text-start">
              {t("Phone")}:
            </label>
            <input
              className="bg-white text-black rounded-md m-1 p-1  md:flex-1 w-full"
              type="number"
              name="phone"
              value={doctorInfo?.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full max-w-md md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md md:w-20 w-full text-start">
              {t("City")}:
            </label>
            <input
              className="bg-white text-black rounded-md m-1 p-1  md:flex-1 w-full"
              type="text"
              name="city"
              value={doctorInfo?.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full max-w-md md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md md:w-20 w-full text-start">
              {t("State")}:
            </label>
            <select
              name="state"
              value={doctorInfo?.state}
              className="rounded-md m-1 p-1  md:flex-1 w-full text-black"
              onChange={handleInputChange}
            >
              <option value="">Select State</option>
              {states?.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </div>


          <div className="w-full md:w-3/6 flex flex-col items-center gap-1">
             <h2>Use Nearest Doctor</h2>
              <div className="text-white text-md">
                <h3 className="font-bold">{t("Doctor Information")}</h3>
                <p>
                  {t("Carbon Health Urgent Care of Hialeah")}
                  <br />
                  {t("Phone: (305) 200-1225")}
                  <br />
                  {t("Address: 915 W 49th St. Hialeah, FL 33012")}
                </p>
              </div>
          </div>
          <button
            type="button"
            onClick={handleUseThisInformation}
            className="yellowButton py-2 px-6 rounded-3xl font-bold text-black text-sm"
          >
            {t("Use This Information")}
          </button>
        </div>
        <div className="w-full flex justify-between">
          <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold mt-4 text-black"
            onClick={handlePrev}
          >
            {t("Back")}
          </button>
          <button
            className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% py-2 px-8 rounded-3xl font-bold mt-4 text-black"
            type="submit"
          >
            {t("Next")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorContactForm;
