import { useState } from "react";
import {NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from "./buttons/DatePicker";
import Loader from "./loader/Loader";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import { useAuthContext } from "../context/AuthContext";

function SignUp() {
  const {setUser} = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [lang, setLang] = useState("en");
  const [phoneNumber, setPhoneNumber] = useState();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [loading, setLoading] = useState(false)

  let passReg =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const handleFormSubmit = async (e) => {
         e.preventDefault();
         if(!firstName || !phoneNumber || !dateOfBirth || !userName || !password || !lang){
          toast.error(t("All fields are required"))
          return
         }

         if(!passReg.test(password)){
          toast.error(t("Password should be atleast 8 characters with atleast a letter, a number, a special character, 1 uppercase letter"))
          return
         }

         const data = {
          firstName,
          lastName,
          userName,
          password,
          dateOfBirth,
          lang,
          phoneNumber,
          userType:"user"
         }

         try {
          setLoading(true)
          const response = await axiosInstance.post("signup", data)
          if(response.status === 201){
            setUser(response.data.user);
            sessionStorage.setItem("token", response.data.token);
            toast.success("Signup Successfull");
            navigate("/detailedinfo")
          }
         } catch (error) {
           toast.error(error.response.data.message || "Failed to signup");
         }finally{
          setLoading(false);
         }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-4">
      <img src={Title_logo} className="w-2/6 md:w-1/6"></img>
      <h1 className="text-white font-bold">Sign Up</h1>
      <div className="sm:w-2/3 lg:1/3 w-4/5">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3"
        >
          <div className="flex flex-col itmes-center gap-3">
            <div className="flex md:flex-row flex-col gap-3">
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center md:w-1/2 ">
                <input
                  type="text"
                  className="w-full focus:outline-none bg-white p-1"
                  id="firstname"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {/* <input className='flex-1' placeholder='Email'/> */}
              </div>
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center md:w-1/2">
                <input
                  type="text"
                  className="w-full focus:outline-none bg-white p-1"
                  id="lastname"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {/* <input className='flex-1' placeholder='Email'/> */}
              </div>
            </div>

            <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
              <input
                type="email"
                className="flex-1 focus:outline-none bg-white p-1"
                id="userName"
                placeholder="Email"
                value={userName}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <input className='flex-1' placeholder='Email'/> */}
            </div>

            <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
              {/* <CiLock size={30}/> */}
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 focus:outline-none bg-white p-1"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <RiEyeOffFill
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <RiEyeFill
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
              <PhoneInput
             country='us'
             placeholder="Enter Phone Number"
             value={phoneNumber}
             onChange={(value)=>setPhoneNumber(value)}
             inputStyle={{width:isMobile ? "100% ": "98%", zIndex: "0"}}
             />
            </div>
            
            <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
           <DatePicker setDate={setDateOfBirth} date={dateOfBirth}/>
            </div>

            <select
              id="language"
              className="form-select p-2 rounded-lg"
              value={lang} // Set the selected value
              onChange={(e) => setLang(e.target.value)} // Update state on change
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="flex gap-2">
              <NavLink
                to="/"
                className={
                  " no-underline w-max text-white hover:text-yellow-500"
                }
              >
                Already have an account? Log In
              </NavLink>
            </div>
          </div>
          <button className="yellowButton py-2 px-8 rounded-3xl font-bold flex justify-center items-center" disabled={loading}>
           {loading ? <Loader/> :   "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
