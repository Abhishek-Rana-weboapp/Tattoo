import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgetPassword() {
  
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const forgetPasswordData = {
      username: email,
    };

    // Configure the request
    const url = `${apiUrl}/forgot_password`;
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
        throw new Error('Forget Password request failed');
      }

      const responseData = await response.json();
      setResponseMessage("Check you mail");
      alert(responseData.message);
      console.log('Forget Password Response:', responseData);

      // Handle the response, e.g., display a success message to the user
    } catch (error) {
      console.error('Forget Password Error:', error);
      // Handle errors and provide user feedback
    }
    // Add code for handling the forget password request here
  };

  return (
    <div
      className="container h-100"
      style={{
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
          <div className='mb-5'>
    <h3>Forget Paswword</h3>
      </div>
      <div className="col-md-6">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>

          <Link to="/login">Remember your password? Log in</Link>
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

export default ForgetPassword;
