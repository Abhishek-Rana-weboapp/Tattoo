import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import Modal from './modal/Modal';
import { useTranslation } from 'react-i18next';
import AlertModal from './modal/AlertModal';
function EmergencyContactForm() {
  const { t } = useTranslation();
  var progressValue = 60;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { emerformData, setemerFormData, setIsVisible,alert , setAlert, setAlertMessage } = React.useContext(UserContext);
  const [data, setdata] = useState()
  const [showPopup_, setShowPopup_] = useState(true);
  const Yes=t("Yes")
  const No=t('No')
  const options = ["Yes","No"];
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
        setdata(JSON.parse(data?.emergencycontectnumber))
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
      setemerFormData(data)
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

  return (
    <>
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
      {showPopup_ && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">{t("Do you want to update your emergency contact")}?</p>
          <div className="flex gap-2">
            <label className="text-xl font-bold text-black">{t("Select an option:")}</label>
            <select className="bg-black p-2 rounded-lg" onChange={handleUpdatedata}>
              <option value="">{t("Select")}...</option>
              <option value={Yes}>{t("Yes")}</option>
              <option value={No}>{t("No")}</option>
            </select>
          </div>
          <button className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% py-2 px-8 rounded-3xl font-bold text-black" onClick={() => setShowPopup_(false)}>
          {t("Close Popup")}
          </button>
        </Modal>
      )}
      <h1 className="text-3xl font-bold mb-4 text-white uppercase ">Emergency Contact Information</h1>
      <form className="bg-black p-6 rounded-md flex flex-col shadow-md flex-1 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 text-black" onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 flex-1 items-center'>

      <div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("Name")}:</label>
          <input
          className="bg-white text-black rounded-md m-1 p-2 flex-1 text-lg"
          type="text"
          name="name"
          value={emerformData?.name}
            onChange={handleInputChange}
            />
        </div>
<div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("Phone")}:</label>
          <input
           className="bg-white text-black rounded-md m-1 p-2 flex-1 text-lg"
           type="text"
           name="phone"
           value={emerformData?.phone}
           onChange={handleInputChange}
           />
        </div>
<div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("City")}:</label>
          <input
          className="bg-white text-black rounded-md m-1 p-2 flex-1 text-lg"
          type="text"
          name="city"
          value={emerformData?.city}
            onChange={handleInputChange}
          />
        </div>
<div className='w-3/6 md:flex md:flex-row flex flex-col justify-between items-center gap-1'>
          <label className="text-white font-semibold text-md w-20">{t("State")}:</label>
          <select
            className="bg-white text-black rounded-md m-1 p-2 flex-1 text-lg"
            style={{ width: "225px" }}
            name="state"
            value={emerformData?.state}
            onChange={handleInputChange}
          >
                         <option value="Florida">Florida</option>
<option value="Alabama">Alabama</option>
<option value="Alaska">Alaska</option>
<option value="Arizona">Arizona</option>
<option value="Arkansas">Arkansas</option>
<option value="California">California</option>
<option value="Colorado">Colorado</option>
<option value="Connecticut">Connecticut</option>
<option value="Delaware">Delaware</option>
<option value="Florida">Florida</option>
<option value="Georgia">Georgia</option>
<option value="Hawaii">Hawaii</option>
<option value="Idaho">Idaho</option>
<option value="Illinois">Illinois</option>
<option value="Indiana">Indiana</option>
<option value="Iowa">Iowa</option>
<option value="Kansas">Kansas</option>
<option value="Kentucky">Kentucky</option>
<option value="Louisiana">Louisiana</option>
<option value="Maine">Maine</option>
<option value="Maryland">Maryland</option>
<option value="Massachusetts">Massachusetts</option>
<option value="Michigan">Michigan</option>
<option value="Minnesota">Minnesota</option>
<option value="Mississippi">Mississippi</option>
<option value="Missouri">Missouri</option>
<option value="Montana">Montana</option>
<option value="Nebraska">Nebraska</option>
<option value="Nevada">Nevada</option>
<option value="New Hampshire">New Hampshire</option>
<option value="New Jersey">New Jersey</option>
<option value="New Mexico">New Mexico</option>
<option value="New York">New York</option>
<option value="North Carolina">North Carolina</option>
<option value="North Dakota">North Dakota</option>
<option value="Ohio">Ohio</option>
<option value="Oklahoma">Oklahoma</option>
<option value="Oregon">Oregon</option>
<option value="Pennsylvania">Pennsylvania</option>
<option value="Rhode Island">Rhode Island</option>
<option value="South Carolina">South Carolina</option>
<option value="South Dakota">South Dakota</option>
<option value="Tennessee">Tennessee</option>
<option value="Texas">Texas</option>
<option value="Utah">Utah</option>
<option value="Vermont">Vermont</option>
<option value="Virginia">Virginia</option>
<option value="Washington">Washington</option>
<option value="West Virginia">West Virginia</option>
<option value="Wisconsin">Wisconsin</option>
<option value="Wyoming">Wyoming</option>
 
          </select>
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
            </>
  );
}

export default EmergencyContactForm;
