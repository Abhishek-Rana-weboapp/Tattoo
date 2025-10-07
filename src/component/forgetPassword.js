import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png";
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';

function ForgetPassword() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsVisible } = useAuthContext()

  useEffect(() => {
    setIsVisible(false);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    
    if (!email) {
      toast.error("Please enter your email address");
      setLoading(false);
      return;
    }

    const forgetPasswordData = {
      username: email,
    };

    // Configure the request
    const url = `${apiUrl}forgot_password`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgetPasswordData),
    };

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();
      
      if(response.status === 404){
        toast.error("User not found");
        setResponseMessage("User not found");
        return;
      }

      if (!response.ok) {
        toast.error(responseData.error || "Forgot password request failed");
        setResponseMessage(responseData.error || "Forgot password request failed");
        return;
      }

      setResponseMessage("Check your email for reset instructions");
      toast.success("Password reset email sent successfully!");
      
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Network error. Please try again.");
      setResponseMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <img src={Title_logo} className="w-3/6 md:w-1/6"></img>
      <label className="text-yellow-500 text-xl font-bold uppercase underline">
        Forget Password?{" "}
      </label>

      <div className="col-md-6">
        <form
          className="flex flex-col gap-3 justify-between"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-2 items-center">
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
  );
}

export default ForgetPassword;
