import { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { PiUserCircleFill } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import i18n from "i18next";
import Loader from "./loader/Loader";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";

function Login() {
  const {setUser} = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsVisible } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setIsVisible(false);
    sessionStorage.clear();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return alert("Both email and password required");
    }

    const data = {
      userName: email,
      password: password,
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
        className="flex flex-col justify-center gap-3 w-full"
      >
        <div className="flex flex-col itmes-center gap-3">
          <label htmlFor="email" className="text-white">Email</label>
          <div className="flex gap-3 bg-white p-2 rounded-2xl items-center">
            <PiUserCircleFill size={30} />
            <input
              type="text"
              className="flex-1 focus:outline-none bg-white p-2"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input className='flex-1' placeholder='Email'/> */}
          </div>

          <label htmlFor="password" className="text-white">Password</label>
          <div className="flex gap-3 bg-white p-2 rounded-2xl items-center">
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
          </div>
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
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
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
