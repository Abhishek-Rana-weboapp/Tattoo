import {useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';
import axiosInstance from "../config/axios";
import { t } from "i18next";
import { IoArrowBack } from "react-icons/io5";


function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsVisible } = useAuthContext()

  useEffect(() => {
    setIsVisible(false);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email) {
      toast.error("Please enter your email address");
      setLoading(false);
      return;
    }

    const forgetPasswordData = {
      username: email,
    };

    try {
      const response = await axiosInstance.post('forgot_password', forgetPasswordData);
      if(response.status === 200){
        toast.success("Password reset email sent successfully!");
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Forgot password request failed");
    }finally{
      setLoading(false);
    }

    // Configure the request
    // const url = `${apiUrl}forgot_password`;
    // const config = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(forgetPasswordData),
    // };

    // try {
    //   const response = await fetch(url, config);
    //   const responseData = await response.json();
      
    //   if(response.status === 404){
    //     toast.error("User not found");
    //     ("User not found");
    //     return;
    //   }

    //   if (!response.ok) {
    //     toast.error(responseData.error || "Forgot password request failed");
    //     (responseData.error || "Forgot password request failed");
    //     return;
    //   }

    //   ("Check your email for reset instructions");
    //   toast.success("Password reset email sent successfully!");
      
    // } catch (error) {
    //   console.error("Forgot password error:", error);
    //   toast.error("Network error. Please try again.");
    //   ("Network error. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <IoArrowBack className="text-yellow-400 mt-5 ml-4" size={35} onClick={()=>navigate(-1)}/>
      <div className="content-center flex-1">
        <img src={Title_logo} className="w-full max-w-56 mx-auto"></img>
        <h1 className="text-yellow-500 text-xl font-bold uppercase underline text-center mt-6">
          Forget Password?{" "}
        </h1>
        <div className="max-w-xl mx-auto mt-6 px-4">
          <form
            className="flex flex-col gap-3 justify-between"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="" className="text-yellow-400 font-medium">
                Enter Email
              </label>
              <input
                type="email"
                className="p-2 rounded-lg w-full"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="yellowButton py-2 px-8 rounded-3xl font-bold disabled:opacity-50"
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
              <Link to="/" className="text-right">
                Remember your password? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
