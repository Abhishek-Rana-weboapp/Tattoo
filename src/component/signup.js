import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const progress=5;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [usertype,setusertype]=useState('admin');
  const [showPopup,setshowPopup]=useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUsername,setadminUsername]=useState('')

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
          sessionStorage.setItem('progress_bar',progress);
          navigate("/AppointmentList");

        }
        else 
        {
        sessionStorage.setItem('responseData',JSON.stringify(responseData));
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('minor', responseData.userData.minor)
        sessionStorage.setItem('token', responseData.token);
        sessionStorage.setItem('progress_bar',progress)
        navigate("/dashboard");
        }
        
      } catch (error) {
        console.error('Sign-up Error:', error);
        
      }
    }

    const handleInviteClick = () => {

      fetch(`http://localhost:4000/add_admin?username_admin=${email}&psw=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:adminUsername}),
      })
        .then(response => response.json())
        .then(data => {
          if(data.message==="meil send successful.")
          {
          alert(" Mail send successfully ")
          setshowPopup(false)
          }
          else{
          alert(" Invalid credentials  ")
          setshowPopup(true)
          setEmail('')
          setPassword('')

          }
        })
        .catch(error => {
          console.log(error)
        });





      
    };

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

      <button type='submit' className="btn btn-primary" onClick={() => setshowPopup(true)}>
        Invite Admin
      </button>
      
       
      {showPopup && (

       <div className='popup' style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backdropFilter: 'blur(6px)',
        width: '60%',  // Increase the width
        minHeight: '500px',  // Increase the height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',  // Change the background color
        color: 'white',  // Set text color
        boxShadow: '0 0 6px rgba(0,0,0,0.1)',
        borderRadius: '12px',
      }}
      >
        <h2>Invite Admin</h2>
        <label htmlFor="username" style={{ zIndex: 1001, color: 'white' }}>Username:</label>
<input
  type="text"
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{ zIndex: 1001, color: 'black', backgroundColor: 'white', border: '1px solid #ccc' }}
/>

<label htmlFor="password" style={{ zIndex: 1001, color: 'white' }}>Password:</label>
<input
  type="password"
  id="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{ zIndex: 1001, color: 'black', backgroundColor: 'white', border: '1px solid #ccc' }}
/>

<label htmlFor="email" style={{ zIndex: 1001, color: 'white' }}>Email:</label>
<input
  type="email"
  id="email"
  value={adminUsername}
  onChange={(e) => setadminUsername(e.target.value)}
  style={{ zIndex: 1001, color: 'black', backgroundColor: 'white', border: '1px solid #ccc' }}
/>
  




          
  
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
    <button className="btn btn-primary" onClick={handleInviteClick}>
      Invite
    </button>

    <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={() => setshowPopup(false)}>
      Close
    </button>
  </div>
      </div>
      )}
    </div>
  
  

  );
}

export default SignUp;
