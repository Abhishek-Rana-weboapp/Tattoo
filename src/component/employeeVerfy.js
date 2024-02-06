import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import { useTranslation } from 'react-i18next';
import VerifyUpload from './sub-Components/VerifyUpload';
import VerifyPin from './sub-Components/VerifyPin';
import axios from 'axios';
import CustomAlertModal from './modal/CustomAlertModal';
import { states } from '../data/states';

const IDVerificationComponent = () => {
  const { t } = useTranslation();
  var progressValue = 95;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { user, formData, emerformData, drformData, setIsVisible,harmlessagreement,initials, alert , setAlert , setAlertMessage } = React.useContext(UserContext);
  const fileInputRef = useRef(null);
  const [promptOpen , setPromptopen] = useState(true)
  const [step , setStep] = useState(0)
  const [pin , setPin] = useState()
  const [spanMessage,setSpanMessage] = useState()
  const [shopLocation , setShopLocation] = useState("Hialeah, Fl")
  const [frontDesk , setFrontDesk] = useState("")
  const [finalAlert , setFinalAlert] = useState(false)

  useEffect(()=>{
    setIsVisible(true)
  },[])
  
  
  const [idPhoto, setIdPhoto] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const appointmentID = sessionStorage.getItem("appointmentID")

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

  const handlePinSubmit = ()=>{
    if(!pin){
      setAlertMessage(t("Please provide the pin"))
       setAlert(!alert)
    }else{
      if(parseInt(pin) === 1234){
        setStep(1)
      }else{
        setSpanMessage("Pin is not correct")
      }
    }
    }
  


  // const handleSubmit = async () => {
  //   const username = sessionStorage.getItem('username');
  //   const minor = sessionStorage.getItem('minor');
  //   const toothgem_url=sessionStorage.getItem('toothgem_url')

  //   if (!isSubmitDisabled) {
  //     try {
  //       const response = await fetch(`${apiUrl}/appointment/post?update=true`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           username: username,
  //           minor: minor,
  //           typeofservice: user.selectedTattooType,
  //           bodyloacation: JSON.stringify(user),
  //           medicalhistory: {
  //             "tattooed before": formData?.page1,
  //             "Pregnant or Nursing": formData?.page2,
  //             "hemophiliac": formData?.page3,
  //             "medical condition": formData?.page4,
  //             "communicable diseases": formData?.page5,
  //             "alcohol": formData?.page6,
  //             "allergies": formData?.page7,
  //             "heart condition": formData?.page8,
  //           },
  //           emergencycontectnumber: JSON.stringify(emerformData),
  //           doctor_information: JSON.stringify(drformData),
  //           WaiverRelease_url: JSON.stringify(initials),
  //           HoldHarmlessAgreement_url: JSON.stringify(harmlessagreement),
  //           id_url: idPhoto,
  //           ArtistPiercerNames: null,
  //         }),
  //       });

  //       const responseData = await response.json();

  //       if (response.status === 201) {
  //         setAlert(!alert)
  //         setAlertMessage("Appointment booked");
  //         if (minor === "true") {
  //           sessionStorage.setItem("appointment_detail", JSON.stringify(responseData.userData));
  //           navigate('/consent-guard');
  //         } else {
  //           progressValue=100
  //           //sessionStorage.setItem("appointment_detail", JSON.stringify(responseData.userData));
  //           navigate('/');
  //         }
  //       } else {
  //         setAlertMessage(t('Please fill in all the required fields.'));
  //         setAlert(!alert)
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  // };

  const handleVerifyID = async(imageUrl)=>{
    if(!imageUrl){
      setAlertMessage(t("Please upload an ID"))
      setAlert(!alert)
    }else{
      const data = {
        updates : [{
          id: appointmentID,
          updateField : "id_url",
          updateValue : imageUrl
        }]
      }
      await axios.post(`${apiUrl}/artist/post_new` ,data).then((res)=>{
        if(res.status === 201){
          setStep(2)
        }
      }).catch((err)=>{
        console.error(err.message)
      })
    }
  }

  const handleButton = ()=>{
    fileInputRef?.current?.click()
 }

 const employeeNames = [
 "Adonay Llerena",
"Barbie Gonzalez",
"Cheppy Sotelo",
"Daniel Proano",
"Eduanis Rama",
"Ernie Jorge",
"Frank Gonzalez",
"Gil Benjamin",
"Jill Llerena",
"Jose Gonzalez",
"Keyla Valdes",
"Konstantin Alexeyev",
"Omar Gonzalez",
"Omar Fame Gonzalez",
"Osnely Garcia",
"Yosmany Dorta"
 ]

 const handleShopLocation = async()=>{
  if(!shopLocation){
    setAlertMessage(t("Please select shop location"))
    setAlert(!alert)
  }else{
    const data = {
      updates : [{
        id: appointmentID,
        updateField : "shop_location",
        updateValue : shopLocation
      }]
    }
    await axios.post(`${apiUrl}/artist/post_new` ,data).then((res)=>{
      if(res.status === 201){
        setStep(3)
      }
    }).catch((err)=>{
      console.error(err.message)
    })
  }
 }

 const handleFrontDesk = async()=>{
  if(!frontDesk){
    setAlertMessage(t("Please select employee name"))
    setAlert(!alert)
  }else{
    const data = {
      updates : [{
        id: appointmentID,
        updateField : "frontDeskEmployee",
        updateValue : frontDesk
      }]
    }
    await axios.post(`${apiUrl}/artist/post_new` ,data).then((res)=>{
      if(res.status === 201){
        setFinalAlert(!finalAlert)
      }
    }).catch((err)=>{
      console.error(err.message)
    })
  }
 }

 const handleFinalClick = ()=>{
  setFinalAlert(!finalAlert)
  navigate("/")
 }

 const shopLocationOption = [
  "Hialeah, Fl"
 ]

  return (
    <>
    {
      finalAlert && <CustomAlertModal message={"Verification Done"} onClick={handleFinalClick} />
    }
    {
      step === 0 && <VerifyPin handleSubmit={handlePinSubmit} pin={pin}  setPin={setPin} spanMessage={spanMessage} />
    }
    {
      step === 1 &&  <VerifyUpload handleSubmit = {handleVerifyID}/>
    }
     {
      step === 2 &&  <div className='w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white'>
        <h2 className='text-white font-bold'>Select Shop Location</h2>
        <select className='p-2 rounded-xl md:w-1/4 w-full text-black font-semibold' value={shopLocation} onChange={(e)=>setShopLocation(e.target.value)}>
        {shopLocationOption.map((state, index)=>{
          return <option key={state} value={state}>{state}</option>
        })}
        </select>
        <button className='yellowButton py-2 px-5 rounded-xl font-bold text-black' onClick={handleShopLocation}>Submit</button>
      </div>
    }
     {
      step === 3 &&  <div className='w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white'>
         <h2 className='text-white font-bold'>Select Employee Name</h2>
        <select className='p-2 rounded-xl md:w-1/4 w-full text-black font-semibold' value={frontDesk} onChange={(e)=>setFrontDesk(e.target.value)}>
          <option value={""}>Select Employee Name</option>
          {employeeNames.map((employee, index)=><option className='capitalize' value={employee}>{employee}</option>)}
        </select>
        <button className='yellowButton py-2 px-5 rounded-xl font-bold text-black' onClick={handleFrontDesk}>Submit</button>
      </div>
    }
    </>
  );
};

export default IDVerificationComponent;
