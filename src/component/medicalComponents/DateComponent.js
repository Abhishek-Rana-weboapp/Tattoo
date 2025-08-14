import { useTranslation } from "react-i18next";
import DatePicker from "../buttons/DatePicker";

const DateComponent = ({
    question, subState, setSubState
}) => {
    const {t} = useTranslation()


    const handleSubState = (value)=>{
        setSubState(prev=>({...prev, [question.id] : {ans:value}}))
        return
    }


  return (
    <div className="flex flex-col items-center gap-4 w-full flex-1 p-2">
     <label className={`uppercase text-white md:text-xl text-sm md:font-bold flex gap-2`}>
    <span className="underline">{`Q${question.id.toString().charAt(0)}.${question.id.toString().substring(1)}`}:</span>
    <span>{t(question.q)}</span>
    </label>

   
     <div className="flex flex-col items-center md:w-2/3 w-full gap-4 flex-1">
     <DatePicker  date={subState[question.id]?.ans} setDate={handleSubState}/>
   </div>
</div>
  )
}


export default DateComponent
