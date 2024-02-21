import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import HistoryVerifyModal from "../modal/HistoryVerifyModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoaderModal from "../modal/LoaderModal";

export default function ArtistDashboard() {
  const [appointments, setAppointments] = useState();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const {
    isVisible,
    setIsVisible,
    alert,
    setAlert,
    setAlertMessage,
    setUpdateAppointment,
  } = useContext(UserContext);
  const [selectedClient, setSelectedClient] = useState();
  const {t} = useTranslation()
  // const [selectedArtist, setSelectedArtist] = useState([]);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState();
  const [selectedYes, setSelectedYes] = useState([]);
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const selectedArtist = sessionStorage.getItem("fullname")
  const [loading , setLoading] = useState(false)

  const fetchAppointments = async () => {
    setLoading(true)
    await axios
      .get(`${apiUrl}/artist/appointment_list`)
      .then((res) =>{
        setAppointments(
          res?.data?.data.filter((a) => {
            const appDate = new Date(a.Date)
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            return (
              (appDate.toLocaleDateString() === todayDate.toLocaleDateString() && a.Sign_completion === null)
              );
            })
            )
            setLoading(false)
          }
      )
      .catch((err) => {
        setLoading(false)
        setAlertMessage(t("Error while fetching"))
        setAlert(!alert)
        return
      });
  };



  useEffect(() => {
    fetchAppointments();
    setIsVisible(true);
  }, []);

  
  useEffect(() => {
    if (selectedClient && selectedArtist) {
      const MedicalData = JSON.parse(selectedClient.medicalhistory) || {};
      setSelectedMedicalHistory(MedicalData)
      const yesAnswers = Object.keys(MedicalData).filter((key) => {
        return MedicalData[key].yes === true;
      });
      setSelectedYes(yesAnswers);
    }
  }, [selectedClient, selectedArtist]);

  useEffect(() => {
    if (selectedMedicalHistory) {
      const yesAnswers = Object.keys(selectedMedicalHistory).filter((key) => {
        return selectedMedicalHistory[key].yes === true;
      });
      if (selectedMedicalHistory) {
      }
    }
  }, [selectedMedicalHistory]);

  const medicalQuestions = {
    page1: "Have You Ever Been Tattooed Before?",
    page2: "Are you Pregnant or Nursing?",
    page3:
      "Are you a hemophiliac or on any medications that may cause bleeding or hinder blood clotting?",
      page4: "Do you have any medical or skin conditions?",
      page5: "Do you have any communicable diseases?",
      page6:
      "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
      page7: "Do you have any allergies?",
      page8: "Do you have a heart condition, epilepsy, or diabetes?",
  };

  //   Function to handle the client select dropdown

  const handleClientSelect = (e) => {
    const selectedAppointment = appointments?.find(
      (app) => parseInt(app?.id) === parseInt(e.target.value)
    );
    setSelectedClient(selectedAppointment);
    setUpdateAppointment(selectedAppointment);
  };



  const handleNext = async () => {
    if (step === 0) {
      if (selectedClient) {
        sessionStorage.setItem("selectedAppointment",  JSON.stringify(selectedClient))
              if (selectedYes.length !== 0){
                setStep(step + 1);
              }else{
                const data = {
                  updates:[
                    {
                      id:selectedClient?.id,
                      updateField:"ArtistPiercerNames",
                      updateValue:selectedArtist
                    }
                  ]
                }
                  await axios.post(`${apiUrl}/artist/post_new`, data)
                  .then(res=>{
                    axios.get(`${apiUrl}/artist/appointment_list_id?id=${selectedClient?.id}`)
                    .then(response=>{
                      navigate(`/billing/${selectedClient?.id}/${selectedClient?.process_step}`)
                      return
                    })
                    .catch(err=>console.error(err))
                    return
                  })
                  .catch(err=>console.error(err))
                  return
              }
            }
       else {
        setAlertMessage(t("Please select a client:"));
        setAlert(!alert);
        return
      }
    }if(step === 1){
      if(acknowledgement){
        navigate(`/billing/${selectedClient?.id}/${selectedClient?.process_step}`)
      }else{
        setAlertMessage(t("Please acknowledge you understand the medical history"));
        setAlert(!alert);
        return
      }
    }
  };

  const handlePrev = () => {
    if (step === 1) {
      setStep(0);
    }
    if(step === 0){
      navigate(-1)
    }
  };

  if(loading){
    return <LoaderModal/>
  }

  return (
    <div className="w-full h-full p-2 flex justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col gap-2 p-1 pb-3">
        {/* <h1 className="text-center text-yellow-400 font-bold">Artist Dashboard</h1> */}
        {step === 0 && (
          <div className="flex flex-col justify-center gap-2 items-center">
            <h2 className="text-white font-medium ">{t("Select the Client")} </h2>
            <select
              className="p-2 rounded-lg md:w-2/4 w-full"
              value={selectedClient?.id}
              onChange={handleClientSelect}
            >
              <option value={""}>{t("Select the client")} </option>
              {appointments?.map((appointment) => {
                return (
                  <option key={appointment?.id} value={appointment?.id}>
                    {`${appointment?.firstname} ${appointment?.lastname}`}
                  </option>
                );
              })}
            </select>

            <div className="flex justify-center">
              <button
                className="yellowButton rounded-xl py-2 px-5 font-bold"
                onClick={handleNext}
              >
                {t("Next")}
              </button>
            </div>
          </div>
        )}


        {step === 1 && (
          <>
            <div className="flex flex-col gap-4 items-center overflow-hidden">
              <h1 className="font-bold text-white">{t("Client's Medical History")}</h1>
              <div className="flex flex-col gap-4 items-start overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded p-2">
                {Object.keys(medicalQuestions).map((med, index) => {
                  return (
                    <div className="flex flex-col gap-1 text-white w-full ">
                      <div className="font-bold flex justify-start gap-1">
                        <div className="md:w-10 ">{`Q${index + 1}: `}</div>
                        {medicalQuestions[med]}
                      </div>
                      <div className="w-full text-start pl-10">
                        {selectedMedicalHistory.type === "common" && selectedMedicalHistory[med]?.yes === true
                          ? med === "page1"
                            ? "Yes"
                            : med === "page2"
                            ? `yes, ${
                                selectedMedicalHistory[med]?.nursing === true
                                  ? "nursing"
                                  : "pregnant"
                              }`
                            : `yes , ${selectedMedicalHistory[med]?.explanation}`
                          : "No"}

                        {selectedMedicalHistory.type === "tooth-gems" && (selectedMedicalHistory[med]?.yes === true
                          ? med === "tattooedBefore"
                            ? "Yes"
                            : med === "pregnantOrNursing"
                            ? `yes, ${
                                selectedMedicalHistory[med]?.nursing === true
                                  ? "nursing"
                                  : "pregnant"
                              }`
                            : `yes , ${selectedMedicalHistory[med]?.explanation}`
                          : "No")}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 w-full items-center justify-center">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  value={acknowledgement}
                  onChange={(e) => setAcknowledgement(e.target.checked)}
                />
                <label className="font-bold text-white">
                  {t("I understand the Medical History of the client")}
                </label>
              </div>
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
