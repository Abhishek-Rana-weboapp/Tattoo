import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function EmergencyContactForm() {
  const navigate = useNavigate();
  const { emerformData, setemerFormData } = React.useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setemerFormData({ ...emerformData, [name]: value });
  };

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
    <div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
      <h1>Emergency Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={emerformData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone #:</label>
          <input
            type="text"
            name="phone"
            value={emerformData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={emerformData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={emerformData.state}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmergencyContactForm;
