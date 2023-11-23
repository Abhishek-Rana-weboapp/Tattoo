import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

function DoctorContactForm() {
  const navigate = useNavigate();
  const { drformData, setdrFormData } = React.useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdrFormData({
      ...drformData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

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
    <div className='outer container' style={{ border: '1px solid #d8d6d6' }}>
      <h1>Doctor Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DoctorContactForm;
