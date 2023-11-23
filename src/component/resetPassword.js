import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ResetPassword() {
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
      const url = `http://localhost:3000/reset_password?username=${username}&token=${token}`;
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
    <div
      className="container h-100"
      style={{
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="mb-5">
        <h3>Reset Password</h3>
      </div>
      <div className="col-md-6">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Enter Password"
              value={psw}
              onChange={(e) => setpsw(e.target.value)}
            />
            <label htmlFor="confirm_Password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_Password"
              placeholder="Confirm Password"
              value={confirm_psw}
              onChange={(e) => setconfirm_psw(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>

          <Link to="/">Remember your password ?  Log in</Link>
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

export default ResetPassword;
