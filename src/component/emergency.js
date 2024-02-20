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
function EmergencyContactForm() {
  const { t } = useTranslation();
  var progressValue = 60;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { emerformData, setemerFormData, setIsVisible,alert , setAlert, setAlertMessage } = React.useContext(UserContext);
  const [data, setdata] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPopup_, setShowPopup_] = useState(false);
  const Yes=t("Yes")
  const No=t('No')
  const options = ["Yes","No"];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setemerFormData({ ...emerformData, [name]: value === "Select City"?"":value}
    );
  };

  const fetchData = async () => {
    const username = sessionStorage.getItem('username');
    setLoading(true)
       await axios.get(`${apiUrl}/artist/username_appointment_list?username=${username}`)
       .then(res=>{
        if(res?.data?.data?.length > 0){
           if(res.data.emergencycontectnumber){
             setdata(JSON.parse(res.data.emergencycontectnumber))
             setShowPopup_(true);
            }
          }
          setLoading(false)
        })
    .catch (error=> {
      setLoading(false)
      setAlert(!alert)
      setAlertMessage(t("Something went wrong"))
      return
    })
  }

  useEffect(() => {
    setIsVisible(true)
    fetchData()
  }, [])

  const handleYes = ()=>{
    setemerFormData(data)
      setShowPopup_(false)
  }

  const handleNo = ()=>{
    setemerFormData(data)
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

  const handlePrev = ()=>{
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
            {/* <label className="text-xl font-bold text-black">{t("Select an option:")}</label>
            <select className="bg-black p-2 rounded-lg" onChange={handleUpdatedata}>
              <option value="">{t("Select")}...</option>
              <option value={Yes}>{t("Yes")}</option>
              <option value={No}>{t("No")}</option>
            </select> */}
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

           type="text"
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
            {t("Prev")}
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
