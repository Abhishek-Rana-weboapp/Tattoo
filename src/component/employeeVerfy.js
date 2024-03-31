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
import LoaderModal from './modal/LoaderModal';
import VerifyService from './sub-Components/VerifyService';
import { AUTHHEADERS } from '../commonFunctions/Headers';


const IDVerificationComponent = () => {
  const { t } = useTranslation();
  var progressValue = 95;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const {setIsVisible, alert , setAlert , setAlertMessage } = React.useContext(UserContext);
  const fileInputRef = useRef(null);
  const [step , setStep] = useState(0)
  const [pin , setPin] = useState()
  const [spanMessage,setSpanMessage] = useState()
  const [shopLocation , setShopLocation] = useState("Hialeah, Fl")
  const [frontDesk , setFrontDesk] = useState("")
  const [finalAlert , setFinalAlert] = useState(false)

  useEffect(()=>{
    setIsVisible(true)
  },[])
  
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const appointmentID = sessionStorage.getItem("appointmentID")



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
    setLoading(true)
    const data = {
      updates : [{
        id: appointmentID,
        updateField : "shop_location",
        updateValue : shopLocation
      }]
    }
    await axios.post(`${apiUrl}/artist/post_new` ,data, {headers : AUTHHEADERS()}).then((res)=>{
      if(res.status === 201){
        setStep(4)
        setLoading(false)
      }
    }).catch((err)=>{
      console.error(err.message)
      setLoading(false)
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
    await axios.post(`${apiUrl}/artist/post_new` ,data, {headers : AUTHHEADERS()}).then((res)=>{
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
  "Hialeah, FL"
 ]

 if(loading){
  return <LoaderModal/>
 }

  return (
    <>
    {
      finalAlert && <CustomAlertModal message={"Verification Done"} onClick={handleFinalClick} />
    }
    {
      step === 0 && <VerifyPin handleSubmit={handlePinSubmit} pin={pin}  setPin={setPin} spanMessage={spanMessage} />
    }
    {
      step === 1 && <VerifyService step={step} setStep={setStep}/>
    }
    {
      step === 2 &&  <VerifyUpload step={step} setStep={setStep}/>
    }
     {
      step === 3 &&  <div className='w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white'>
        <div className='w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white'>
        <label className='text-white font-bold md:text-3xl text-lg'>{t("Select Shop Location")}</label>
        <select className='p-2 rounded-xl md:w-1/4 w-full text-black font-semibold' value={shopLocation} onChange={(e)=>setShopLocation(e.target.value)}>
        {shopLocationOption.map((state, index)=>{
          return <option key={state} value={state}>{state}</option>
        })}
        </select>
        </div>
        <div className='w-full md:w-1/2 flex justify-between'>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={()=>setStep(2)}>{t("Back")}</button>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={handleShopLocation}>{t("Submit")}</button>
        </div>
      </div>
    }
     {
      step === 4 &&  <div className='w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white'>
        <div className='w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white'>
         <label className='text-white font-bold md:text-3xl text-lg'>{t("Select Employee Name")}</label>
        <select className='p-2 rounded-xl md:w-1/4 w-full text-black font-semibold' value={frontDesk} onChange={(e)=>setFrontDesk(e.target.value)}>
          <option value={""}>Select Employee Name</option>
          {employeeNames.map((employee, index)=><option className='capitalize' value={employee}>{employee}</option>)}
        </select>
        </div>
        <div className='w-full md:w-1/2 flex justify-between'>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={()=>setStep(3)}>{t("Back")}</button>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={handleFrontDesk}>{t("Submit")}</button>
        </div>
      </div>
    }
    </>
  );
};

export default IDVerificationComponent;
