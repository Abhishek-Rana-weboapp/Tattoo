import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserContext from '../../context/UserContext'

const ExplanationComponent = ({question, type,inputType, next, prev, subState, setSubState}) => {
    const [input, setInput] = useState("")
    const {t} = useTranslation()
    const {setAlert, alert, setAlertMessage, setFormData, formData} = useContext(UserContext)


    useEffect(()=>{
      if(formData[question?.id]){
       setInput(formData[question?.id].ans)
      }
   },[question])

    const handleInput = (e)=>{
        const value = e.target.value;
        setInput(value);
    }

    const handleNumberInput = (e)=>{
      setInput(e.target.value);
    }

    const handleNext = ()=>{
       if(input === ""){
         setAlertMessage(t("Please Enter an Answer"))
         setAlert(!alert)
         return
       }else{
         setFormData(prev=>({...prev, [question.id] :{ans : input}}))
         next()
         return
       }
    }

    const handlePrev = ()=>{
        prev();
        return;
    }


    const handleSubState = (e)=>{
        setSubState(prev=>({...prev, [question.id] : {ans:e.target.value}}))
        return
    }


  return (
    <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">
    {type === "sub" ? <label className={`uppercase text-white md:text-xl text-sm md:font-bold flex gap-2`}>
    <span className="underline">{`Q${question.id.toString().charAt(0)}.${question.id.toString().substring(1)}`}:</span>
    <span>{t(question.q)}</span>
    </label>
    :
    <label className={`uppercase text-white md:text-2xl text-base md:font-bold flex gap-2`}>
    <span className="underline">Q{question?.id}:</span>
    <span>{t(question?.q)}</span>
    </label>
    }

    {type !== "sub"? <div className="flex flex-col w-full items-center gap-4 flex-1">
         {inputType === "number" ? <input
           type="number"
           inputMode='numeric'
           className="w-96 md:w-2/3 p-2 rounded-lg"
           value={input}

           onChange={handleNumberInput}
         />:
         <textarea
           type="text"
           className="w-full md:w-2/3 h-32 rounded-lg"
           value={input}
           onChange={handleInput}
         />
        }
     </div> :
     <div className="flex flex-col items-center md:w-2/3 w-full gap-4 flex-1">
     {inputType === "number" ? <input
       type="number"
       inputMode='numeric'
       className="w-full md:w-2/3 p-2 rounded-lg"
       value={subState[question.id]?.ans}
       onChange={handleSubState}
     />:
     <textarea
       type="text"
       className="w-full md:w-2/3 h-32 p-2 rounded-lg"
       value={subState[question.id]?.ans}
       onChange={handleSubState}
     />
    }
   </div>
     }

    {type !== "sub" && <div className="w-full flex justify-between">
       <button
         className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
         onClick={handlePrev}
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

export default ExplanationComponent
