import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { PiUserCircleFill } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import Button_bg from "../assets/Button_bg.png";
import UserContext from "../context/UserContext";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import i18n from "i18next";
import Loader from "./loader/Loader";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsVisible } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    sessionStorage.clear();
  }, []);

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = {
      username: email,
      password: password,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const url = `${apiUrl}login`;
    try {
      const response = await fetch(url, config);
      const responseData = await response.json();
      if (response.status === 401) {
        setError(responseData.error);
        setLoading(false);
        return;
      }
      if (responseData.message === "Login successful.") {
        if (responseData?.user?.lang == "es") {
          i18n.changeLanguage("es");
        }
        if (!responseData.hasOwnProperty("user")) {
          sessionStorage.setItem("token", responseData.token);
          navigate("/admin");
        }
        if (responseData?.user?.usertype === "admin") {
          sessionStorage.setItem("username", email);
          sessionStorage.setItem("minor", responseData.user.minor);
          sessionStorage.setItem("token", responseData.token);
          sessionStorage.setItem("lang", responseData.user.lang);
          sessionStorage.setItem("userType", responseData.user.usertype);
          sessionStorage.setItem("firstname", responseData.user.firstname);
          sessionStorage.setItem("lastname", responseData.user.lastname);
          sessionStorage.setItem(
            "fullname",
            `${responseData.user.firstname} ${responseData.user.lastname}`
          );
          sessionStorage.setItem(
            "initials",
            `${responseData?.user?.firstname
              ?.slice(0, 1)
              .toUpperCase()}${responseData?.user?.lastname
              ?.slice(0, 1)
              .toUpperCase()}`
          );
          setLoading(false);
          navigate("/artist-dashboard");
        }
        if (responseData?.user?.usertype === "user") {
          sessionStorage.setItem("username", email);
          sessionStorage.setItem("userId", responseData.user.id);
          sessionStorage.setItem("minor", responseData.user.minor);
          sessionStorage.setItem("token", responseData.token);
          sessionStorage.setItem("lang", responseData.user.lang);
          sessionStorage.setItem("userType", responseData.user.usertype);
          sessionStorage.setItem("firstname", responseData.user.firstname);
          sessionStorage.setItem("lastname", responseData.user.lastname);
          sessionStorage.setItem(
            "fullname",
            `${responseData.user.firstname} ${responseData.user.lastname}`
          );
          sessionStorage.setItem(
            "initials",
            `${responseData?.user?.firstname
              ?.slice(0, 1)
              .toUpperCase()}${responseData?.user?.lastname
              ?.slice(0, 1)
              .toUpperCase()}`
          );
          sessionStorage.setItem(
            "detailedInfo",
            JSON.stringify({
              address: responseData.user.address,
              city: responseData.user.city,
              state: responseData.user.state,
              zip: responseData.user.zip,
              race: responseData.user.race,
              gender: responseData.user.gender,
            })
          );
          if (responseData.user.minor === "true") {
            if (responseData.user.gaurdian_info) {
              sessionStorage.setItem(
                "gaurdianInfo",
                responseData.user.gaurdian_info
              );
            }
            navigate("/detailedinfo");
            setLoading(false);
          } else {
            navigate("/detailedinfo");
            setLoading(false);
          }
        }
      } else {
        setResponseMessage("Invalid credentials");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <img src={Title_logo} className="w-3/6 md:w-1/6"></img>
      <h1 className="text-white font-bold md:text-2xl text-lg">LOGIN</h1>
      <div className="sm:w-1/3 w-4/5">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3"
        >
          <div className="flex flex-col itmes-center gap-3">
            <div className="flex gap-3 bg-white p-2 rounded-2xl items-center">
              <PiUserCircleFill size={30} />
              <input
                type="email"
                className="flex-1 focus:outline-none bg-white p-2"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <input className='flex-1' placeholder='Email'/> */}
            </div>
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
              <NavLink
                to="/signup"
                className={" no-underline w-max text-white"}
              >
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
          <button className="yellowButton py-2 px-8 rounded-3xl font-bold flex justify-center items-center" disabled={loading}>
            {loading ? <Loader/> : "login"}
          </button>
        </form>
        {responseMessage && (
          <div className="alert alert-info mt-3">{responseMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
