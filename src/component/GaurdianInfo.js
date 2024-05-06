import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { apiUrl } from "../url";
import { useNavigate } from "react-router-dom";
import Modal from "./modal/Modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMediaQuery } from "react-responsive";
import DatePicker from "./buttons/DatePicker";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const GaurdianInfo = () => {
  const { setAlertMessage, alert, setAlert } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storedgaurdianInfo = sessionStorage.getItem("gaurdianInfo");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [gaurdianInfo, setGaurdianInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    email: "",
    phoneNumber: "",
  });
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    if (storedgaurdianInfo) {
      setGaurdianInfo((prev) => JSON.parse(storedgaurdianInfo));
    }
  }, []);

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setGaurdianInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDate = (date)=>{
    setGaurdianInfo((prev) => ({ ...prev, dateOfBirth: date }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmptyField = Object.entries(gaurdianInfo)
      .filter(([key]) => key !== "lastName")
      .some(([_, value]) => value === "");

    if (isEmptyField) {
      setAlertMessage("Please fill in all fields");
      setAlert(!alert);
      return;
    }

    const today = new Date();
    const dob = new Date(gaurdianInfo.dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      setAlertMessage(t("Gaurdian's Age should be above 18"));
      setAlert(!alert);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gaurdianInfo.email)) {
      setAlertMessage(t("Please enter a valid email address"));
      setAlert(!alert);
      return;
    }

    await axios
      .post(`${apiUrl}/updateGuardianInitials/?userId=${userId}`, {
        gaurdian_info: JSON.stringify(gaurdianInfo),
      })
      .then((res) => {
        sessionStorage.setItem("gaurdianInfo", JSON.stringify(gaurdianInfo));
        sessionStorage.setItem(
          "gaurdianInitials",
          `${gaurdianInfo?.firstName
            .slice(0, 1)
            .toUpperCase()}${gaurdianInfo?.lastName.slice(0, 1).toUpperCase()}`
        );
        navigate("/dashboard");
      })
      .catch((err) => {
        setAlertMessage(t("Something went wrong"));
        setAlert(!alert);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full">
        <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center ">
          Gaurdian's Info
        </label>
        <form
          className="flex flex-col gap-4 md:w-1/3 w-full p-2"
          onSubmit={handleSubmit}
        >
          <input
            name="firstName"
            value={gaurdianInfo.firstName}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="First Name"
            onChange={handleInput}
          ></input>
          <input
            name="lastName"
            value={gaurdianInfo.lastName}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="Last Name"
            onChange={handleInput}
          ></input>
          <div className="bg-white rounded-md">
           <DatePicker date={gaurdianInfo.dateOfBirth} setDate={handleDate}/>
          </div>
          <input
            name="email"
            value={gaurdianInfo.email}
            className="p-2 rounded-lg w-full"
            type="email"
            placeholder="Email"
            onChange={handleInput}
          ></input>
          <PhoneInput
            country="us"
            value={gaurdianInfo.phoneNumber}
            onChange={(value) =>
              setGaurdianInfo({ ...gaurdianInfo, phoneNumber: value })
            }
            inputStyle={{ width: isMobile ? "100% " : "98%", zIndex: "0" }}
          />
          <div className="flex justify-center">
            <button className="yellowButton py-2 px-8 rounded-3xl font-bold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GaurdianInfo;
