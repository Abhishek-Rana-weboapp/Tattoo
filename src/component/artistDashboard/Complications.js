import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../modal/LoaderModal";
import { useAppointmentContext } from "../../context/AppointmentContext";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios";

const Complications = ({
}) => {
  const {appointment, setAppointment} = useAppointmentContext()
  const { t } = useTranslation();
  const textRef = useRef(null);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(appointment && appointment.complication){
      if(appointment.complication === "no"){
        setNo(true)
      }else{
        setYes(true)
        setInputData(appointment.complication)
      }
    }
  }, [appointment]);

  const handleRadioButtons = (e) => {
    if (e.target.value === "yes") {
      setYes(true);
      setNo(false);
    }
    if (e.target.value === "no") {
      setYes(false);
      setNo(true);
    }
  };

  const nextPage = async()=>{
    if(!no && !yes){
      toast.error("Please select an option");
      return
    }
    const updates= {};
    if(yes){
        if(!inputData){
           toast.error("Please explain in the input box");
          return
        }
        updates.complication = inputData
    }else{
      updates.complication = "no"
    }

    if(appointment.typeofservice === "tattoo"){
      updates.adminProcessStep = 7
    }else{
      updates.adminProcessStep = 8
    }

    try {
      setLoading(true)
      const res = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(res.status === 200){
        setAppointment(res.data.appointment);
        navigate(`/billing/${res.data.appointment.adminProcessStep}`)
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  }

  const handlePrev = ()=>{
     navigate(`/billing/5`)
  }

  if (loading) {
    return <LoaderModal />;
  }

  return (
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl h-full">
        <div className="flex flex-col items-center gap-4 w-full p-2">
          <label className="uppercase text-white text-center md:text-2xl text-md md:font-bold flex gap-1">
            <span>
              {t(
                "During the service we provided were there any complications between you, the client, or any other member of Fame Tattoos Staff? Example: (fainting, contamination, unable to fulfill service, argument, or misunderstanding)"
              )}
            </span>
          </label>
          <div className="flex flex-col items-center gap-4">
            <label className="text-2xl uppercase text-white w-20 justify-start flex gap-2 items-center hover:cursor-pointer">
            <input
                type="checkbox"
                className=" w-6 h-6"
                name="page5"
                value="yes"
                checked={yes}
                onChange={handleRadioButtons}
              />
                {t("Yes")}
              </label>
            <label className="text-2xl uppercase text-white w-20 justify-start flex gap-2 items-center hover:cursor-pointer">
              <input
                type="checkbox"
                className=" w-6 h-6"
                name="page5"
                value="no"
                checked={no}
                onChange={handleRadioButtons}
              />
              NO</label>
          </div>

          {yes && (
            <div className="flex-col  flex gap-2 items-center w-full">
              <label className="text-lg uppercase text-white">
                {t("PLEASE EXPLAIN")}
              </label>
              <textarea
                ref={textRef}
                type="text"
                name="page5-explanation"
                placeholder="Explain"
                className="w-full p-2 rounded-lg focus:outline-yellow-500 text-black"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className=" w-full flex justify-between">
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2 text-black"
            onClick={handlePrev}
          >
            {t("Prev")}
          </button>
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2 text-black"
            onClick={nextPage}
          >
            {t("Next")}
          </button>
        </div>
      </div>
  );
};

export default Complications;
