import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import Modal from './modal/Modal';
import { useTranslation } from 'react-i18next';
function EmergencyContactForm() {
  const { t } = useTranslation();
  var progressValue = 60;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { emerformData, setemerFormData, setIsVisible } = React.useContext(UserContext);
  const [data, setdata] = useState()
  const [showPopup_, setShowPopup_] = useState(true);
  const Yes=t("Yes")
  const No=t('No')
  const options = [Yes,No];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setemerFormData({ ...emerformData, [name]: value });
  };

  const fetchData = async () => {
    const username = sessionStorage.getItem('username');
    try {
      const response = await fetch(`${apiUrl}/artist/username_appointment_list?username=${username}`);
      const data = await response.json();

      if (data?.data?.length > 0) {

        //console.log("have medical history :",data.data[data.data.length-1])    
        setdata(data?.emergencycontectnumber)
        setShowPopup_(true);
      }
    } catch (error) {
      console.error('Error fetching previous medical history:', error);
    }
  }

  useEffect(() => {
    setIsVisible(true)
    fetchData()
  }, [])

  const handleUpdatedata = (e) => {
  const value = e.target.value
    if (value === 'No') {
      setemerFormData({
        "name": 'aniket',
        "phone": '1234567891',
        "city": 'lllll',
        "state": 'up'
      })
      navigate('/doctor-info')
    }
    if(value === "Yes" || "Sí"){
      setShowPopup_(false)
    }
  }
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

  const handlePrev = ()=>{
    navigate(-1)
  }

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
      {showPopup_ && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">{t("Do you want to update your medical history?")}</p>
          <div className="flex gap-2">
            <label className="text-xl font-bold text-black">{t("Select an option:")}</label>
            <select className="bg-black p-2 rounded-lg" onChange={handleUpdatedata}>
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% py-2 px-8 rounded-3xl font-bold text-black" onClick={() => setShowPopup_(false)}>
          {t("Close Popup")}
          </button>
        </Modal>
      )}
      <h1 className="text-3xl font-bold mb-4 text-yellow-500 uppercase ">Emergency Contact Information</h1>
      <form className="bg-gray-800 p-6 rounded-md flex flex-col shadow-md flex-1 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 text-black" onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 flex-1 items-center'>

      <div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("Name")}</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
            type="text"
            name="name"
            value={emerformData?.name}
            onChange={handleInputChange}
            required
          />
        </div>
<div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("Phone")}:</label>
          <input
           className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
            type="text"
            name="phone"
            value={emerformData?.phone}
            onChange={handleInputChange}
            required
          />
        </div>
<div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("City")}:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
            type="text"
            name="city"
            value={emerformData?.city}
            onChange={handleInputChange}
            required
          />
        </div>
<div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("State")}:</label>
          <input
          className="bg-gray-700 text-white rounded-md m-1 p-1 flex-1"
            type="text"
            name="state"
            value={emerformData?.state}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>
        <div className='flex justify-between'>
        <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={handlePrev}
          >
            {t("Prev")}
          </button>
        <button className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100%  py-2 px-8 rounded-3xl font-bold mt-4" type="submit">
          {t("Submit")}
        </button>
        </div>
      </form>
      <div className="w-full h-10">
        <ProgressBar progress={progressValue} />
      </div>
    </div>
  );
}

export default EmergencyContactForm;
