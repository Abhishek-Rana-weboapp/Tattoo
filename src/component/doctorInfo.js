import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';
import Title from '../assets/Title.png';
import Modal from './modal/Modal';
import { useTranslation } from 'react-i18next';
function DoctorContactForm() {
  const { t } = useTranslation();
  var progressValue = 70;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [showPopup_, setShowPopup_] = useState(true);
  const yes=t("YES")
  const No=t('No')
  const options = [yes,No];
  const { drformData, setdrFormData } = React.useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdrFormData({
      ...drformData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const fetchData = async () => {
    const username = sessionStorage.getItem('username');
    try {
      const response = await fetch(`${apiUrl}/artist/username_appointment_list?username=${username}`);
      const data = await response.json();

      if (data.data.length > 0) {
        setdata(data.emergencycontectnumber);
        setShowPopup_(true);
      }
    } catch (error) {
      console.error('Error fetching previous medical history:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatedata = (value) => {
    if (value === 'No') {
      setdrFormData({
        name: 'aniket',
        phone: '1234567891',
        city: 'lllll',
        state: 'up',
        useDoctorRecommendation: false,
      });
      navigate('/consent');
    }
    if (value === 'Yes') {
      setShowPopup_(!showPopup_);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!drformData.name || !drformData.phone || !drformData.city || !drformData.state) {
      alert('All fields are required. Please fill in all the fields before submitting.');
    } else {
      navigate('/consent');
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto bg-black p-8 text-white">
      {showPopup_ && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">
           {t("Do you want to update your Doctor's contact?")}
          </p>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label className="text-xl font-bold text-black">
              {t("Select an option:")}
            </label>
            <select
              className="bg-black p-2 rounded-lg"
              onChange={(e) => handleUpdatedata(e.target.value)}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={() => {
              setShowPopup_(false);
            }}
          >
            {t("Close Popup")}
          </button>
        </Modal>
      )}
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">
        {t("Doctor Contact Information")}
      </h1>
      <form
               className="bg-gray-800 p-6 rounded-md flex flex-col flex-1 gap-3 shadow-md w-full md:w-4/5 lg:w-2/3 xl:w-1/2"
               onSubmit={handleSubmit}
      >
        <div className='flex flex-col items-center gap-4 flex-1'>

        
<div className='w-2/5 flex justify-between items-center'>
  <label className="text-white font-semibold text-md">{t("Name")}</label>
 
          <input
            className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="name"
            value={drformData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className='w-2/5 flex justify-between items-center'>
          <label className="text-white font-semibold text-md">{t("Phone #")}:</label>
          <input
            className="bg-gray-700 text-white rounded-md m-1 p-1 "
            type="text"
            name="phone"
            value={drformData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className='w-2/5 flex justify-between items-center'>
          <label className="text-white font-semibold text-md">{t("City")}:</label>
          <input
            className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="city"
            value={drformData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className='w-2/5 flex justify-between items-center'>
          <label className="text-white font-semibold text-md">{t("State")}:</label>
          <input
            className="bg-gray-700 text-white rounded-md m-1 p-1"
            type="text"
            name="state"
            value={drformData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>         
           <label className="text-white font-semibold text-md">
            {t("Use Doctor Recommendation")}
            <input
              type="checkbox"
              name="useDoctorRecommendation"
              checked={drformData.useDoctorRecommendation}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {drformData.useDoctorRecommendation && (
          <div className='text-white font-semibold text-md'>
            <h2>{t("Doctor Information")}</h2>
            <p>
              {t("Carbon Health Urgent Care of Hialeah")}
              <br />
              {t("Phone: (305) 200-1225")}
              <br />
              {t("Address: 915 W 49th St. Hialeah, FL 33012")}
            </p>
          </div>
        )}
          </div>
        <div className="w-full flex justify-between">
          <button
            className="yellowButton py-2 px-8 rounded-3xl font-bold mt-4 text-black"
            onClick={handlePrev}
          >
            Prev
          </button>
         <button
          className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% py-2 px-8 rounded-3xl font-bold mt-4 text-black"
          type="submit"
        >
          Submit
        </button>
        </div>
      </form>
      <div className="w-full h-10">
        <ProgressBar progress={progressValue} />
      </div>
    </div>
  );
}

export default DoctorContactForm;
