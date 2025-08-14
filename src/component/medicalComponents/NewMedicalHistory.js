import { useContext, useEffect, useState } from "react";
import { medicalQuestions } from "../../data/MedicalQuestions";
import YesNoComponent from "./YesNoComponent";
import UserContext from "../../context/UserContext";
import YesNoOption from "./YesNoOption";
import { useNavigate } from "react-router-dom";
import YesNoSub from "./YesNoSub";
import ExplanationComponent from "./ExplanationComponent";
import YesNoExplain from "./YesNoExplain";
import Modal from "../modal/Modal";
import { useTranslation } from "react-i18next";
import { useAppointmentContext } from "../../context/AppointmentContext";
import toast from "react-hot-toast";

const NewMedicalHistory = () => {
  const {
    appointmentData,
    setAppointmentData,
    medicalhistory,
    setMedicalHistory,
    prevFormsInfo,
  } = useAppointmentContext();
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [showPopup_, setShowPopup_] = useState(false);
  const { t } = useTranslation();

  console.log({appointmentData})

  useEffect(() => {
    if (appointmentData) {
      setQuestions(medicalQuestions[appointmentData.typeofservice] || []);
    }
    if (!appointmentData.medicalHistory) {
      if (
        Object.keys(prevFormsInfo?.medicalHistory).length > 0 &&
        prevFormsInfo?.medicalHistory[appointmentData.typeofservice]
      ) {
        setMedicalHistory(
          JSON.parse(
            prevFormsInfo.medicalHistory[appointmentData.typeofservice]
          )
        );
        setAppointmentData((prev) => ({
          ...prev,
          medicalHistory:prevFormsInfo.medicalHistory[appointmentData.typeofservice],
        }));
        setShowPopup_(true);
        return;
      } else {
        setMedicalHistory({});
        return;
      }
    }
    if(appointmentData.medicalHistory){  
      setMedicalHistory(JSON.parse(appointmentData.medicalHistory));
      setShowPopup_(true)
      return
    }
  }, []);

  const prev = () => {
    if (current > 1) {
      setCurrent(current - 1);
    } else {
      navigate(-1);
    }
  };


  const next = (latestMedicalState) => {
    if (current < questions.length) {
      setCurrent(current + 1);
    } else {
      if (medicalhistory && Object.keys(medicalhistory).length === 0) {
        toast.error("Please answer all the questions");
        return;
      }
      setAppointmentData((prev) => ({
        ...prev,
        medicalHistory: JSON.stringify(latestMedicalState),
      }));
      navigate("/emergency-contact");
    }
  };

  const handleYes = () => {
    setShowPopup_(!showPopup_);
  };

  const handleNo = () => {
    setShowPopup_(!showPopup_);
    navigate("/emergency-contact");
  };

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
            current={current}
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

        {questions.length > 0 && questions[current - 1]?.type === "NUM" && (
          <ExplanationComponent
            question={questions[current - 1]}
            next={next}
            prev={prev}
            inputType={"number"}
          />
        )}

        {questions.length > 0 && questions[current - 1]?.type === "E" && (
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
          <h3 className="font-bold">
            {t("Do you want to update your medical history?")}
          </h3>

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
