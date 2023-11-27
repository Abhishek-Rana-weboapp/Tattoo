import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




function Login() {

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [responseMessage, setResponseMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    console.log(navigator.language)    
  return (
    <div className='container flex flex-col items-center justify-center h-screen'
    >    
     <div className='mb-5'>
    <h2>Login Form</h2>
      </div>
      <div className="col-md-6">
        <form onSubmit={handleFormSubmit} className='flex flex-col justify-center gap-3'>
          <div className='flex flex-col itmes-center gap-3'>
            
          <div className="flex flex-col itmes-center gap-1">
            <label htmlFor="email" className="">
              Email address
            </label>
            <input
              type="email"
              className="p-2 border-slate-300 rounded-md focus-within:border-blue-500 focus:shadow-outline-blue"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col itmes-center gap-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          </div>
          <button type="submit" className="btn btn-primary">
 
            Login
          </button>
          <div className='flex flex-col items-end'>
        <NavLink to="/signup" className={" no-underline w-max"}>Signup  </NavLink>
        <NavLink to="/forget_password"  className={" no-underline w-max"}>Forgot Password?</NavLink>
          </div>
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
