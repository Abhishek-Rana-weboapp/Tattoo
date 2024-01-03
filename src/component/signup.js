import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Title_logo from "../assets/Title_logo.png"
import i18n from 'i18next';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function SignUp() {
  const progress=5;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const [usertype,setusertype]=useState('admin');
  const [showPopup,setshowPopup]=useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUsername,setadminUsername]=useState('')

  const [selectedLanguage, setSelectedLanguage] = useState('eng'); 
  const [minor,setMinor] = useState('false')
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("inter data ===",email, password,usertype);
    const user = {

      username: email,
      password: password,
      lang: selectedLanguage,
      minor: minor,
      usertype:"user",
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
          console.log("select lang======",responseData.userData.lang)
          if(responseData.userData.lang=="eng"){
            i18n.changeLanguage('en');
            }
            else{
              i18n.changeLanguage('es');
            }

          sessionStorage.setItem('responseData',JSON.stringify(responseData));
          sessionStorage.setItem('username', email);
          sessionStorage.setItem('minor', responseData.userData.minor)
          sessionStorage.setItem('token', responseData.token);
          sessionStorage.setItem('progress_bar',progress);
          navigate("/AppointmentList");

        }
        else 
        {
          console.log("select lang======",responseData.userData.lang)
          if(responseData.userData.lang=="eng"){
            i18n.changeLanguage('en');
            }
            else{
              i18n.changeLanguage('es');
            }
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


  return (
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'
    >    
    <img src={Title_logo} className=' w-1/6'></img>
    <h1 className='text-white font-bold uppercase'>Signup</h1>
      <div className="col-md-6">
        <form onSubmit={handleFormSubmit} className='flex flex-col justify-center gap-3'>
          <div className='flex flex-col itmes-center gap-3'>

            <div className='flex gap-3 bg-white p-2 rounded-lg items-center'>
              {/* <PiUserCircleFill size={30}/> */}
              <input
              type="email"
              className="flex-1 focus:outline-none bg-white p-1"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
              {/* <input className='flex-1' placeholder='Email'/> */}
            </div>

            <div className='flex gap-3 bg-white p-2 rounded-lg items-center'>
              {/* <CiLock size={30}/> */}
              <input
    type={showPassword ? "text" : "password"}
    className="flex-1 focus:outline-none bg-white p-2"
    id="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
    {showPassword ? <RiEyeOffFill size={20} onClick={() => setShowPassword(!showPassword)}/> : <RiEyeFill size={20}onClick={() => setShowPassword(!showPassword)} />}
            </div>
            <select
              id="language"
              className="form-select p-2 rounded-lg"
              value={selectedLanguage} // Set the selected value
              onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
            >
              <option value="eng">English</option>
              <option value="es">Spanish</option>
            </select>
            
   <div className='flex gap-2'>
    <label className='text-white'>Are you a minor?</label>
     <input
       type="radio"
       id="minor-true"
       name="minor"
       value="true"
       checked={minor === 'true'}
       onChange={() => setMinor('true')}
     />
     <label className='text-white' htmlFor="minor-true">Yes</label>
     <input
       type="radio"
       id="minor-false"
       name="minor"
       value="false"
       checked={minor === 'false'}
       onChange={() => setMinor('false')}
       />
     <label className='text-white' htmlFor="minor-false">No</label>
       </div>
         
          </div>
          <div className='flex gap-2 justify-end'>
            {/* <div className='flex gap-2 text-white'>
              <input type='checkbox'/>
              Remember me?
            </div> */}
            <div className='flex gap-2'>
            <NavLink to="/" className={" no-underline w-max text-white hover:text-yellow-500"}>Already have an account? Log in</NavLink>
        {/* <NavLink to="/signup" className={" no-underline w-max text-white"}>Signup  </NavLink>
        <NavLink to="/forget_password"  className={" no-underline w-max text-white"}>Forgot Password?</NavLink> */}
            </div>
          </div>
          <button className='yellowButton py-2 px-8 rounded-3xl font-bold '>
            Signup
          </button>
          
        </form>
        {/* {responseMessage && (
          <div className="alert alert-info mt-3">
            {responseMessage}
          </div>
        )} */}
      </div>
    </div>
//     <div className='w-full h-full flex flex-col gap-4 justify-center items-center'
//     > 
//       <img src={Title_logo} className=' w-40'></img>
//     <div className='mb-5'>
//     <h1 className='text-white font-bold uppercase'>Signup</h1>
//       </div>
//       <div className="col-md-6">
//         <form onSubmit={handleFormSubmit}>
//           <div className='flex flex-col gap-3 items-center'>
         

//             <input
//               type="email"
//               className=" focus:outline-none bg-white p-2"
//               id="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               />

//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {/* <select
//               id="usertype"
//               className="form-select"
//               value={usertype} 
//               onChange={(e) =>setusertype(e.target.value)}
//             >
//               <option value="admin">Admin</option>
//               <option value="user">User</option>
//             </select> */}

//             <select
//               id="language"
//               className="form-select"
//               value={selectedLanguage} // Set the selected value
//               onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
//             >
//               <option value="english">English</option>
//               <option value="spanish">Spanish</option>
//             </select>

// <div className='flex gap-2'>
//   <label>Are you a minor?</label>
//     <input
//       type="radio"
//       id="minor-true"
//       name="minor"
//       value="true"
//       checked={minor === 'true'}
//       onChange={() => setMinor('true')}
//     />
//     <label htmlFor="minor-true">Yes</label>

//     <input
//       type="radio"
//       id="minor-false"
//       name="minor"
//       value="false"
//       checked={minor === 'false'}
//       onChange={() => setMinor('false')}
//       />
//     <label htmlFor="minor-false">No</label>
//       </div>
 

//           <button type="submit" className="yellowButton py-2 px-8 rounded-3xl font-bold ">
//             Sign Up
//           </button>

//           <Link to="/">Already have an account? Log in</Link>
//           </div>
//         </form>
//       </div>
      
       
//       {showPopup && (

//        <div className='popup' style={{
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         padding: '20px',
//         backdropFilter: 'blur(6px)',
//         width: '60%',  // Increase the width
//         minHeight: '500px',  // Increase the height
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'black',  // Change the background color
//         color: 'white',  // Set text color
//         boxShadow: '0 0 6px rgba(0,0,0,0.1)',
//         borderRadius: '12px',
//       }}
//       >
//         <h2>Invite Admin</h2>
//         <label htmlFor="username" style={{ zIndex: 1001, color: 'white' }}>Username:</label>
// <input
//   type="text"
//   id="email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   style={{ zIndex: 1001, color: 'black', backgroundColor: 'white', border: '1px solid #ccc' }}
// />

// <label htmlFor="password" style={{ zIndex: 1001, color: 'white' }}>Password:</label>
// <input
//   type="password"
//   id="password"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   style={{ zIndex: 1001, color: 'black', backgroundColor: 'white', border: '1px solid #ccc' }}
// />

// <label htmlFor="email" style={{ zIndex: 1001, color: 'white' }}>Email:</label>
// <input
//   type="email"
//   id="email"
//   value={adminUsername}
//   onChange={(e) => setadminUsername(e.target.value)}
//   style={{ zIndex: 1001, color: 'black', backgroundColor: 'white', border: '1px solid #ccc' }}
// />
  




          
  
//   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
//     <button className="btn btn-primary" onClick={handleInviteClick}>
//       Invite
//     </button>

//     <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={() => setshowPopup(false)}>
//       Close
//     </button>
//   </div>
//       </div>
//       )}
//     </div>
  
  

  );
}

export default SignUp;
