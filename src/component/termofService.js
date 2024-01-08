// Import necessary modules and components
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConsentFormLayout from './Layout/FormLayout';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import { useTranslation } from 'react-i18next';
import UserContext from '../context/UserContext';
// Define the component
function TermsOfService() {
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  // State and initialization
  const [progressValue, setProgressValue] = useState(90);
  const [progressValue_, setProgressValue_] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [initials, setInitials] = useState({});
  const totalPages = 3; 
  const {user , alert , setAlert , setAlertMessage , formData, emerformData, drformData, setIsVisible,harmlessagreement,} = useContext(UserContext)
  const pageContents = [
    "No Foods or Drinks allowed in tattoo workstation.Please sit as still as possible while being tattooed, your final satisfaction is our priority.Only (1) additional person is allowed in tattoo station aside from the individual being tattooed.Please do not leave the workstation during a break or once the tattoo has been completed without it being covered by the artist.During a break or while being tattooed, DO NOT TOUCH YOUR TATTOO.",

    "DO NOT overexpose the tattoo to direct sunlight until it’s fully healed.DO NOT submerge tattoo in water, saltwater, pools, hot tubs, saunas, and steam until it’s fully healed.AVOID excessive sweating for at least 3 days. Refrain from workouts and engaging in physically demanding jobs / labor.DO NOT forget to ask for your aftercare products and aftercare instructions before leaving the shop.",

    "By completing the following transaction, you acknowledge and agree that all sales are final and non-refundable.We accept all major credit cards, but there will be a 10% handling fee charged. For example, $100 you will pay a $10 fee.Cash is Always Better, Save Your Money! There is an ATM across the street at Chase Bank & the gas station next door.Some tattoos are done at a fixed price given by the artist or managers.Custom full sleeves and large-scale pieces are done at an hourly shop rate of $150-$350 per hour depending on the artist.Some artists charge between $1,200 - $2,800 for a full day up to 8 hours.All cover-ups and fix-ups are done at an hourly shop rate of $200-$350 per hour depending on the artist.If you are paying by the hour depending on the tattoo, some tattoo will be charged stencil time.",
  ];

  const inputRef = useRef()

  useEffect(()=>{
    inputRef?.current?.focus()
  },[currentPage])

  // Navigation function
  const navigate = useNavigate();

  // Handle change in initials
  const handleInitialsChange = (page, initialsValue) => {
    setInitials({ ...initials, [page]: initialsValue });
  };

  // Navigate to the next page
  const nextPage = () => {
    if(!initials[currentPage]){
      setAlert(!alert)
      setAlertMessage("Please provide your initials")
    }else{
      if (currentPage < totalPages) {
        setProgressValue_(progressValue_ + 1);
        setCurrentPage(currentPage + 1);
      } else if (currentPage === 3) {
        handleSubmit()
        // navigate('/verify');
      }
    }
  };

  // Navigate to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setProgressValue_(progressValue_ - 1);
      setCurrentPage(currentPage - 1);
    }if(currentPage === 1){
      navigate(-1)
    }
  };


  const handleSubmit = async () => {
    const username = sessionStorage.getItem('username');
    const minor = sessionStorage.getItem('minor');
    const toothgem_url=sessionStorage.getItem('toothgem_url')
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
              "tattooed before": formData?.page1,
              "Pregnant or Nursing": formData?.page2,
              "hemophiliac": formData?.page3,
              "medical condition": formData?.page4,
              "communicable diseases": formData?.page5,
              "alcohol": formData?.page6,
              "allergies": formData?.page7,
              "heart condition": formData?.page8,
            },
            emergencycontectnumber: JSON.stringify(emerformData),
            doctor_information: JSON.stringify(drformData),
            WaiverRelease_url: JSON.stringify(initials),
            HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
            id_url: null,
            ArtistPiercerNames: null,
          }),
        });

        const responseData = await response.json();

        if (response.status === 201) {
          localStorage.setItem("appointmentID" , responseData.userData.id)
          // setAlert(!alert)
          // setAlertMessage("Appointment booked");
          if (minor === "true") {
            sessionStorage.setItem("appointment_detail", JSON.stringify(responseData.userData));
            navigate('/consent-guard');
          } else {
            //sessionStorage.setItem("appointment_detail", JSON.stringify(responseData.userData));
            navigate('/verify');
          }
        } else {
          setAlertMessage(t('Please fill in all the required fields.'));
          setAlert(!alert)
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  // Return the JSX structure
  return (
    <ConsentFormLayout  title="Terms of Service">
      <div className='flex flex-col gap-2 flex-1 md:p-1 p-2'>
      <p className="text-white text-center">{t(pageContents[currentPage - 1])}</p>
      <div className='flex gap-2 justify-center items-center'>
      <label className="text-white">
        {t('Initials')}:
        </label>
        <input
        ref={inputRef}
          type="text"
          value={initials[currentPage] || ''}
          onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-md"
        />
      </div>
        </div>
        <ProgressBar progress={progressValue_} count={3} />
        <div className="flex justify-between mt-4">
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
          onClick={prevPage}
        >
          {t("Previous")}
        </button>
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
          onClick={nextPage}
        >
          {t("Next")}
        </button>
      </div>

    </ConsentFormLayout>
  );
}

// Export the component
export default TermsOfService;
