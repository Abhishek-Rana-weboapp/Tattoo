import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../../context/UserContext'
import Navigation from '../navigation/Navigation'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BriefDescription = () => {
  const navigate = useNavigate()
  const {alert ,setAlert, setAlertMessage,description, setDescription, currentSelection, setCurrentSelection, count, setFinalUser,finalUser, user , setUser} = useContext(UserContext)
  const {t} = useTranslation()
  const inputRef = useRef()
  const [desc, setDesc] = useState("")
  
  useEffect(()=>{
    inputRef.current.focus()
    if(description[currentSelection]){
      setDesc(description[currentSelection])
    }
 },[])


 const handleChange = (e)=>{
     setDesc(e.target.value)
 }


 const handleNext = ()=>{
   if(desc){
    if(count > 1 && currentSelection < count ){
      setFinalUser(prev=>({...prev , [currentSelection ] : {level1 : user[1] , level2 : user[2],level3 : user[3],level4 : user[4]}}))
      // setUser(prev=>({...prev, 1 : null,2 : null,3 : null,4 : null}))
      setDescription(prev=>({...prev, [currentSelection] : desc}))
      setCurrentSelection(currentSelection+1)
      navigate("/tattoo")
      return
    }else{
      setFinalUser(prev=>({...prev , [currentSelection ] : {level1 : user[1] , level2 : user[2],level3 : user[3],level4 : user[4]}}))
      setDescription(prev=>({...prev, [currentSelection] : desc}))
      navigate("/medical-form")
      return
    }
   }else{
    setAlertMessage(t("Please provide the description of your tattoo"))
    setAlert(!alert)
    return
   }
 }


 const handlePrev = ()=>{
  if(currentSelection > 1){
    setCurrentSelection(currentSelection-1)
  }
     navigate(-1)
 }

  return (
    <div className='flex flex-col justify-between items-center h-full md:w-4/6  w-full'>
      <div className='flex flex-col items-center gap-3 '>
      <label className='font-bold text-md md:text-5xl text-white uppercase'>{t("Tattoo Description")}</label>
      <label className='font-bold text-xl  md:text-4xl text-white  uppercase text-center '>{t("Enter a Brief Description of your tattoo")}</label>
      <textarea ref={inputRef} value={desc} onChange={handleChange} className='w-2/3 p-2 rounded-lg h-40'></textarea>
      </div>
      <Navigation next={handleNext} prev={handlePrev} />
    </div>
  )
}

export default BriefDescription
