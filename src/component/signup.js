import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import i18n from "i18next";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from "./buttons/DatePicker";
import Loader from "./loader/Loader";

function SignUp() {
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [adminUsername, setadminUsername] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [phoneNumber, setPhoneNumber] = useState();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  let passReg =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const handleFormSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const user = {
      firstname: firstName,
      lastname: lastName,
      username: email,
      password: password,
      lang: selectedLanguage,
      usertype: "user",
      phone_number: phoneNumber,
      dateofbirth: dateOfBirth,
    };
    if (
      user.firstname &&
      user.lastname &&
      user.username &&
      user.password &&
      user.dateofbirth &&
      user.usertype
    ) {
      if (!passReg.test(password)) {
        setAlertMessage(
          t(
            "Password should be atleast 8 characters with atleast a letter, a number, a special character, 1 uppercase letter"
          )
        );
        setAlert(!alert);
        setLoading(false)
        return;
      }
      await axios
        .post(`${apiUrl}signup`, user)
        .then((res) => {
          if (res.status === 201) {
            if (res.data.user.lang === "es") {
              i18n.changeLanguage("es");
            }
            sessionStorage.setItem("responseData", JSON.stringify(res.data));
            sessionStorage.setItem("username", email);
            sessionStorage.setItem("minor", res.data.user.minor);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("lang", res.data.user.lang);
            sessionStorage.setItem("userType", res.data.user.usertype);
            sessionStorage.setItem("firstname", res.data.user.firstname);
            sessionStorage.setItem("lastname", res.data.user.lastname);
            sessionStorage.setItem(
              "fullname",
              `${res.data.user.firstname} ${res.data.user.lastname}`
            );
            sessionStorage.setItem(
              "initials",
              `${res?.data?.user?.firstname
                ?.slice(0, 1)
                .toUpperCase()}${res?.data?.user?.lastname
                ?.slice(0, 1)
                .toUpperCase()}`
            );
            sessionStorage.setItem(
              "detailedInfo",
              JSON.stringify({
                address: res.data.user.address,
                city: res.data.user.city,
                state: res.data.user.state,
                zip: res.data.user.zip,
                race: res.data.user.race,
                gender: res.data.user.gender,
              })
            );
            
            if (res.data.user.minor === "true") {
              navigate("/detailedinfo");
              setLoading(false)
              return;
            }
            if (res.data.user.minor === "false") {
              navigate("/detailedinfo");
              setLoading(false)
              return;
            }
          }
        })
        .catch((err) => {
          setAlertMessage(err.response.data.error);
          setAlert(!alert);
          setLoading(false)
          return;
        });
    } else {
      setAlertMessage("Please Enter all details");
      setAlert(!alert);
      setLoading(false)
    }
  };

  const handleInviteClick = () => {
    fetch(
      `http://localhost:4000/add_admin?username_admin=${email}&psw=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: adminUsername }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "meil send successful.") {
          alert(" Mail send successfully ");
          setshowPopup(false);
        } else {
          setAlert(!alert)
          setAlertMessage(t('Invalid credentials'));
          setshowPopup(true);
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        setAlert(!alert)
        setAlertMessage(t('Something went wrong'));
      });
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
                id="email"
                placeholder="Email"
                value={email}
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
              value={selectedLanguage} // Set the selected value
              onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
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
