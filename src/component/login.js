import React, {useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png"
import { PiUserCircleFill } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import Button_bg from "../assets/Button_bg.png"
import UserContext from '../context/UserContext';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import i18n from 'i18next';

function Login() {
  const { t } = useTranslation();
  const progress=5;
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [responseMessage, setResponseMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {isVisible, setIsVisible} = useContext(UserContext)

  const rememberMeRef = useRef()

  useEffect(()=>{
     setIsVisible(false)
     const storedEmail = localStorage.getItem("email")
     const storedPassword = localStorage.getItem("password")

     if(storedEmail && storedPassword){
      setEmail(storedEmail)
      setPassword(storedPassword)
     }
   },[])


  const buttonStyle = {
    backgroundImage: Button_bg,
    backgroundSize: 'cover',
    // Add any other styles you need
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const user = {
      username: email,
      password: password,
    };
    const config = {
      method: "POST",  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    };
    
    const url = `${apiUrl}/login`;  
    try {
      const response = await fetch(url, config);
       
      const responseData = await response.json();  
      if (responseData.message==='Login successful.')
      {

        if(responseData.user.lang=="eng"){
          i18n.changeLanguage('en');
          }
          else{
            i18n.changeLanguage('es');
          }
        if(responseData.user.usertype==="admin")
        {
          sessionStorage.setItem('username', email);
          sessionStorage.setItem('minor', responseData.user.minor)
          sessionStorage.setItem('token', responseData.token);
          sessionStorage.setItem('lang',responseData.lang)
          sessionStorage.setItem('userType',responseData.usertype)
          handleRememberMe()
          navigate("/artist-dashboard");
        }
        else
        {
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('minor', responseData.user.minor)
        sessionStorage.setItem('token', responseData.token);
        sessionStorage.setItem('lang',responseData.user.lang)
        sessionStorage.setItem('userType',responseData.usertype)
        navigate("/dashboard");
        }
      }
      else{
        setResponseMessage('Invalid credentials');

      }

      console.log('Response:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  
    }
    
    // Function to handle the remember me functionality

    const handleRememberMe = ()=>{
      if(rememberMeRef.current.checked){
        localStorage.setItem("email" , email)
        localStorage.setItem("password" , password)
      }else{
        localStorage.setItem("email", ""); localStorage.setItem("password", "")
      }
    }

  return (
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
      <img src={Title_logo} className='w-3/6 md:w-1/6'></img>
    <h1 className='text-white font-bold md:text-2xl text-lg'>LOGIN</h1>
        <div className="col-md-6">
        <form onSubmit={handleFormSubmit} className='flex flex-col justify-center gap-3'>
          <div className='flex flex-col itmes-center gap-3'>

            <div className='flex gap-3 bg-white p-2 rounded-2xl items-center'>
              <PiUserCircleFill size={30}/>
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
            <div className='flex gap-3 bg-white p-2 rounded-2xl items-center'>
    <CiLock size={30}/>
  <input
    type={showPassword ? "text" : "password"}
    className="flex-1 focus:outline-none bg-white p-2"
    id="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
    {showPassword ? <RiEyeOffFill size={20} onClick={() => setShowPassword(!showPassword)}/> : <RiEyeFill size={20}onClick={() => setShowPassword(!showPassword)} />}
</div>

            
         
          </div>
          <div className='flex gap-2 justify-between'>
            <div className='flex gap-2 text-white items-center'>
              <input type='checkbox' className='w-4 h-4' ref={rememberMeRef} />
              <label>Remember me?</label>
            </div>
            <div className='flex gap-2'>
        <NavLink to="/signup" className={" no-underline w-max text-white"}>Signup  </NavLink>
        <span className='text-white'>|</span>
        <NavLink to="/forget_password"  className={" no-underline w-max text-white"}>Forgot Password?</NavLink>
            </div>
          </div>
          <button className='yellowButton py-2 px-8 rounded-3xl font-bold '>
          login
          </button>
          
        </form>
        {responseMessage && (
          <div className="alert alert-info mt-3">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}


export default Login;
