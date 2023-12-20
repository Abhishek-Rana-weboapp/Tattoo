import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import { useTranslation } from 'react-i18next';
const IDVerificationComponent = () => {
  const { t } = useTranslation();
  var progressValue = 95;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { user, formData, emerformData, drformData, setIsVisible } = React.useContext(UserContext);
  const fileInputRef = useRef(null);

  useEffect(()=>{
    setIsVisible(true)
  },[])
  
  
  const [idPhoto, setIdPhoto] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  console.log("userdata====",user)
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
    const toothgem_url=sessionStorage.getItem('toothgem_url')

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
            bodyloacation: JSON.stringify(user),
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

  const handleButton = ()=>{
    fileInputRef?.current?.click()
 }

  return (
    
    <div className="w-full h-full flex flex-col gap-3 items-center overflow-auto bg-black p-8 text-white">
    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}> {t("ID Verification")}</h1>

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
        accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input element
        onChange={handlePhotoUpload}
      />
      <button
        className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 hover:cursor-pointer p-2 font-semibold hover:scale-105 ease-in-out duration-300"
        onClick={handleButton}
      >
        {t("Upload ID Photo")}
      </button>


      {isSubmitDisabled ? <p>{t("Please upload your ID photo before submitting.")}</p> : null}

      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className="flex items-center bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black rounded-xl text-md px-4 p-2 hover:cursor-pointer font-semibold hover:scale-105 ease-in-out duration-300"

      >
      {t("Submit")}
      </button>
    
    </div>
  );
};

export default IDVerificationComponent;
