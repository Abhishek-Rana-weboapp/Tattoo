import {useEffect,  useState } from "react";
import { useTranslation } from "react-i18next";
import YesNoComponent from "./YesNoComponent";
import ExplanationComponent from "./ExplanationComponent";
import { useAppointmentContext } from "../../context/AppointmentContext";
import DateComponent from "./DateComponent";
import toast from "react-hot-toast";

const  YesNoSub = ({ question, next, type, prev }) => {
  const { medicalhistory, setMedicalHistory } = useAppointmentContext();
  const [selected, setSelected] = useState("");
  const [subState, setSubState] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if(Object.keys(medicalhistory).includes(question.id.toString())){
      setSelected(medicalhistory[question.id].ans)
        if(medicalhistory[question.id].ans === "yes"){
          setSubState(medicalhistory[question.id].sub)
          return
        }
      return
    }else{
      setSelected("")
      const filterState = question.sq.map((element) => {
        switch (element.type) {
          case "YNE":
            return {
              [element.id]: { ans: "", explanation: "" }
            }
            case "YNO":
              return{
                [element.id]: { ans: "", opt: "" }
              }
              case "YN":
                return { [element.id]: { ans: "" } }
                default:
                  return {[element.id]: { ans: "" } }
                }
              });  
              setSubState(filterState.reduce((acc, obj) => {
                const key = Object.keys(obj)[0]; // Extract the key
                acc[key] = obj[key]; // Add key-value pair to the accumulator object
                return acc;
              }, {}))
            }
            }, [question,  medicalhistory]);
            
            
            function hasEmptyValue(obj) {
              for (let key in obj) {
                if (obj[key].ans === "") {
                  return true; 
                }
              }
    return false; 
  }

  const handleCheckboxes = (e) => {
    const value = e.target.value;
    if (value === selected) {
      setSelected("");
      return;
    }
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === "") {
      toast.error(t("Please select an option"));
      return;
    } else {
      if (selected === "yes") {
        if (hasEmptyValue(subState)) {
          toast.error(t("Please enter all details"));
          return;
        }
        setMedicalHistory((prev) => ({
          ...prev,
          [question.id]: { ans: selected, sub: subState },
        }));
        const latestMedicalState = {...medicalhistory , [question.id]: { ans: selected, sub: subState }}
        next(latestMedicalState)
        return;
      }
      setMedicalHistory((prev) => ({
        ...prev,
        [question.id]: { ans: selected },
      }));

      next(); // here provide the handleNext function recieved in props
      return
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full h-full px-2 py-4 ">
      <div className="flex flex-col items-center flex-1 gap-2 overflow-y-auto scrollbar-thin scrollbar-track-slate-[#000] scrollbar-thumb-slate-400 scrollbar-rounded">

      <label className="uppercase text-white md:text-2xl text-base md:font-bold flex gap-2">
        <span className="underline">{`Q${question.id}`}:</span>
        <span>{t(question.q)}</span>
      </label>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-col items-center gap-4">
           
            <label className="md:text-2xl text-base uppercase text-white flex gap-2 items-center hover:cursor-pointer">
            <input
              type="checkbox"
              className=" w-6 h-6"
              value="yes"
              checked={selected === "yes"}
              onChange={handleCheckboxes}
              />
              {t("Yes")}
            </label>
           
            <label className="md:text-2xl text-base uppercase text-white flex gap-2 items-center hover:cursor-pointer">
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

        {selected === "yes" && (
          <>
            <div className="flex gap-10 flex-col overflow-y-auto">
              {question.sq.map((subQuestion, index) => {
                return (
                  <>
                    {subQuestion.type === "YN" && (
                      <YesNoComponent
                      key={subQuestion.id}
                      question={subQuestion}
                      type={"sub"}
                      subState={subState}
                      setSubState={setSubState}
                      />
                      )}

                    {subQuestion.type === "NUM" && (
                      <ExplanationComponent
                      key={subQuestion.id}
                      question={subQuestion}
                      type={"sub"}
                      inputType={"number"}
                      subState={subState}
                      setSubState={setSubState}
                      />
                      )}

                    {subQuestion.type === "E" && (
                      <ExplanationComponent
                      key={subQuestion.id}
                      question={subQuestion}
                      type={"sub"}
                      subState={subState}
                      setSubState={setSubState}
                      />
                      )}


                      {subQuestion.type === "DATE" && (
                      <DateComponent
                      key={subQuestion.id}
                      question={subQuestion}
                      subState={subState}
                      setSubState={setSubState}
                      />
                      )}
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
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
  );
};

export default YesNoSub;
