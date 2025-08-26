import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "./navigation/Navigation";
import { useAppointmentContext } from "../context/AppointmentContext";
import toast from "react-hot-toast";

const TattooCount = () => {
  const { appointmentData, setAppointmentData, bodyLocation, setBodyLocation } = useAppointmentContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [localCount, setLocalCount] = useState(
    appointmentData?.count ? appointmentData.count : 1
  );


  useEffect(()=>{
    if(bodyLocation && Object.keys(bodyLocation).length > 0){
      setBodyLocation(null)
    }
  },[])

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalCount(value);
  };
  const services = ["tattoo", "piercing"];
  const errorMessages = {
    tattoo: "Please select the number of tattoos you are getting",
    piercing: "Please select the number of piercings you are getting",
    removal: "Please select how many tattoos you have",
  };

  const handleNext = () => {
    if (localCount) {
      setAppointmentData((prev) => ({ ...prev, count: localCount }));
      if (services.includes(appointmentData?.typeofservice)) {
        navigate(`/${appointmentData?.typeofservice}`);
        return;
      }
    } else {
      toast.error(errorMessages[appointmentData?.typeofservice]);
    }
  };


  const handlePrev = () => {
    navigate(-1);
  };

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col justify-between items-center h-full md:w-4/6  w-full">
      <div className="flex flex-col items-center gap-3 ">
        <label className="font-bold text-md md:text-5xl text-white uppercase">
          {appointmentData?.typeofservice === "tattoo"
            ? t("Tattoo Count")
            : appointmentData?.typeofservice === "piercing"
            ? t("Piercing Count")
            : ""}
        </label>
        <label className="font-bold text-xl  md:text-2xl text-white  uppercase text-center ">
          {appointmentData?.typeofservice === "tattoo"
            ? t("How many tattoos are you getting today? 1-10")
            : appointmentData?.typeofservice === "piercing"
            ? t("How many piercings are you getting today? 1-10")
            : appointmentData?.typeofservice === "removal"
            ? t("How many tattoos do you have? 1-10")
            : ""}
        </label>
        <select
          value={localCount}
          onChange={handleChange}
          className="text-2xl font-bold rounded-lg px-2 py-1 w-24"
        >
          {options.map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <Navigation next={handleNext} prev={handlePrev} />
    </div>
  );
};

export default TattooCount;
