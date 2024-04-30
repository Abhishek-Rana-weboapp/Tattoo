import React, { useContext, useEffect, useState } from "react";
import { medicalQuestions } from "../../data/MedicalQuestions";
import YesNoComponent from "./YesNoComponent";
import UserContext from "../../context/UserContext";
import YesNoOption from "./YesNoOption";
import { useNavigate } from "react-router-dom";
import YesNoSub from "./YesNoSub";
import ExplanationComponent from "./ExplanationComponent";
import YesNoExplain from "./YesNoExplain";
import axios from "axios";
import { apiUrl } from "../../url";
import Modal from "../modal/Modal";
import { useTranslation } from "react-i18next";
import { AUTHHEADERS } from "../../commonFunctions/Headers";

const NewMedicalHistory = () => {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const { user , setFormData,formData, setAlert, alert, setAlertMessage, finalUser} = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const username = sessionStorage.getItem("username")
  const [showPopup_, setShowPopup_] = useState(false);
  const {t} = useTranslation()
  const service = sessionStorage.getItem("typeofservice")
  
  useEffect(() => {
    if(service !== ""){
      setQuestions(medicalQuestions[service] || [])
    }
      const fetchMedicalHistory = async()=>{
        try{
          const response = await axios.get(`${apiUrl}/artist/user_history?username=${username}`, {headers : AUTHHEADERS()})
          const service = user?.selectedTattooType
          const filterResponse = response.data.medical_history[service] 
          let finalResult = {};
        try {
            finalResult = filterResponse ? JSON.parse(filterResponse) : {};
        } catch (error) { 
            console.error("Error parsing JSON:", error);
            finalResult = {};
        }
          if(Object.keys(finalResult).length  === 0){
            setFormData({})
            return
          }
          setShowPopup_(!showPopup_)
          setFormData(finalResult)
          return 
        }catch(err){
          console.log(err)
        setAlert(!alert)
        setAlertMessage(t("Something went wrong"))
        return
        }
    }

    fetchMedicalHistory()
  }, [user]);


  const prev = () => {
    if (current > 1) {
      setCurrent(current - 1);
    } else {
      navigate(-1);
    }
  };


  const next = () => {
    if (current < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/emergency-contact");
    }
  };

  const handleYes = ()=>{
    setShowPopup_(!showPopup_)
  }

  const handleNo = ()=>{
    setShowPopup_(!showPopup_)
    navigate("/emergency-contact");
  }




  return (
    <div
      className="w-full sm:w-3/4  rounded-md p-4 md:w-1/2  flex flex-col gap-3 overflow-hidden "
      style={{ height: "100dvh" }}
    >
      <h1 className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">
        {t("Medical history")}
      </h1>
      <div className="w-full backdrop-blur bg-opacity-50 h-full rounded-md flex flex-col overflow-hidden">
        {questions.length > 0 && questions[current - 1]?.type === "YN" && (
          <YesNoComponent
            question={questions[current - 1]}
            next={next}
            prev={prev}
          />
        )}

        {questions.length > 0 && questions[current - 1]?.type === "YNO" && (
          <YesNoOption
            question={questions[current - 1]}
            next={next}
            prev={prev}
          />
        )}

        {questions.length > 0 && questions[current - 1]?.type === "YNS" && (
          <YesNoSub question={questions[current - 1]} next={next} prev={prev} />
        )}

        {questions.length > 0 && questions[current - 1]?.type === "NUM"&& (
          <ExplanationComponent
            question={questions[current - 1]}
            next={next}
            prev={prev}
            inputType={"number"}
            />
        )}

          {questions.length > 0 && questions[current - 1]?.type === "E"&& (
          <ExplanationComponent
            question={questions[current - 1]}
            next={next}
            prev={prev}
            />
        )}

        {questions.length > 0 && questions[current - 1]?.type === "YNE" && (
          <YesNoExplain
            question={questions[current - 1]}
            type="number"
            next={next}
            prev={prev}
          />
        )}
      </div>


      {showPopup_ && (
        <Modal>
          <h3 className="font-bold">{t("Do you want to update your medical history?")}</h3>

          <div className="flex gap-1 items-center">
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={handleYes}
          >
            {t("Yes")}
          </button>

          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={handleNo}
          >
            {t("No")}
          </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewMedicalHistory;
