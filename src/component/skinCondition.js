import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointmentContext } from "../context/AppointmentContext";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import TranslationWrapper from "./Layout/TranslationWrapper";
import LoaderModal from "./modal/LoaderModal";

function SkinCondition({
}) {
  const {appointment, setAppointment} = useAppointmentContext()
  const navigate = useNavigate()
  const [condition, setCondition] = useState(appointment?.skinCondition ? appointment?.skinCondition === "good" ? "good" : "bad" : "" );
  const [explanation, setExplanation] = useState(appointment?.skinCondition && appointment?.skinCondition !== "good" ? appointment?.skinCondition  : "" )
  const [loading, setLoading] = useState(false)

  const thirdstepServices = [
    "tattoo", "removal"
  ]

  const fourthstepServices = [
    "piercing"
  ]
 

  const handleUpdateSkin = async () => {
    if(!condition){
      toast.error("Please select skin condition");
      return;
    }

    if(condition === "bad" && !explanation){
      toast.error("Please explain the skin condition");
      return;
    }

    try {
      setLoading(true)
      const data = {
        skinCondition : condition === "good" ? condition : explanation,
        adminProcessStep :thirdstepServices.includes(appointment.typeofservice) ?  3 : fourthstepServices.includes(appointment.typeofservice) ? 4 : 5
      }
      const response = await axiosInstance.put(`appointment/${appointment.id}`, data)
      if(response.status === 200){
        setAppointment(response.data.appointment);
        navigate(`/billing/${response.data.appointment.adminProcessStep}`)
      }
    } catch (error) {
       toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  };

  const handlePrev = ()=>{
    navigate("/billing/1")
  }

  if(loading){
    return <LoaderModal />
  }

  return (
    <div className="flex flex-col gap-2 items-center w-full ">
      <div className="w-full flex flex-col gap-3 items-center">
        <h3> <TranslationWrapper text={"Please Select Skin Condition"} /></h3>
        <select
          className="p-2 rounded-lg md:w-2/4 w-full text-black font-semibold"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value={""}>Select</option>
          <option value={"good"}><TranslationWrapper text={"Good"} /></option>
          <option value={"bad"}><TranslationWrapper text={"Bad"} /></option>
        </select>
        {condition === "bad" && (
          <>
            <h5 className="text-white"><TranslationWrapper text={"Explain the skin condition :"} /></h5>
            <textarea
              className="w-full h-28 md:w-2/4 rounded-xl p-2 text-black"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </>
        )}
        <div className="flex gap-5 items-center">
          <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={handlePrev}
          >
            <TranslationWrapper text={"Back"} />
          </button>
          <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={handleUpdateSkin}
          >
            <TranslationWrapper text={"Update Skin Condition"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkinCondition;
