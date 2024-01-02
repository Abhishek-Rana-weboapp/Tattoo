import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProgressBar from "./ProgressBar";
import Modal from "./modal/Modal";
import { useTranslation } from "react-i18next";


function DoctorContactForm() {
  const { t } = useTranslation();
  var progressValue = 70;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [showPopup_, setShowPopup_] = useState(true);
  const yes = t("Yes");
  const No = t("No");
  const options = [yes, No];
  const {
    drformData,
    setdrFormData,
    setIsVisible,
    alert,
    setAlert,
    setAlertMessage,
  } = React.useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdrFormData({
      ...drformData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchData = async () => {
    const username = sessionStorage.getItem("username");
    try {
      const response = await fetch(
        `${apiUrl}/artist/username_appointment_list?username=${username}`
      );
      const data = await response.json();

      if (data.data.length > 0) {
        setData(JSON.parse(data.doctor_information));
        setShowPopup_(true);
      }
    } catch (error) {
      console.error("Error fetching previous medical history:", error);
    }
  };
  console.log(data);

  useEffect(() => {
    setIsVisible(true);
    fetchData();
  }, []);

  const handleUpdatedata = (e) => {
    const value = e.target.value;
    if (value === "No") {
      console.log("prevData", data);
      setdrFormData(data);
      navigate("/consent");
    }
    if (value === "Yes" || "Sí") {
      setShowPopup_(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !drformData.name ||
      !drformData.phone ||
      !drformData.city ||
      !drformData.state
    ) {
      setAlertMessage(t("Please fill all the details"));
      setAlert(!alert);
    } else {
      navigate("/consent");
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
      {showPopup_ && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">
            {t("Do you want to update your Doctor's contact?")}
          </p>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label className="text-xl font-bold text-black">
              {t("Select an option:")}
            </label>
            <select
              className="bg-black p-2 rounded-lg"
              onChange={handleUpdatedata}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={() => {
              setShowPopup_(false);
            }}
          >
            {t("Close Popup")}
          </button>
        </Modal>
      )}
      <h1 className="text-3xl font-bold mb-4 text-yellow-500 uppercase">
        {t("Doctor Contact Information")}
      </h1>
      <form
        className="bg-gray-800 p-6 rounded-md flex flex-col flex-1 gap-3 shadow-md w-full md:w-4/5 lg:w-2/3 xl:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md w-20">
              {t("Name")}
            </label>

            <input
              className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
              type="text"
              name="name"
              value={drformData?.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md w-20">
              {t("Phone")}:
            </label>
            <input
              className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
              type="text"
              name="phone"
              value={drformData?.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md w-20">
              {t("City")}:
            </label>
            <input
              className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
              type="text"
              name="city"
              value={drformData?.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1">
            <label className="text-white font-semibold text-md w-20">
              {t("State")}:
            </label>
            <input
              className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
              type="text"
              name="state"
              value={drformData?.state}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              name="useDoctorRecommendation"
              checked={drformData?.useDoctorRecommendation}
              onChange={handleInputChange}
            />
            <label className="text-white font-semibold text-md">
              {t("Use Doctor Recommendation")}
            </label>
          </div>

          {drformData?.useDoctorRecommendation && (
            <div className="text-white font-semibold text-md">
              <h2>{t("Doctor Information")}</h2>
              <p>
                {t("Carbon Health Urgent Care of Hialeah")}
                <br />
                {t("Phone: (305) 200-1225")}
                <br />
                {t("Address: 915 W 49th St. Hialeah, FL 33012")}
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between">
          <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold mt-4 text-black"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% py-2 px-8 rounded-3xl font-bold mt-4 text-black"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="w-full h-10">
        <ProgressBar progress={progressValue} />
      </div>
    </div>
  );
}

export default DoctorContactForm;
