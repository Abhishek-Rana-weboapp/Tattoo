import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { apiUrl } from '../url'
import { useNavigate } from 'react-router-dom'
import Modal from './modal/Modal'

const GaurdianInfo = () => {

    const {setIsVisible, setAlertMessage, alert, setAlert} = useContext(UserContext)
    const {t}= useTranslation()
    const navigate = useNavigate()
    const storedgaurdianInfo = sessionStorage.getItem("gaurdianInfo")
    const [updateModal, setUpdateModal] = useState(false)
    const yes=t("Yes")
  const No=t('No')
  const options = [yes,No];
    const [gaurdianInfo, setGaurdianInfo] = useState({
        firstName : "",
        lastName : "",
        dateOfBirth : "",
        email : "",
        phoneNumber : "",
    })
    const userId = sessionStorage.getItem("userId")
    useEffect(()=>{
        setIsVisible(true)
        if(storedgaurdianInfo){
            setGaurdianInfo(prev=>(JSON.parse(storedgaurdianInfo)))
            setUpdateModal(true)
        }
    },[])

    console.log(gaurdianInfo)

    const handleInput = (e)=>{
        const field = e.target.name
        const value = e.target.value
        setGaurdianInfo(prev=>({...prev, [field] : value}))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

    
        const isEmptyField = Object.entries(gaurdianInfo).filter(([key]) => key !== 'lastName').some(([_, value]) => value === '');

    if (isEmptyField) {
        setAlertMessage('Please fill in all fields');
        setAlert(!alert)
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gaurdianInfo.email)) {
        setAlertMessage(t('Please enter a valid email address'));
        setAlert(!alert)
        return;
    }

    await axios.post(`${apiUrl}/updateGuardianInitials/?userId=${userId}`, {
        "gaurdian_info": JSON.stringify(gaurdianInfo)
      })
      .then(res=>{
        sessionStorage.setItem("gaurdianInfo", JSON.stringify(gaurdianInfo))
        sessionStorage.setItem("gaurdianInitials" ,`${gaurdianInfo?.firstName.slice(0, 1).toUpperCase()}${gaurdianInfo?.lastName.slice(0, 1).toUpperCase()}`)
        navigate("/dashboard")
    })
      .catch(err=>{
        setAlertMessage(t("Something went wrong"))
        setAlert(!alert)
      })
    }

    const handleUpdatedata = (e)=>{
        const value = e.target.value
        if(value === "Yes"){
           setUpdateModal(false)
           return
        }
        if(value === "No"){
          sessionStorage.setItem("gaurdianInfo", JSON.stringify(gaurdianInfo))
          sessionStorage.setItem("gaurdianInitials" ,`${gaurdianInfo?.firstName.slice(0, 1).toUpperCase()}${gaurdianInfo?.lastName.slice(0, 1).toUpperCase()}`)
          navigate("/dashboard")
          return
        }
    }
  return (
    <>
    <div className='flex flex-col items-center gap-4 w-full'>
     <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center ">Gaurdian's Info</label>
      <form className='flex flex-col gap-4 md:w-1/3 w-full p-2' onSubmit={handleSubmit}>
        <input name='firstName' value={gaurdianInfo.firstName} className='p-2 rounded-lg w-full' type='text' placeholder='Firstname' onChange={handleInput}></input>
        <input name='lastName' value={gaurdianInfo.lastName} className='p-2 rounded-lg w-full' type='text' placeholder='Lastname' onChange={handleInput}></input>
        <input name='dateOfBirth' value={gaurdianInfo.dateOfBirth} className='p-2 rounded-lg w-full' type='date' placeholder='D.O.B' onChange={handleInput}></input>
        <input name='email' value={gaurdianInfo.email} className='p-2 rounded-lg w-full' type='email' placeholder='Email' onChange={handleInput}></input>
        <input name='phoneNumber' value={gaurdianInfo.phoneNumber} className='p-2 rounded-lg w-full' type='text' placeholder='Phone Number' onChange={handleInput}></input>
        <div className='flex justify-center'>
            <button className='yellowButton py-2 px-8 rounded-3xl font-bold'>Submit</button>
        </div>
      </form>
    </div>
    {updateModal && (
        <Modal>
          <h3 className="font-bold">{t("Do you want to update your gaurdian information?")}</h3>

          {/* // Dropdown menu */}
          <div className="flex gap-1 items-center">
            <label className="text-xl font-bold">{t("Select an option:")}</label>
            <select
              className="rounded p-2 border-1 bg-black text-white"
              onChange={handleUpdatedata}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                {console.log(option)}
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={() => {
              setUpdateModal(false);
            }}
          >
            {t("Close Popup")}
          </button>
        </Modal>
      )}
    </>
  )
}

export default GaurdianInfo
