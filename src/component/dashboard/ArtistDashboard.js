import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import HistoryVerifyModal from "../modal/HistoryVerifyModal";

export default function ArtistDashboard() {
  const [appointments, setAppointments] = useState();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const {isVisible , setIsVisible} = useContext(UserContext)
  const [selectedClient , setSelectedClient] = useState()
  const [selectedArtist , setSelectedArtist] = useState([])
  const [selectedMedicalHistory , setSelectedMedicalHistory] = useState()
  const [selectedYes, setSelectedYes] = useState(false)

  const fetchAppointments = async () => {
    console.log("hit")
    await axios
      .get(`${apiUrl}/artist/appointment_list`)
      .then((res) => setAppointments(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const fetchMedicalHistory = async () => {
    await axios
      .get(`${apiUrl}/artist/username_appointment_list?username=${selectedClient?.username}`)
      .then((res) => setSelectedMedicalHistory(res?.data?.medicalhistory))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAppointments();
    setIsVisible(true)
  }, []);

  useEffect(()=>{
    if(selectedClient && selectedArtist ){
        fetchMedicalHistory()
    }
    if(selectedMedicalHistory){
        console.log(Object.keys(selectedMedicalHistory));
       const yesAnswers = Object.keys(selectedMedicalHistory).filter((key)=>{
        return selectedMedicalHistory[key].yes === true
       })
       setSelectedYes(yesAnswers)
    }
  },[selectedClient, selectedArtist,])



  useEffect(()=>{
    if(selectedMedicalHistory){
        console.log(Object.keys(selectedMedicalHistory));
       const yesAnswers = Object.keys(selectedMedicalHistory).filter((key)=>{
        return selectedMedicalHistory[key].yes === true
       })
      console.log(yesAnswers)
    }
  },[selectedMedicalHistory])


  const medicalQuestions = {
     tattooedBefore : "Have You Ever Been Tattooed Before?",
     pregnantOrNursing:"Are you Pregnant or Nursing?",
     hemophiliac:"Are you a hemophiliac or on any medications that may cause bleeding or hinder blood clotting?",
     medicalCondition:"Do you have any medical or skin conditions?",
     communicableDiseases:"Do you have any communicable diseases?",
     alcohol:"Are you under the influence of alcohol or drugs, prescribed or otherwise?",
     allergies:"Do you have any allergies?",
     heartCondition:"Do you have a heart condition, epilepsy, or diabetes?"
    }


//   Function to handle the client select dropdown

  const handleClientSelect = (e)=>{
    const selectedAppointment = appointments?.find(app=>parseInt(app?.id) === parseInt(e.target.value))
    setSelectedClient(selectedAppointment)
  }

  const handleArtistSelect = (e)=>{
   setSelectedArtist(e.target.value)
  }
  
console.log("selectedMedicalHistory" ,selectedMedicalHistory )
  return <div className="w-full h-full flex flex-col gap-5 p-4">
    <h1 className="text-center text-white font-bold">Artist Dashboard</h1>
    <div className="flex flex-col justify-center gap-2 items-center">
        <h2 className="text-white font-medium ">Select the Client </h2>
     <select className="p-2 rounded-lg w-2/4" value={selectedClient?.id} onChange={handleClientSelect}>
        <option value={""}>Select the client </option>
        {
            appointments?.map((appointment)=>{
                return (<option key={appointment?.id} value={appointment?.id}>{appointment?.username}</option>)
            })
        }
     </select>
        </div>

        <div className="flex flex-col justify-center gap-2 items-center">
        <h2 className="text-white font-medium">Select Your Name</h2>
        <select className="p-2 rounded-lg w-2/4" onChange={handleArtistSelect}>
        {
            appointments?.map((appointment)=>{
                return (<option key={appointment.id} value={appointment.id}>{appointment.username}</option>)
            })
        }
     </select>
        </div>
{
    selectedYes.length > 0 &&
    <HistoryVerifyModal>
     <div className="flex flex-col gap-4 items-center overflow-auto">
        {
            
            Object.keys(medicalQuestions).map((med, index)=>{
                return  <div className="flex flex-col gap-1 text-black items-center">
                    <div><span>{`Q${index+1} :`}</span>{medicalQuestions[med]}</div>
                    <div>{selectedMedicalHistory[med].yes === true ? (med === "tattooedBefore") ? "Yes" :(med === "pregnantOrNursing") ? `yes, ${selectedMedicalHistory[med].nursing === true ? "nursing" : "pregnant"}` : `yes , ${selectedMedicalHistory[med].explanation}` : "No" }</div>
            
        </div>
    })
  }
    </div>
    <div>
        <input type="text" name="initials" className="bg-gray-400 p-2 rounded-lg"  />
        <button className="yellowButton rounded-xl p-2">Yes</button>
    </div>
                </HistoryVerifyModal>
}


  </div>;
}
