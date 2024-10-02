import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserContext from '../../context/UserContext'
import Navigation from '../navigation/Navigation'

const YesNoExplain = ({question, next, prev,}) => {
    const [selected, setSelected] = useState("")
    const {alert, setAlert, setAlertMessage, formData, setFormData} = useContext(UserContext)
    const [explanation, setExplanation] = useState("")
    const {t}= useTranslation()
    const inputRef = useRef()   

    useEffect(()=>{
      if(formData[question.id]){
        setSelected(formData[question.id].ans)
        setExplanation(formData[question.id].explanation)
      }else{
        setSelected("")
        setExplanation("")
      }
    },[question])

    const handleCheckboxes = (e)=>{
       const value = e.target.value
       if(value === selected){
        setSelected("")
        return
       }
       setSelected(value)
       if(e.target.value === "yes"){
        inputRef?.current?.focus()
       }
    }

    const handleNext = ()=>{
        if(selected ===  ""){
            setAlert(!alert)
            setAlertMessage(t('Please select an option'))
            return 
        }else{
          if(selected === "yes"){
            if(explanation === ""){
              setAlert(!alert)
              setAlertMessage(t('Please enter an explanation'))
              return 
            }
          }
            setFormData(prev=>({...prev, [question.id] : {ans : selected, explanation:explanation}}))
            next()
        }
    }

  

  return (
    <div className="flex flex-col items-center justify-between gap-4 w-full flex-1 p-2">
      <div className='flex flex-col items-center gap-2'>
         <label className="uppercase text-white md:text-2xl text-base md:font-bold flex gap-2">
         <span className="underline">Q{question.id}:</span>
         <span>{t(question.q)}</span>
         </label>

         <div className="flex flex-col items-center md:text-2xl text-base gap-4 flex-1">
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-6 h-6"
                value="yes"
                checked={selected === "yes"}
                onChange={handleCheckboxes}
                />
                {t("Yes")}
              </label>
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                value="no"
                checked={selected === "no"}
                onChange={handleCheckboxes}
                />
                {t("No")}
              </label>
          </div>


         {selected === "yes" && <div className="flex-col flex gap-2 md:text-2xl text-base items-center w-full">
            <label className="uppercase text-white">
            {t("PLEASE EXPLAIN")}
            </label>
            <textarea
            ref={inputRef}
              type="text"
              className="w-full md:w-2/3 p-2 rounded-lg focus:outline-yellow-500"
              value={explanation}
              onChange={(e)=>setExplanation(e.target.value)}
              />
          </div>}

            </div>

            <div className="w-full flex justify-between">
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
     </div>
    </div>
  )
}

export default YesNoExplain
