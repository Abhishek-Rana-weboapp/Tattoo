import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import VerifyUpload from './sub-Components/VerifyUpload';
import VerifyPin from './sub-Components/VerifyPin';
import axios from 'axios';
import CustomAlertModal from './modal/CustomAlertModal';
import LoaderModal from './modal/LoaderModal';
import VerifyService from './sub-Components/VerifyService';
import { AUTHHEADERS } from '../commonFunctions/Headers';
import { artists } from '../data/artistsnames';
import UploadFL from './sub-Components/UploadFL';


const IDVerificationComponent = () => {
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const {alert , setAlert , setAlertMessage } = React.useContext(UserContext);
  const [step , setStep] = useState(0)
  const [pin , setPin] = useState()
  const [spanMessage,setSpanMessage] = useState()
  const [shopLocation , setShopLocation] = useState("Hialeah, Fl")
  const [frontDesk , setFrontDesk] = useState("")
  const [finalAlert , setFinalAlert] = useState(false)
  
  const [loading, setLoading] = useState(false);
  const appointmentIDs = sessionStorage.getItem("appointmentIDs")
  const minor = sessionStorage.getItem("minor")
  const appointment = JSON.parse(sessionStorage.getItem("appointment_details") || "")



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

    const handleShopLocation = async () => {
      if (!shopLocation) {
        setAlertMessage(t("Please select shop location"));
        setAlert(!alert);
      } else {
        setLoading(true);
        const appointmentIDs = JSON.parse(sessionStorage.getItem("appointmentIDs"));
        const requests = appointmentIDs.map((id) => {
          const data = {
            updates: [
              {
                id: id,
                updateField: "shop_location",
                updateValue: shopLocation,
              },
            ],
          };
          return axios.post(`${apiUrl}artist/post_new`, data, {
            headers: AUTHHEADERS(),
          });
        });
        await Promise.all(requests)
          .then((responses) => {
            if (responses.every((response) => response.status === 201)) {
              setStep(5);
              setLoading(false);
            } else {
              setAlertMessage(t("Error updating shop location"));
              setAlert(!alert);
              setLoading(false);
            }
          })
          .catch((err) => {
            setAlertMessage(t("Error updating shop location"));
            setAlert(!alert);
            console.error(err.message);
            setLoading(false);
          });
      }
    };

    const handleFrontDesk = async () => {
      if (!frontDesk) {
        setAlertMessage(t("Please select employee name"));
        setAlert(!alert);
      } else {
        setLoading(true);
        const appointmentIDs = JSON.parse(sessionStorage.getItem("appointmentIDs"));
        const requests = appointmentIDs.map((id) => {
          const data = {
            updates: [
              {
                id: id,
                updateField: "frontDeskEmployee",
                updateValue: frontDesk,
              },
            ],
          };
          return axios.post(`${apiUrl}artist/post_new`, data, {
            headers: AUTHHEADERS(),
          });
        });
        await Promise.all(requests)
          .then((responses) => {
            if (responses.every((response) => response.status === 201)) {
              setFinalAlert(!finalAlert);
              setLoading(false);
            } else {
              setAlertMessage(t("Error updating front desk employee"));
              setAlert(!alert);
              setLoading(false);
            }
          })
          .catch((err) => {
            setAlertMessage(t("Error updating front desk employee"));
            setAlert(!alert);
            console.error(err.message);
            setLoading(false);
          });
      }
    };


//  const handleShopLocation = async()=>{
//   if(!shopLocation){
//     setAlertMessage(t("Please select shop location"))
//     setAlert(!alert)
//   }else{
//     setLoading(true)
//     const data = {
//       updates : [{
//         id: appointmentID,
//         updateField : "shop_location",
//         updateValue : shopLocation
//       }]
//     }
//     await axios.post(`${apiUrl}artist/post_new` ,data, {headers : AUTHHEADERS()}).then((res)=>{
//       if(res.status === 201){
//         setStep(5)
//         setLoading(false)
//       }
//     }).catch((err)=>{
//       console.error(err.message)
//       setLoading(false)
//     })
//   }
//  }

//  const handleFrontDesk = async()=>{
//   if(!frontDesk){
//     setAlertMessage(t("Please select employee name"))
//     setAlert(!alert)
//   }else{
//     const data = {
//       updates : [{
//         id: appointmentID,
//         updateField : "frontDeskEmployee",
//         updateValue : frontDesk
//       }]
//     }
//     await axios.post(`${apiUrl}artist/post_new` ,data, {headers : AUTHHEADERS()}).then((res)=>{
//       if(res.status === 201){
//         setFinalAlert(!finalAlert)
//       }
//     }).catch((err)=>{
//       console.error(err.message)
//     })
//   }
//  }


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
          <h1 className="text-3xl uppercase text-white font-bold mt-4">{appointment[0]?.typeofservice}</h1>

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
      step === 3 &&  <UploadFL step={step} setStep={setStep}/>
    }
     {
      step === 4 &&  <div className='w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white'>
        <div className='w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white'>
        <label className='text-white font-bold md:text-3xl text-lg'>{t("Select Shop Location")}</label>
        <select className='p-2 rounded-xl md:w-1/4 w-full text-black font-semibold' value={shopLocation} onChange={(e)=>setShopLocation(e.target.value)}>
        {shopLocationOption.map((state)=>{
          return <option key={state} value={state}>{state}</option>
        })}
        </select>
        </div>
        <div className='w-full md:w-1/2 flex justify-between'>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={()=>appointment?.typeofservice === "tattoo" && minor === "true"  ? setStep(3) : setStep(2)}>{t("Back")}</button>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={handleShopLocation}>{t("Submit")}</button>
        </div>
      </div>
    }
     {
      step === 5 &&  <div className='w-full h-full flex flex-col justify-between items-center  overflow-auto p-8 text-white'>
        <div className='w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white'>
         <label className='text-white font-bold md:text-3xl text-lg'>{t("Select Employee Name")}</label>
        <select className='p-2 rounded-xl md:w-1/4 w-full text-black font-semibold' value={frontDesk} onChange={(e)=>setFrontDesk(e.target.value)}>
          <option value={""}>Select Employee Name</option>
          {artists.map((employee, index)=><option className='capitalize' value={employee}>{employee}</option>)}
        </select>
        </div>
        <div className='w-full md:w-1/2 flex justify-between'>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={()=>setStep(4)}>{t("Back")}</button>
        <button className='yellowButton py-2 px-4 rounded-3xl font-bold text-black' onClick={handleFrontDesk}>{t("Submit")}</button>
        </div>
      </div>
    }
    </>
  );
};

export default IDVerificationComponent;
