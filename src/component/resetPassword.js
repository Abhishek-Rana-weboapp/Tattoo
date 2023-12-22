import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png"
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword_, setShowPassword_] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [psw, setpsw] = useState('');
  const [confirm_psw, setconfirm_psw] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); // New state to store the API response message

  const urlSearchParams = new URLSearchParams(window.location.search);
  const username = urlSearchParams.get('username');
  const token = urlSearchParams.get('token');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!(confirm_psw === psw)) {
      alert('Passwords do not match. Please try again.');
    } else {
      const forgetPasswordData = {
        password: confirm_psw,
      };

      // Configure the request
      const url = `${apiUrl}/reset_password?username=${username}&token=${token}`;
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forgetPasswordData),
      };

      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          throw new Error('Reset Password request failed');
        }

        const responseData = await response.json();
        setResponseMessage(responseData.message); // Set the response message in state

        // Show the response message in a popup alert
        alert(responseData.message);
        navigate("/");
      } catch (error) {
        console.error('Reset Password Error:', error);
        // Handle errors and provide user feedback
      }
    }
  };

  return (

    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
    <img src={Title_logo} className="w-3/6 md:w-1/6"></img>
    <label className="text-yellow-500 text-xl font-bold uppercase underline">
      Reset Password{" "}
    </label>

    <div className="col-md-6">
      <form
        className="flex flex-col gap-3 justify-between"
        onSubmit={handleFormSubmit}
      >
       <div className="flex flex-col gap-2 items-center">
        <div className='flex gap-3 bg-white p-2 rounded-lg items-center w-full'>
              {/* <CiLock size={30}/> */}
              <input
          type={showPassword ? "text" : "password"}
            className="p-2 rounded-lg w-full"
            id="Password"
            placeholder="Enter New Password"
            value={psw}
            onChange={(e) => setpsw(e.target.value)}
          />
          {showPassword ? <RiEyeOffFill size={20} onClick={() => setShowPassword(!showPassword)}/> : <RiEyeFill size={20}onClick={() => setShowPassword(!showPassword)} />}
            </div>
            <div className='flex gap-3 bg-white p-2 rounded-lg items-center w-full'>
              {/* <CiLock size={30}/> */}
              <input
            type={showPassword_ ? "text" : "password"}
            className="p-2 rounded-lg w-full"
            id="confirm_password"
            placeholder="Confirm Password"
            value={confirm_psw}
            onChange={(e) => setconfirm_psw(e.target.value)}
          />
          {showPassword_ ? <RiEyeOffFill size={20} onClick={() => setShowPassword_(!showPassword_)}/> : <RiEyeFill size={20}onClick={() => setShowPassword_(!showPassword_)} />}
            </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="yellowButton py-2 px-8 rounded-3xl font-bold">
            Reset Password
          </button>

          <Link to="/login" className="text-right">
            Remember your password? Log in
          </Link>
        </div>
      </form>
      {responseMessage && (
        <div className="alert alert-info mt-3">{responseMessage}</div>
      )}
    </div>
  </div>
    
  );
}

export default ResetPassword;


// <div
//       className="container h-100"
//       style={{
//         backgroundColor: '#f5f5f5',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <div className="mb-5">
//         <h3>Reset Password</h3>
//       </div>
//       <div className="col-md-6">
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-3">
//             <label htmlFor="Password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="Password"
//               placeholder="Enter Password"
//               value={psw}
//               onChange={(e) => setpsw(e.target.value)}
//             />
//             <label htmlFor="confirm_Password" className="form-label">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="confirm_Password"
//               placeholder="Confirm Password"
//               value={confirm_psw}
//               onChange={(e) => setconfirm_psw(e.target.value)}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Reset Password
//           </button>

//           <Link to="/">Remember your password ?  Log in</Link>
//         </form>
//         {responseMessage && (
//           <div className="alert alert-info mt-3">
//             {responseMessage}
//           </div>
//         )}
//       </div>
//     </div>