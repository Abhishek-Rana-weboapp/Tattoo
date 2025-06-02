import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import Title_logo from "../../assets/Title_logo.png"
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../url';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function AdminInvite() {

    const location = useLocation();
    const [token , setToken] = useState()
    const [username, setUsername] = useState()
    const navigate = useNavigate()
    useEffect(() => {
      // Get the username and token from the URL
      const fetchData = async()=>{  
        const searchParams = new URLSearchParams(location.search);
        setUsername(searchParams.get('username'));
        setToken(searchParams.get('token'));
      }
      fetchData()
      }, [location.search]);

  const {setAlert, alert , setAlertMessage} = useContext(UserContext)
  const {t} = useTranslation()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async(e)=>{
    setLoading(true)
    e.preventDefault()
    if(firstName && lastName && email && password && dateOfBirth && selectedLanguage){
        const data = {
        firstname : firstName,
        lastName:lastName,
        dateofbirth:dateOfBirth,
        lang:selectedLanguage,
        password:password
    }
     await axios.post(`http://localhost:8080/add_admin_?username=${username}&token=${token}`, data).then(res=>{
      if(res.status === 201){
        navigate("/artist-dashboard")
      }
     }).catch(err=>console.log(err))
     .finally(()=>{
        setLoading(false);
      })
    }else{
      setAlert(!alert);
      setAlertMessage(t("Please provide all details"));
      setLoading(false);
    }
}


  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-4">
      <img src={Title_logo} className="w-2/6 md:w-1/6"></img>
      <h1 className="text-white font-bold uppercase">Signup</h1>
      <div className="col-md-6">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3"
        >
          <div className="flex flex-col itmes-center gap-3">
            <div className="flex md:flex-row flex-col gap-3">

            <div className="flex gap-3 bg-white p-2 rounded-lg items-center md:w-1/2">
              <input
                type="text"
                className="flex-1 focus:outline-none bg-white p-1"
                id="firstname"
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="flex gap-3 bg-white p-2 rounded-lg items-center md:w-1/2">
              <input
                type="text"
                className="flex-1 focus:outline-none bg-white p-1"
                id="lastname"
                placeholder="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
            </div>

            <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
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
             
              <input
                type="date"
                className="flex-1 focus:outline-none bg-white p-1"
                id="dateofbirth"
                placeholder="Enter Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <select
              id="language"
              className="form-select p-2 rounded-lg"
              value={selectedLanguage} // Set the selected value
              onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
            >
              <option value="eng">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <button className="yellowButton py-2 px-8 rounded-3xl font-bold ">
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}
