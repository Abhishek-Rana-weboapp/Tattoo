import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { useTranslation } from "react-i18next";
import Loader from "./loader/Loader";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMediaQuery } from "react-responsive";

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const token = urlSearchParams.get("token");

  if (!token) {
    return (
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <img src={Title_logo} className="w-3/6 md:w-1/6" alt="logo" />
        <label className="text-red-500 text-xl font-bold uppercase underline">
          Invalid Reset Link
        </label>
        <p className="text-center text-gray-600">
          This reset link is invalid or has expired.
        </p>
        <Link to="/forget_password" className="yellowButton py-2 px-8 rounded-3xl font-bold">
          Request New Reset Link
        </Link>
        <Link to="/" className="text-right">
          Back to Login
        </Link>
      </div>
    );
  }

  const normalizePhone = (value) => value.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const p1 = normalizePhone(phone);

    let finalPhone = p1;
    if (finalPhone.length === 10) finalPhone = "1" + finalPhone;

    if (finalPhone.length !== 11 || !finalPhone.startsWith("1")) {
      toast.error(t("Please enter a valid US phone number"));
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("reset_password", {
        token,
        newPhoneNumber: finalPhone,
      });

      if (res.status === 200) {
        toast.success(t("Mobile number updated successfully"));
        navigate("/");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(t("This mobile number is already linked to another account"));
      } else if (err.response?.status === 404) {
        toast.error(t("Invalid or expired reset link"));
      } else {
        toast.error(t("Failed to update mobile number"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-4">
      <img src={Title_logo} className="w-full max-w-56" alt="logo" />

      <h1 className="text-yellow-500 font-bold uppercase underline">
        Update Mobile Number
      </h1>

      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PhoneInput
            country="us"
            disableDropdown
            placeholder="Enter new phone number"
            value={phone}
            onChange={setPhone}
            inputStyle={{
              width: isMobile ? "100%" : "98%",
            }}
          />

          <button
            disabled={loading}
            className="yellowButton py-2 px-8 rounded-3xl font-bold flex justify-center items-center"
          >
            {loading ? <Loader /> : "Update Number"}
          </button>

          <Link to="/" className="text-right text-white">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;



// import {useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import Title_logo from "../assets/Title_logo.png"
// import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import Loader from './loader/Loader';
// import toast from 'react-hot-toast';
// import axiosInstance from '../config/axios';

// function ResetPassword() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword_, setShowPassword_] = useState(false);
//   const apiUrl = process.env.REACT_APP_API_BASE_URL;
//   const {t} = useTranslation()
//   const navigate = useNavigate();
//   const [psw, setpsw] = useState('');
//   const [confirm_psw, setconfirm_psw] = useState('');
//   const [responseMessage, setResponseMessage] = useState(''); // New state to store the API response message
//   const [loading, setLoading] = useState(false)

//   const urlSearchParams = new URLSearchParams(window.location.search);
//   const token = urlSearchParams.get('uuid');

//   // Check if token exists
//   if (!token) {
//     return (
//       <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
//         <img src={Title_logo} className="w-3/6 md:w-1/6"></img>
//         <label className="text-red-500 text-xl font-bold uppercase underline">
//           Invalid Reset Link
//         </label>
//         <p className="text-center text-gray-600">
//           This reset link is invalid or has expired. Please request a new password reset.
//         </p>
//         <Link to="/forget_password" className="yellowButton py-2 px-8 rounded-3xl font-bold">
//           Request New Reset Link
//         </Link>
//         <Link to="/" className="text-right">
//           Back to Login
//         </Link>
//       </div>
//     );
//   }

//   let passReg =
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

//   const handleFormSubmit = async (e) => {
//     setLoading(true)
//     e.preventDefault();
//     if (!(confirm_psw === psw)) {
//       toast.error(t("Passwords do not match. Please try again."));
//       setLoading(false);
//       return
//     } 
//     if (!passReg.test(confirm_psw)) {
//       toast.error(t("Password should be atleast 8 characters with atleast a letter, a number, a special character, 1 uppercase letter"));
//       setLoading(false);
//       return;
//     }
//       const data = {
//             token: token,
//             newPhoneNumber : confirm_psw
//           }
//       await axiosInstance.post(`reset_password`, data)
//       .then(res=>{
//         if(res.status === 200){
//           toast.success(t("Password reset successfully!"));
//           navigate("/")
//         }
//       })
//       .catch(err=>{
//         console.error("Reset password error:", err);
//         if (err.response?.status === 404) {
//           toast.error(t("Invalid or expired reset token"));
//         } else if (err.response?.status === 400) {
//           toast.error(t("Invalid request. Please try again."));
//         } else {
//           toast.error(t("Password reset failed. Please try again."));
//         }
//         return
//       }).finally(()=>{
//         setLoading(false)
//       })
//   };

//   return (

//     <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
//     <img src={Title_logo} className="w-3/6 md:w-1/6"></img>
//     <label className="text-yellow-500 text-xl font-bold uppercase underline">
//       Reset Password{" "}
//     </label>

//     <div className="w-full max-w-md">
//       <form
//         className="flex flex-col gap-3 justify-between"
//         onSubmit={handleFormSubmit}
//       >
//        <div className="flex flex-col gap-2 items-center">
//         <div className='flex gap-3 bg-white p-2 rounded-lg items-center w-full'>
//               {/* <CiLock size={30}/> */}
//               <input
//           type={showPassword ? "text" : "password"}
//             className="p-2 rounded-lg w-full focus:outline-none placeholder:select-none"
//             id="Password"
//             placeholder="Enter New Password"
//             value={psw}
//             onChange={(e) => setpsw(e.target.value)}
//           />
//           {showPassword ? <RiEyeOffFill size={20} onClick={() => setShowPassword(!showPassword)}/> : <RiEyeFill size={20}onClick={() => setShowPassword(!showPassword)} />}
//             </div>
//             <div className='flex gap-3 bg-white p-2 rounded-lg items-center w-full'>
//               {/* <CiLock size={30}/> */}
//               <input
//             type="password"
//             className="p-2 rounded-lg w-full focus:outline-none placeholder:select-none"
//             id="confirm_password"
//             placeholder="Confirm Password"
//             value={confirm_psw}
//             onChange={(e) => setconfirm_psw(e.target.value)}
//           />
//             </div>
//         </div>
//         <div className="flex flex-col gap-3">
//           <button disabled={loading} className="yellowButton py-2 px-8 rounded-3xl font-bold flex justify-center items-center">
//             {loading ? <Loader /> : "Reset Password"}
//           </button>

//           <Link to="/" className="text-right">
//             Remember your password? Log in
//           </Link>
//         </div>
//       </form>
//       {responseMessage && (
//         <div className="alert alert-info mt-3">{responseMessage}</div>
//       )}
//     </div>
//   </div>
    
//   );
// }

// export default ResetPassword;


// // <div
// //       className="container h-100"
// //       style={{
// //         backgroundColor: '#f5f5f5',
// //         display: 'flex',
// //         flexDirection: 'column',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         minHeight: '100vh',
// //       }}
// //     >
// //       <div className="mb-5">
// //         <h3>Reset Password</h3>
// //       </div>
// //       <div className="col-md-6">
// //         <form onSubmit={handleFormSubmit}>
// //           <div className="mb-3">
// //             <label htmlFor="Password" className="form-label">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="Password"
// //               placeholder="Enter Password"
// //               value={psw}
// //               onChange={(e) => setpsw(e.target.value)}
// //             />
// //             <label htmlFor="confirm_Password" className="form-label">
// //               Confirm Password
// //             </label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="confirm_Password"
// //               placeholder="Confirm Password"
// //               value={confirm_psw}
// //               onChange={(e) => setconfirm_psw(e.target.value)}
// //             />
// //           </div>

// //           <button type="submit" className="btn btn-primary">
// //             Reset Password
// //           </button>

// //           <Link to="/">Remember your password ?  Log in</Link>
// //         </form>
// //         {responseMessage && (
// //           <div className="alert alert-info mt-3">
// //             {responseMessage}
// //           </div>
// //         )}
// //       </div>
// //     </div>