import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import Modal from './modal/Modal';
import { useTranslation } from 'react-i18next';
import AlertModal from './modal/AlertModal';
import {states} from '../data/states';
import LoaderModal from './modal/LoaderModal';
import axios from 'axios';
import { AUTHHEADERS } from '../commonFunctions/Headers';
function EmergencyContactForm() {
  const { t } = useTranslation();
  var progressValue = 60;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { emerformData, setemerFormData,alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPopup_, setShowPopup_] = useState(false);
    const username = sessionStorage.getItem('username');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setemerFormData({ ...emerformData, [name]: value === "Select City"?"":value}
    );
  };

  
  useEffect(() => {
    
    const fetchMedicalHistory = async()=>{
      try{
        setLoading(true)
        const response = await axios.get(`${apiUrl}/artist/user_history?username=${username}`, {headers:AUTHHEADERS()})
        const filterResponse = response.data.emergencycontactnumber
        let finalResult = {};
        try {
          finalResult = JSON.parse(filterResponse)
        } catch (error) {
          console.error("Error parsing JSON:", error);
          finalResult = {};
        }
        if(Object.keys(finalResult).length  === 0){
          setLoading(false)
          return
        }
        setemerFormData(finalResult)
        setLoading(false)
        setShowPopup_(true)
        return 
      }catch(err){
        console.log(err)
      setLoading(false)
      setAlert(!alert)
      setAlertMessage(t("Something went wrong"))
      return
      }
  }
    
    fetchMedicalHistory()
  }, [])

  const handleYes = ()=>{
      setShowPopup_(false)
  }

  const handleNo = ()=>{
    navigate('/doctor-info')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the form fields are empty
    if (!emerformData.name || !emerformData.phone || !emerformData.city || !emerformData.state) {
    setAlert(!alert)
    setAlertMessage(t("Please fill all the details"))
  } else {
      console.log('Emergency contact form submitted with data:', emerformData);
      navigate('/doctor-info');
    }
  };

  const handlePrev = (e)=>{
    e.preventDefault()
    navigate(-1)
  }

  if(loading){
    return <LoaderModal/>
  }

  return (
    <>
    <div className="w-full h-full flex flex-col items-center overflow-auto p-8 text-white">
      {showPopup_ && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">{t("Do you want to update your emergency contact")}?</p>
          <div className="flex gap-5">
          <button className="yellowButton py-2 px-8 rounded-3xl font-bold text-black" onClick={handleYes}>
          {t("Yes")}
          </button>
          <button className="yellowButton py-2 px-8 rounded-3xl font-bold text-black" onClick={handleNo}>
          {t("No")}
          </button>
          </div>
        </Modal>
      )}
      <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">{t("Emergency Contact Information")}</label>
      <form className=" p-6 rounded-md flex flex-col shadow-md flex-1 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 text-black" onSubmit={handleSubmit}>

      <div className='flex flex-col gap-3 flex-1 items-center'>

      <div className='w-full md:w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md md:w-20 w-full text-start">{t("Name")}:</label>
          <input
          className="bg-white text-black rounded-md m-1 p-1 md:flex-1 w-full"

          type="text"
          name="name"
          value={emerformData?.name}
            onChange={handleInputChange}
            />
        </div>
<div className='w-full md:w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md md:w-20 w-full text-start">{t("Phone")}:</label>
          <input
           className="bg-white text-black rounded-md m-1 p-1 md:flex-1 w-full"

           type="number"
           name="phone"
           value={emerformData?.phone}
           onChange={handleInputChange}
           />
        </div>
        <div className='w-full md:w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md md:w-20 w-full text-start">{t("City")}:</label>
          <input
          className="bg-white text-black rounded-md m-1 p-1 md:flex-1 w-full"

          type="text"
          name="city"
          value={emerformData?.city}
            onChange={handleInputChange}
          />
        </div>
        <div className='w-full md:w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md md:w-20 w-full text-start">{t("State")}:</label>
          <select value={emerformData?.state} name='state' className='rounded-md m-1 p-1 md:flex-1 w-full' onChange={handleInputChange}>
            {
              states?.map((state, index)=>{
                return <option key={state} value={state}>{state}</option>
              })
            }
          </select>
          {/* <input
          className="bg-white text-black rounded-md m-1 p-1 flex-1"
          type="text"
          name="state"
          value={emerformData?.state}
          onChange={handleInputChange}
          /> */}

        </div>
        </div>
        <div className='flex justify-between'>
        <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={handlePrev}
            >
            {t("Back")}
          </button>
          <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold mt-4"
            >
            {t("Submit")}
          </button>
        
        </div>
      </form>
      <div className="w-full h-10">
        <ProgressBar progress={progressValue} />
      </div>
    </div>
            </>
  );
}

export default EmergencyContactForm;
