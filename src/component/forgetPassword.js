import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Title_logo from "../assets/Title_logo.png";

function ForgetPassword() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { setIsVisible } = React.useContext(UserContext);

  useEffect(() => {
    setIsVisible(false);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const forgetPasswordData = {
      username: email,
    };

    // Configure the request
    const url = `${apiUrl}/forgot_password`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgetPasswordData),
    };

    try {
      const response = await fetch(url, config);
      if(response.status === 404){
        throw new Error("User not Found")
      }

      if (!response.ok) {
        throw new Error("Forget Password request failed");
      }

      const responseData = await response.json();
      setResponseMessage("Check you mail");
      alert(responseData.message);
      // Handle the response, e.g., display a success message to the user
    } catch (error) {
      setResponseMessage(error.message)
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
        {responseMessage && (
          <div className="text-red-400 text-sm mt-3">{responseMessage}</div>
        )}
          <div className="flex flex-col gap-3">
            <button className="yellowButton py-2 px-8 rounded-3xl font-bold">
              Reset Password
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
