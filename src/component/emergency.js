import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import Modal from './modal/Modal';
function EmergencyContactForm() {
  var progressValue = 60;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { emerformData, setemerFormData } = React.useContext(UserContext);
  const [data, setdata] = useState()
  const [showPopup_, setShowPopup_] = useState(true);
  const options = ['yes', 'No',];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setemerFormData({ ...emerformData, [name]: value });
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
      setemerFormData({
        "name": 'aniket',
        "phone": '1234567891',
        "city": 'lllll',
        "state": 'up'

      })
      console.log("update data====",emerformData)
      navigate('/doctor-info')

    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (!emerformData.name || !emerformData.phone || !emerformData.city || !emerformData.state) {
      alert('All fields are required. Please fill in all the fields before submitting.');
    } else {
      console.log('Emergency contact form submitted with data:', emerformData);
      navigate('/doctor-info');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
      <img src={Title} className="w-3/5 mb-8" alt="Logo" />
      {/* {
     showPopup_ &&
        <Modal>
      <h2>Do You Need to Update Your Emergency Contact?</h2>
          <div className='flex gap-5'>
          <button className='yellowButton rounded-lg py-2 px-5 text-xl font-semibold ' onClick={() => navigate('/emergency-contact')}>Yes</button>
          <button className='yellowButton rounded-lg py-2 px-5 text-xl font-semibold ' onClick={() => {
            setShowEmergencyContactPopup(!showEmergencyContactPopup)
            setShowPopup_(!showPopup_)
            }}>No</button>
          </div>
      </Modal>
      } */}
      {showPopup_ && (
        <Modal>

           
            <p className="text-3xl font-bold mb-4 text-black">Do you want to update your emergency contact?</p>

            {/* Dropdown menu */}
            <div className='flex gap-2'>

            <label className="text-xl font-bold text-black">Select an option:</label>
            <select
              className='bg-black p-2 rounded-lg'
              onChange={(e) => handleUpdatedata(e.target.value)}
              >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
              </div>

            <button className='yellowButton py-2 px-8 rounded-3xl font-bold' onClick={() => { setShowPopup_(false);  }}>Close Popup</button>

        </Modal>
      )}
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">Emergency Contact Information</h1>
      <form className="bg-white p-6 rounded-md shadow-md w-4/5 text-black" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="name"
            value={emerformData.name}
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
            value={emerformData.phone}
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
            value={emerformData.city}
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
            value={emerformData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className='yellowButton py-2 px-8 rounded-3xl font-bold' type="submit">Submit</button>
      </form>
      
      <div className='w-full h-10' >
       <ProgressBar progress={progressValue} />
       </div>
    </div>
    
  );
}

export default EmergencyContactForm;
