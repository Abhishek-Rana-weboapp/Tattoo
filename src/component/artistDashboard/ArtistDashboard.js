import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoaderModal from "../modal/LoaderModal";
import { medicalQuestions } from "../../data/MedicalQuestions";
import VerifyMedicalHistory from "./VerifyMedicalHistory";
import {
  createInitialsAndFullName,
  fetchAppointments,
  formatDateOnly,
} from "../../utils/helperFunctions";
import toast from "react-hot-toast";
import TranslationWrapper from "../Layout/TranslationWrapper";
import { useAppointmentContext } from "../../context/AppointmentContext";

export default function ArtistDashboard() {
  const { appointment, setAppointment } = useAppointmentContext();
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [noShowAppointments, setNoShowAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const { t } = useTranslation();

  // const [selectedArtist, setSelectedArtist] = useState([]);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState();
  const [selectedYes, setSelectedYes] = useState([]);
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    fetchAppointments("pending")
      .then((appointments) => {
        setPendingAppointments(appointments);
      })
      .catch((err) => toast.error("Failed to fetch pending appointments"));

    fetchAppointments("no_show")
      .then((appointments) => {
        setNoShowAppointments(appointments);
      })
      .catch((err) => toast.error("Failed to fetch pending appointments"));

      fetchAppointments("completed")
      .then((appointments) => {
        setCompletedAppointments(appointments);
      })
      .catch((err) => toast.error("Failed to fetch pending appointments"));
  }, []);

  const handleSelectClient = (e) => {
    setAppointment(
      pendingAppointments.find(
        (app) => parseInt(app.id) === parseInt(e.target.value)
      )
    );
    setStep(1);
    return;
  };
  

  useEffect(() => {
    if (appointment ) {
      const MedicalData = JSON.parse(appointment?.medicalHistory) || {};
      setSelectedMedicalHistory(MedicalData);
      setQuestions(medicalQuestions[appointment?.typeofservice]);
      const yesAnswers = Object.keys(MedicalData).filter((key) => {
        return MedicalData[key].ans === "yes";
      });
      setSelectedYes(yesAnswers);
    }
  }, [appointment]);

  const handleNext = async () => {
    if (step === 1) {
      if (!acknowledgement) {
        toast.error(
          "Please acknowlege that you understand the Medical condition"
        );
        return;
      }
      if (acknowledgement) {
        navigate(`/billing/${appointment?.adminProcessStep}`);
        return;
      }
    }
    navigate(`/billing/${appointment?.adminProcessStep}`);
  };


  const handlePrev = () => {
    if (step === 1) {
      setStep(0);
    }
    if (step === 0) {
      navigate(-1);
    }
  };


  const handleCompleteAppointments = async(e)=>{
    setAppointment(completedAppointments.find(app=>parseInt(app.id) === parseInt(e.target.value)));
    navigate("/appointmentdetails")
  }
  
  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div className="w-full h-full p-2 flex justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col gap-2 p-1 pb-3">
        {/* <h1 className="text-center text-yellow-400 font-bold">Artist Dashboard</h1> */}
        {step === 0 && (
          <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
            <div className="w-full flex justify-end"> 
              <button className="yellowButton px-4 py-2 rounded-3xl font-semibold" onClick={()=>{
                navigate("/no-service")
              }}>
                 <TranslationWrapper text={"No Service Section"} />
              </button>
            </div>
            <h1 className="text-white md:text-2xl text-lg uppercase font-bold mb-4">
              <TranslationWrapper text={"Select the Client"} />
            </h1>
            <select
              className="w-full p-2 rounded-lg max-w-xl  mb-5"
              value={appointment}
              onChange={handleSelectClient}
            >
              <option value={""}>Select a client</option>
              {pendingAppointments.map((app) => {
                const { fullname } = createInitialsAndFullName(
                  app.firstName,
                  app.lastName
                );
                return (
                  <option value={app.id} key={app.id}>
                    <span className="flex justify-between w-full">
                      <span>{fullname}</span>-{" "}
                      <span className="text-xs">{app.typeofservice}</span> -{" "}
                        <span>{formatDateOnly(app.appointment_date)}</span>
                    </span>
                  </option>
                );
              })}
            </select>

             <div className="flex flex-col mt-10 w-full max-w-xl mx-auto gap-4">
              <label className="md:text-2xl font-semibold text-lg text-white w-max mx-auto">
                    Completed Appointments
              </label>
               <select
                className="w-full p-2 rounded-lg max-w-xl  mb-5"
                value={appointment}
                onChange={handleCompleteAppointments}
                           >
                <option value={""}>Completed Appointments</option>
                {completedAppointments.map((app) => {
                  const { fullname } = createInitialsAndFullName(
                    app.firstName,
                    app.lastName
                  );
                  return (
                    <option value={app.id} key={app.id}>
                      <span className="flex justify-between w-full">
                        <span>{fullname}</span>-{" "}
                        <span className="text-xs">{app.typeofservice}</span>
                        -{" "}
                        <span>{formatDateOnly(app.appointment_date)}</span>
                      </span>
                    </option>
                  );
                })}
              </select>
             </div>
          </div>
        )}

        {step === 1 && (
          <>
            <div className="flex flex-col gap-4 items-center overflow-hidden">
              <h1 className="font-bold text-white">
                {t("Client's Medical History")}
              </h1>
              <div className="flex flex-col gap-4 items-start overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded p-2">
                {questions &&
                  questions.map((question) => {
                    return (
                      <VerifyMedicalHistory
                        question={question}
                        questionType={question.type}
                        ans={selectedMedicalHistory[question.id]}
                      />
                    );
                  })}
              </div>
              <label className="font-bold text-white flex gap-2 w-full items-center justify-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  value={acknowledgement}
                  onChange={(e) => setAcknowledgement(e.target.checked)}
                />
                {t("I understand the Medical History of the client")}
              </label>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="yellowButton rounded-xl py-2 px-5 font-bold"
                onClick={handlePrev}
              >
                {t("Back")}
              </button>
              <button
                className="yellowButton rounded-xl py-2 px-5 font-bold"
                onClick={handleNext}
              >
                {t("Next")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
