import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "./buttons/DatePicker";
import { useAuthContext } from "../context/AuthContext";
import { states } from "../data/states";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import LoaderModal from "./modal/LoaderModal";

const GaurdianInfo = () => {
  const { user, setUser } = useAuthContext();
  const [otherInput, setOtherInput] = useState("")
  const [otherChecked, setOtherChecked] = useState(false)
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [guardianInfo, setGaurdianInfo] = useState(
    user.guardianInfo
      ? JSON.parse(user.guardianInfo)
      : {
          firstName: "",
          lastName: "",
          dateOfBirth: new Date(),
          email: "",
          phoneNumber: "",
          address: "",
          gender:"",
          race:"",
          state:"",
          city:"",
          zip:"",
        }
  );
  const [loading, setLoading] = useState(false)

  // const handleInput = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;
  //   setGaurdianInfo((prev) => ({ ...prev, [field]: value }));
  // };

  const handleInput = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if(name === "genderMale" || name === "genderFemale" || name === "genderOther"){
            if(name === "genderOther"){
              setOtherChecked(true)
                setGaurdianInfo(prev=>({...prev, gender : otherInput}))
            }else{
              setOtherChecked(false)
                setGaurdianInfo(prev=>({...prev, gender:value}))
            }
        }else{
            setGaurdianInfo(prev=>({...prev , [name] : value}))
        }
    }
  const handleDate = (date) => {
    setGaurdianInfo((prev) => ({ ...prev, dateOfBirth: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const isEmptyField = Object.entries(guardianInfo)
    .filter(([key]) => key !== "lastName") // allow lastName to be blank
    .some(([_, value]) => {
      if (typeof value === "string") {
        return value.trim() === ""; // catches whitespace only
      }
      if (value instanceof Date) {
        return isNaN(value.getTime()); // catches invalid dates
      }
      return value === null || value === undefined;
    });

    if (isEmptyField) {
      toast.error("Please fill in all fields");
      return;
    }

    const today = new Date();
    const dob = new Date(guardianInfo.dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      toast.error(t("Gaurdian's Age should be above 18"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guardianInfo.email)) {
      toast.error(t("Please enter a valid email address"));
      return;
    }

    try {
      setLoading(true)
      const response = await axiosInstance.put(`user/${user.id}`, {
        guardianInfo: JSON.stringify(guardianInfo),
      });
      if (response.status === 200) {
        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(t("Something went wrong"))
    }
  };

  if(loading){
    return <LoaderModal />
  }

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
            value={guardianInfo.firstName}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="First Name"
            onChange={handleInput}
          ></input>
          <input
            name="lastName"
            value={guardianInfo.lastName}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="Last Name"
            onChange={handleInput}
          ></input>
          <div className="bg-white rounded-md">
            <DatePicker date={guardianInfo.dateOfBirth} setDate={handleDate} />
          </div>
          <input
            name="email"
            value={guardianInfo.email}
            className="p-2 rounded-lg w-full"
            type="email"
            placeholder="Email"
            onChange={handleInput}
          ></input>
          <input
            name="address"
            value={guardianInfo.address}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="Address"
            onChange={handleInput}
          ></input>
          <select
            name="state"
            placeholder="State"
            type="text"
            className="p-2 rounded-lg text-black w-full"
            value={guardianInfo.state}
            onChange={handleInput}
          >
            <option value={""}>Select State</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
          <input
            name="city"
            value={guardianInfo.city}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="City"
            onChange={handleInput}
          ></input>
          <input
            name="zip"
            value={guardianInfo.zip}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="Zip"
            onChange={(e) => {
    const numericValue = e.target.value.replace(/\D/g, ""); // remove non-digits
    setGaurdianInfo((prev) => ({ ...prev, zip: numericValue }));
  }}
          ></input>
          <div className="flex items-center md:flex-row flex-col">
            <label className="flex  md:w-20 w-full text-white">{t("Gender")} :</label>
            <div className="flex flex-col md:flex-1 w-full">
              <div className="flex gap-2">
            <label className="flex gap-2 items-center ml-1 text-white">
            <input name="genderMale" type="radio" value="male" checked={guardianInfo.gender === "male"} onChange={handleInput}></input>
                {t("Male")}
            </label>
            <label className="flex gap-2 items-center text-white">
            <input name="genderFemale" type="radio" value="female" checked={guardianInfo.gender === "female"} onChange={handleInput}></input>
                {t("Female")}
            </label>
            <label className="flex gap-2 items-center text-white">
                <input name="genderOther" type="radio" checked={otherChecked} onChange={handleInput}></input>
                {t("other")} 
            </label>
              </div>
            {otherChecked && <input type="text" className="p-2 rounded-lg text-black" value={otherInput} onChange={(e)=>setOtherInput(e.target.value)} ></input>}
            </div>
          </div>
          <input
            name="race"
            value={guardianInfo.race}
            className="p-2 rounded-lg w-full"
            type="text"
            placeholder="Race"
            onChange={handleInput}
          ></input>
          <div className="">
            <PhoneInput
              country="us"
              value={guardianInfo.phoneNumber}
              onChange={(value) =>
                setGaurdianInfo({ ...guardianInfo, phoneNumber: value })
              }
              inputStyle={{ paddingLeft: "3rem", width: "100%", zIndex: "0" }}
            />
          </div>
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
