import { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { PiUserCircleFill } from "react-icons/pi";
import i18n from "i18next";
import Loader from "./loader/Loader";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { useMediaQuery } from "react-responsive";

function Login() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const {setUser} = useAuthContext();
  const [phoneNumber, setPhoneNumber] = useState("false");
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setIsVisible } = useAuthContext();
  const [errors, setErrors] = useState({
    userName: null,
    phoneNumber: null,
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setIsVisible(false);
    sessionStorage.clear();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   if(!email){
      setErrors({...errors, userName: "Username is required"});
      setLoading(false);
      return
    } else if(!phoneNumber || phoneNumber.trim().length < 11){
      setErrors({...errors, phoneNumber: "Phone number is required"});
      setLoading(false);
      return
    }else{
      setErrors({userName: null, phoneNumber: null});
    }

    const data = {
      userName: email,
      phoneNumber: phoneNumber,
    };

    try {
      const response = await axiosInstance.post(`login`, data);
      if (response.status === 200) {
        response.lang === "es" && i18n.changeLanguage("es");
        toast.success("Login successful");
        sessionStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        if(response.data.user.userType === "admin"){
         navigate("/artist-dashboard");
        }else{
          navigate("/detailedinfo");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-2xl h-full flex flex-col gap-4 justify-center items-center">
      <img src={Title_logo} className="w-2/5"></img>
      <h1 className="text-white font-bold md:text-2xl text-lg">LOGIN</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center gap-3 w-full px-4"
      >
        <div className="flex flex-col itmes-center gap-3">
          <label htmlFor="email" className="text-white">Email</label>
          <div className="flex flex-col">
            <div className="flex gap-3 bg-white p-2 rounded-2xl items-center">
              <PiUserCircleFill size={30} />
              <input
                type="email"
                className="flex-1 focus:outline-none bg-white p-2"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  if(e.target.value.trim() === ""){
                    setErrors({...errors, userName: "Username is required"});
                    return
                  }else{
                    setErrors({...errors, userName: null});
                  }
                  setEmail(e.target.value)}}
              />
              {/* <input className='flex-1' placeholder='Email'/> */}
            </div>
           {errors.userName && <span className="text-red-400 text-sm ml-2">{errors.userName}</span>}
          </div>

          <label htmlFor="password" className="text-white">Phone Number</label>

          <div className="flex flex-col gap-1">
              <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                <PhoneInput
                  country="us"
                  placeholder="Enter Phone Number"
                  disableDropdown
                  value={phoneNumber}
                   onChange={(value) => {
                     setPhoneNumber(value);
                     // Real-time phone number validation
                     if (value && value.length > 0) {
                       const phoneDigits = value.replace(/\D/g, '');
                       if (phoneDigits.length < 10) {
                        setErrors({...errors,  phoneNumber: "Phone number is too short" });
                       } else if (phoneDigits.length > 11) {
                        setErrors({...errors,  phoneNumber: "Phone number is too long" });
                       } else {
                        setErrors({...errors,  phoneNumber: null });
                       }
                     }
                   }}
                  inputStyle={{
                    width: isMobile ? "100% " : "98%",
                    zIndex: "0",
                  }}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-400 text-sm ml-2">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
          {/* <div className="flex gap-3 bg-white p-2 rounded-2xl items-center">
            <CiLock size={30} />
            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 focus:outline-none bg-white p-2"
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
          </div> */}
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 text-white items-center">
            {/* <input type='checkbox' className='w-4 h-4' ref={rememberMeRef} /> */}
            {/* <label>Remember Me?</label> */}
          </div>
          <div className="flex gap-2">
            <NavLink to="/signup" className={" no-underline w-max text-white"}>
              Sign Up
            </NavLink>
            <span className="text-white">|</span>
            <NavLink
              to="/forget_password"
              className={" no-underline w-max text-white"}
            >
              Forgot Password?
            </NavLink>
          </div>
        </div>
        <button
        type="submit"
          className="yellowButton py-2 px-8 rounded-3xl font-bold flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader /> : "login"}
        </button>
      </form>
      {responseMessage && (
        <div className="alert alert-info mt-3">{responseMessage}</div>
      )}
    </div>
  );
}

export default Login;
