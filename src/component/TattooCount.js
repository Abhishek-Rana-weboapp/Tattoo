import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import Navigation from "./navigation/Navigation";
import { useAppointmentContext } from "../context/AppointmentContext";
import toast from "react-hot-toast";

const TattooCount = () => {
  const { appointmentData, setAppointmentData, bodyLocation, setBodyLocation } = useAppointmentContext();
  const navigate = useNavigate();
  const { alert, user, setAlert, setAlertMessage, count, setCount } =
    useContext(UserContext);
  const { t } = useTranslation();
  const service = sessionStorage.getItem("typeofservice");
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
      if (services.includes(service)) {
        navigate(`/${service}`);
        return;
      }
    } else {
      toast.error(errorMessages[appointmentData.typeofservice]);
    }
  };

  //  Todo : Replace the userContext count value with appointmentData context value

  const handlePrev = () => {
    navigate(-1);
  };

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col justify-between items-center h-full md:w-4/6  w-full">
      <div className="flex flex-col items-center gap-3 ">
        <label className="font-bold text-md md:text-5xl text-white uppercase">
          {service === "tattoo"
            ? t("Tattoo Count")
            : service === "piercing"
            ? t("Piercing Count")
            : ""}
        </label>
        <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center ">
          {service === "tattoo"
            ? t("How many tattoos are you getting today? 1-10")
            : service === "piercing"
            ? t("How many piercings are you getting today? 1-10")
            : appointmentData.typeofservice === "removal"
            ? t("How many tattoos do you have? 1-10")
            : ""}
        </label>
        <select
          value={localCount}
          onChange={handleChange}
          className="text-2xl font-bold rounded-lg p-2"
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
