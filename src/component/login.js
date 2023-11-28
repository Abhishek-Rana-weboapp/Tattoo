import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png"
import { PiUserCircleFill } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import Button_bg from "../assets/Button_bg.png"



function Login() {

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [responseMessage, setResponseMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

        if(responseData.user.usertype==="admin")
        
        {

          sessionStorage.setItem('username', email);
          sessionStorage.setItem('minor', responseData.user.minor)
          sessionStorage.setItem('token', responseData.token);
  
          navigate("/AppointmentList");

        }
        else
        {
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('minor', responseData.user.minor)
        sessionStorage.setItem('token', responseData.token);
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
    console.log("base url===",apiUrl)
    console.log(Button_bg)    
  return (
    <div className='container w-1/2 h-full flex flex-col gap-4 justify-center items-center'
    >    
    <img src={Title_logo} className=' w-72'></img>
      <div className="col-md-6">
        <form onSubmit={handleFormSubmit} className='flex flex-col justify-center gap-3'>
          <div className='flex flex-col itmes-center gap-3'>

            <div className='flex gap-3 bg-white p-2 rounded-2xl items-center'>
              <PiUserCircleFill size={30}/>
              <input
              type="email"
              className="flex-1 focus:outline-none p-2"
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
              type="password"
              className="flex-1 focus:outline-none bg-white"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
         
          </div>
          <div className='flex gap-2 justify-between'>
            <div className='flex gap-2 text-white'>
              <input type='checkbox'/>
              Remember me?
            </div>
            <div className='flex gap-2'>
        <NavLink to="/signup" className={" no-underline w-max text-white"}>Signup  </NavLink>
        <NavLink to="/forget_password"  className={" no-underline w-max text-white"}>Forgot Password?</NavLink>
            </div>
          </div>
          <button className='yellowButton py-2 px-8 rounded-3xl font-bold '>
            Login
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