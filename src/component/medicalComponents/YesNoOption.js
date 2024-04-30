import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserContext from '../../context/UserContext'
import Navigation from '../navigation/Navigation'

const YesNoOption = ({question, next, prev}) => {
    const [selected, setSelected] = useState("")
    const [optSelected, setOptSelected] = useState("")
    const {alert, setAlert, setAlertMessage, formData, setFormData} = useContext(UserContext)
    const {t}= useTranslation()

    useEffect(()=>{
        if(formData[question.id]){
          setSelected(formData[question.id].ans)
          if(formData[question.id].ans === "yes"){
            setOptSelected(formData[question.id].opt)
          }
        }
    },[question])

    const handleCheckboxes = (e)=>{
       const value = e.target.value
       if(value === selected){
        setSelected("")
        return
       }
       setSelected(value)
    }


    const handleOpt = (e)=>{
       const value = e.target.value
       if(value === optSelected){
        setOptSelected("")
        return
       }
       setOptSelected(value)
    }

    const handleNext = ()=>{
        if(selected ===  ""){
            setAlert(!alert)
            setAlertMessage(t('Please select an option'))
            return 
        }else{
            if(selected === "yes"){
                if(optSelected === ""){
                    setAlert(!alert)
                    setAlertMessage(t('Please select an option'))
                    return  
                }
            }
            setFormData({...formData, [question.id] : {ans : selected, opt:optSelected}})  
            next()      // here provide the handleNext function recieved in props
        }
    }

  return (
    <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">
         <label className="uppercase text-white md:text-2xl text-md md:font-bold flex gap-2">
         <span className="underline">Q{question.id}:</span>
         <span>{t(question.q)}</span>
         </label>

         <div className="flex flex-col items-center gap-4 flex-1 md:text-2xl text-base">
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                value="yes"
                checked={selected === "yes"}
                onChange={handleCheckboxes}
              />
              <label className="md:text-2xl text-lg uppercase text-white">{t("Yes")}</label>
            </div>
            <div className="w-20 justify-start flex gap-2 items-center">
              <input
                type="checkbox"
                className=" w-6 h-6"
                value="no"
                checked={selected === "no"}
                onChange={handleCheckboxes}
              />
              <label className="md:text-2xl text-lg uppercase text-white">{t("No")}</label>
            </div>

          {selected === "yes" && <><label className="text-white uppercase md:text-2xl text-base">{t("PLEASE SELECT WHICH ONE")}</label>
          <div className="flex gap-10">
            {question?.subOpt?.map((option, index)=>{
              return <>
            <div className="flex gap-2 items-center md:text-2xl text-base">
              <input
                type="checkbox"
                className=" w-6 h-6"
                value={option}
                checked={optSelected === option}
                onChange={handleOpt}
                />
              <label className="md:text-2xl text-base uppercase text-white">{t(option)}</label>
            </div>
                </>
                
              })
            }
          </div>
          </>}
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

export default YesNoOption
