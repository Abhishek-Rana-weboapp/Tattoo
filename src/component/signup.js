import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [usertype,setusertype]=useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english'); 
  const [minor,setMinor] = useState('false')
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("inter data ===",email, password,usertype);
    const user = {

      username: email,
      password: password,
      lang: selectedLanguage,
      minor: minor,
      usertype:usertype,
    };

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    };
    
    const url = `${apiUrl}/signup`
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {

          alert("Email  alredy teken, pls use diffrent email")
          throw new Error(`Sign-up request failed with status ${response.status} (${response.statusText})`);

          
        }
    
        const responseData = await response.json();
        console.log('Sign-up Response:', responseData.userData);
        if(responseData.userData.usertype==="admin")
        {
          sessionStorage.setItem('responseData',JSON.stringify(responseData));
          sessionStorage.setItem('username', email);
          sessionStorage.setItem('minor', responseData.userData.minor)
          sessionStorage.setItem('token', responseData.token);
          navigate("/AppointmentList");

        }
        else 
        {
        sessionStorage.setItem('responseData',JSON.stringify(responseData));
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('minor', responseData.userData.minor)
        sessionStorage.setItem('token', responseData.token);
        navigate("/dashboard");
        }
        
      } catch (error) {
        console.error('Sign-up Error:', error);
        
      }
    }
    console.log(navigator.language)    

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
    <h3>Signup Form</h3>
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

          <div className="mb-3">
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

          <div className="mb-3">
            <label htmlFor="usertype" className="form-label">
              usertype
            </label>
            <select
              id="usertype"
              className="form-select"
              value={usertype} 
              onChange={(e) =>setusertype(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

          </div>
          <div className="mb-3">
            <label htmlFor="language" className="form-label">
                Preferred Language
            </label>
            <select
              id="language"
              className="form-select"
              value={selectedLanguage} // Set the selected value
              onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>

            </div>
<div className="mb-3">
  <label>Are you a minor?</label>
  <div>
    <input
      type="radio"
      id="minor-true"
      name="minor"
      value="true"
      checked={minor === 'true'}
      onChange={() => setMinor('true')}
    />
    <label htmlFor="minor-true">Yes</label>
  </div>
  <div>
    <input
      type="radio"
      id="minor-false"
      name="minor"
      value="false"
      checked={minor === 'false'}
      onChange={() => setMinor('false')}
    />
    <label htmlFor="minor-false">No</label>
  </div>
</div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <Link to="/">Already have an account? Log in</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
