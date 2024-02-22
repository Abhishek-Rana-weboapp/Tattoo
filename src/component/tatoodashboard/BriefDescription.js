import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../../context/UserContext'
import Navigation from '../navigation/Navigation'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BriefDescription = () => {
  const navigate = useNavigate()
  const {setIsVisible, alert , setUser ,setAlert, setAlertMessage,description, setDescription} = useContext(UserContext)
  const {t} = useTranslation()
  const inputRef = useRef()

  useEffect(()=>{
    setIsVisible(true)
    inputRef.current.focus()
 },[])


 const handleChange = (e)=>{
     setDescription(e.target.value)
 }

 const handleNext = ()=>{
   if(description){
    navigate("/medical-form")
   }else{
    setAlertMessage(t("Please provide the description of your tattoo"))
    setAlert(!alert)
    return
   }
 }


 const handlePrev = ()=>{
     navigate(-1)
 }

  return (
    <div className='flex flex-col justify-between items-center h-full md:w-4/6  w-full'>
      <div className='flex flex-col items-center gap-3 '>
      <label className='font-bold text-md md:text-5xl text-white uppercase'>{t("Tattoo Description")}</label>
      <label className='font-bold text-xl  md:text-4xl text-white  uppercase text-center '>{t("Enter a Brief Description of your tattoo")}</label>
      <textarea ref={inputRef} value={description} onChange={handleChange} className='w-2/3 p-2 rounded-lg h-40'></textarea>
      </div>
      <Navigation next={handleNext} prev={handlePrev} />


    </div>
  )
}

export default BriefDescription
