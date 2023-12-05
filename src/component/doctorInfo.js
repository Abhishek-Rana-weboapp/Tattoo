import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';

function DoctorContactForm() {
  var progressValue = 70;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [data, setdata] = useState()
  const [showPopup_, setShowPopup_] = useState(false);
  const options = ['yes', 'No',];
  const { drformData, setdrFormData } = React.useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdrFormData({
      ...drformData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const fetchData = async () => {
    const username = sessionStorage.getItem('username');
    try {
      const response = await fetch(`${apiUrl}/artist/username_appointment_list?username=${username}`);
      const data = await response.json();

      if (data.data.length > 0) {

        //console.log("have medical history :",data.data[data.data.length-1])    
        setdata(data.emergencycontectnumber)
        setShowPopup_(true);
      }
    } catch (error) {
      console.error('Error fetching previous medical history:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleUpdatedata = (value) => {
    console.log("value===",value)
    //console.log("medical data===",data.tattooedBefore)
    

    if (value === 'No') {
      setdrFormData({
        "name": 'aniket',
        "phone": '1234567891',
        "city": 'lllll',
        "state": 'up',
        "useDoctorRecommendation": false,
      })
      console.log("update data====",drformData)
      navigate('/consent');

    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (
      !drformData.name ||
      !drformData.phone ||
      !drformData.city ||
      !drformData.state
    ) {
      alert('All fields are required. Please fill in all the fields before submitting.');
    } else {
      console.log('Doctor contact form submitted with data:', drformData);
      navigate('/consent');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
       <img src={Title} className="w-3/5 mb-8" alt="Logo" />
      {showPopup_ && (
        <div className='popup' style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          backdropFilter: 'blur(6px)',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            width: '50%',
            minHeight: '200px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)',
            padding: '20px 40px',
            borderRadius: '12px',
          }}>
           
            <p className="text-3xl font-bold mb-4 text-black">Do you want to update your emergency contact?</p>

            {/* Dropdown menu */}
            <label className="text-3xl font-bold mb-4 text-black">Select an option:</label>
            <select
              className='bg-black'
              onChange={(e) => handleUpdatedata(e.target.value)}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button className='yellowButton py-2 px-8 rounded-3xl font-bold' onClick={() => { setShowPopup_(false);  }}>Close Popup</button>
          </div>
        </div>
      )} 
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">Doctor Contact Information</h1>
      <form  className="bg-white p-6 rounded-md shadow-md w-4/5 text-black" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="name"
            value={drformData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone #:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1 "
            type="text"
            name="phone"
            value={drformData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="city"
            value={drformData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="state"
            value={drformData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>
            Use Doctor Recommendation:
            <input
              type="checkbox"
              name="useDoctorRecommendation"
              checked={drformData.useDoctorRecommendation}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {drformData.useDoctorRecommendation && (
          <div>
            <h2>Doctor Information:</h2>
            <p>
              Carbon Health Urgent Care of Hialeah<br />
              Phone: (305) 200-1225<br />
              Address: 915 W 49th St. Hialeah, FL 33012
            </p>
          </div>
        )}

        <button className='yellowButton py-2 px-8 rounded-3xl font-bold' type="submit">Submit</button>
      </form>
      <div className='w-full h-10' >
       <ProgressBar progress={progressValue} />
    
       </div>
    </div>
  );
}

export default DoctorContactForm;
