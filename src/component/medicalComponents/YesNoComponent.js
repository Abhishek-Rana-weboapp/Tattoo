import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserContext from '../../context/UserContext'
import Navigation from '../navigation/Navigation'

const YesNoComponent = ({question, next, type, prev, subState, setSubState}) => {

    const [selected, setSelected] = useState("")
    const {alert, setAlert, setAlertMessage, setFormData, formData} = useContext(UserContext)
    const {t}= useTranslation()

    useEffect(()=>{
       if(formData[question.id]){
        setSelected(formData[question.id].ans)
       }else{
        setSelected("")
       }
    },[question, formData])

    const handleCheckboxes = (e)=>{
       const value = e.target.value
       if(value === selected){
        setSelected("")
        return
       }
       setSelected(value)
    }

    const handleNext = ()=>{
        if(selected ===  ""){
            setAlert(!alert)
            setAlertMessage(t('Please select an option'))
            return 
        }else{
            setFormData(prev=>({...prev , [question.id] : {ans:selected}}))
            next()       // here provide the handleNext function recieved in props
        }
    }


    const handleSubState = (e)=>{
       if(subState[question.id]?.ans === e.target.value){
        setSubState(prev=>({...prev, [question.id] : {ans:""}}))
        return
       }
       setSubState(prev=>({...prev, [question.id] : {ans:e.target.value}}))
    }


  return (
    <div className="flex flex-col items-center gap-4 w-full justify-between flex-1 p-2">
      <div className='flex flex-col items-center gap-2'>

         {type === "sub" ? <label className={`uppercase md:text-xl text-sm text-white md:font-bold flex gap-2`}>
         <span className="underline">{`Q${question.id.toString().charAt(0)}.${question.id.toString().substring(1)}`}:</span>
         <span>{t(question.q)}</span>
         </label>
         :
         <label className={`uppercase text-white md:text-2xl text-base md:font-bold flex gap-2`}>
         <span className="underline">Q{question.id}:</span>
         <span>{t(question.q)}</span>
         </label>
         
        }

         

         {type !== "sub" ? <div className="flex flex-col md:text-2xl text-base items-center gap-4">
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
              <input
                type="checkbox"
                className="w-6 h-6"
                value="yes"
                checked={selected === "yes"}
                onChange={handleCheckboxes}
                />
              {t("Yes")}
              </label>
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
              <input
                type="checkbox"
                className=" w-6 h-6 "
                value="no"
                checked={selected === "no"}
                onChange={handleCheckboxes}
                />
                {t("No")}
                </label>
          </div> :

<div className="flex flex-col md:text-xl text-sm items-center gap-4">
  
  <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
  <input
    type="checkbox"
    className="w-6 h-6"
    value="yes"
    checked={subState[question.id]?.ans === "yes"}
    onChange={handleSubState}
    />
    {t("Yes")}

  </label>
  
  <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
  <input
    type="checkbox"
    className=" w-6 h-6"
    value="no"
    checked={subState[question.id]?.ans === "no"}
    onChange={handleSubState}
    />
    {t("No")}
    </label>
</div>
          }

          </div>

         {type !== "sub" && <div className="w-full flex justify-between">
       <button
         className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
         onClick={prev}
       >
         {t("Back")}
       </button>
       <button
         className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
         onClick={handleNext}
       >
         {t("Next")}
       </button>
     </div>}
    </div>
  )
}

export default YesNoComponent
