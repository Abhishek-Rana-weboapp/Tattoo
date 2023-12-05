import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
const IDVerificationComponent = () => {
  var progressValue = 95;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { user, formData, emerformData, drformData } = React.useContext(UserContext);

  const [idPhoto, setIdPhoto] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    uploadIdPhoto(file);
  };

  const uploadIdPhoto = (file) => {
    const formData = new FormData();
    formData.append('profile', file);

    fetch(`${apiUrl}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.profile_url) {
          setIdPhoto(data.profile_url);
          setIsSubmitDisabled(false); // Enable the submit button
        } else {
          console.error('Failed to upload ID photo.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = async () => {
    const username = sessionStorage.getItem('username');
    const minor = sessionStorage.getItem('minor');

    if (!isSubmitDisabled) {
      try {
        const response = await fetch(`${apiUrl}/appointment/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            minor: minor,
            typeofservice: user.selectedTattooType,
            bodyloacation: user.tattooLocation,
            medicalhistory: {
              "tattooed before": formData.page1,
              "Pregnant or Nursing": formData.page2,
              "hemophiliac": formData.page3,
              "medical condition": formData.page4,
              "communicable diseases": formData.page5,
              "alcohol": formData.page6,
              "allergies": formData.page7,
              "heart condition": formData.page8,
            },
            emergencycontectnumber: emerformData.phone,
            doctor_information: drformData.name,
            WaiverRelease_url: true,
            HoldHarmlessAgreement_url: true,
            id_url: idPhoto,
            ArtistPiercerNames: " ",
          }),
        });

        const responseData = await response.json();

        if (response.status === 201) {
          alert("Appointment booked");

          if (minor === "true") {
            sessionStorage.setItem("appointment_detail", JSON.stringify(responseData.userData));
            navigate('/consent-guard');
          } else {
            progressValue=100
            //sessionStorage.setItem("appointment_detail", JSON.stringify(responseData.userData));
            navigate('/');
          }
        } else {
          alert('All fields are required, please refill the form.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (

    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
      <img src={Title} className="w-3/5 mb-8" alt="Logo" />
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}> ID Verification</h1>

      {idPhoto && (
        <img
          src={idPhoto}
          width={'50%'}
          style={{ maxWidth: '100%', maxHeight: '300px', margin: '20px auto', display: 'block' }}
          alt="ID Photo"
        />)
      }

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: 'none' }}
        id="photoInput"
      />

      <label
        htmlFor="photoInput"
        style={{
          backgroundColor: '#0077b6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          margin: '10px',
          fontSize: '16px',
        }}
      >
        Upload ID Photo
      </label>

      {isSubmitDisabled ? <p>Please upload your ID photo before submitting.</p> : null}

      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        style={{
          backgroundColor: '#0077b6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          margin: '10px',
          fontSize: '16px',
        }}
      >
        Submit
      </button>
      <div className='w-full h-10' >
       
       </div>
    </div>
  );
};

export default IDVerificationComponent;
