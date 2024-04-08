import React, { useContext, useEffect,} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import UserContext from '../context/UserContext'
import Navigation from './navigation/Navigation'

const TattooCount = () => {
  const navigate = useNavigate()
  const {alert ,user,setAlert, setAlertMessage, count, setCount} = useContext(UserContext)
  const {t} = useTranslation()


 const handleChange = (e)=>{
    const value  = parseInt(e.target.value)
    setCount(value)
 }

 const handleNext = ()=>{
   if(count){
    if(user.selectedTattooType === "tattoo"){
      navigate("/tattoo")
      return
    }else if(user.selectedTattooType === "piercing"){
      navigate("/piercing")
      return
    }
   }else{
    if(user.selectedTattooType === "tattoo"){
      setAlertMessage(t("Please select the number of tattoos you are getting"))
    }
    else if(user.selectedTattooType === "piercing"){
      setAlertMessage(t("Please select the number of piercings you are getting"))
    }
    setAlert(!alert)
    return
   }
 }


 const handlePrev = ()=>{
     navigate(-1)
 }

 const options = [
    1,2,3,4,5,6,7,8,9,10
 ]

  return (
    <div className='flex flex-col justify-between items-center h-full md:w-4/6  w-full'>
      <div className='flex flex-col items-center gap-3 '>
      <label className='font-bold text-md md:text-5xl text-white uppercase'>{user.selectedTattooType === "tattoo" ? t("Tattoo Count") : user.selectedTattooType === "piercing" ? t("Piercing Count") : ""}</label>
      <label className='font-bold text-xl  md:text-4xl text-white  uppercase text-center '>{user.selectedTattooType === "tattoo" ? t("How many tattoos are you getting today? 1-10") : user.selectedTattooType === "piercing" ? t("How many piercings are you getting today? 1-10") :user.selectedTattooType === "removal" ? t("How many tattoos do you have? 1-10") : ""}</label>
      <select value={count} onChange={handleChange} className='text-2xl font-bold rounded-lg p-2'>
        {
          options.map((option)=>{
            return <option value={option} key={option}>{option}</option>
          })
        }
      </select>
      </div>
      <Navigation next={handleNext} prev={handlePrev} />
    </div>
  ) 
}

export default TattooCount
