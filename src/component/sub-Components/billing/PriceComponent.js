import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoaderModal from "../../modal/LoaderModal";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import toast from "react-hot-toast";
import axiosInstance from "../../../config/axios";

export default function PriceComponent() 
{

  const {appointment, setAppointment} = useAppointmentContext();
  const [isFixedPrice, setIsFixedPrice] = useState(appointment?.typeofservice !== "tattoo" ? "yes" : appointment?.isFixedPrice ? appointment?.isFixedPrice : "" )

  const navigate = useNavigate()
  const {t} = useTranslation() 

  const [formatedPrice, setFormatedPrice] = useState()
  const [price, setPrice] = useState(appointment?.price ||  "")
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
     if(appointment?.price){
      setFormatedPrice(`${parseFloat(appointment.price).toFixed(2)}`)
     }
  },[appointment])
  
  
  
  const handleInputChangeInternal = (event) => {
    // Update the raw price in the state
    const rawPrice = parseInt(event.target.value.replace(/[^0-9.]/g, ""));
    setPrice(rawPrice)
    setFormatedPrice(rawPrice)
    // Format for display
  };


  const handleSelect = (e)=>{
       setIsFixedPrice(e.target.value)
  }
  
  const handleZeros = ()=>{
    if(formatedPrice){
      setFormatedPrice(formatedPrice === "" ? "" : `${parseFloat(formatedPrice).toFixed(2)}`);
    }
  }

  const handleNext  = async()=>{
    if(appointment.typeofservice === "tattoo" && !isFixedPrice){
      toast.error("Please Select if the price is fixed or hourly")
      return;
    }
    if(!price){
      toast.error("Please Enter the price")
      return
    }
    try {
      setLoading(true)
      const updates = {
        price,
        isFixedPrice,
        adminProcessStep:2,
      }
      const response = await axiosInstance.put(`appointment/${appointment.id}`,updates )
      if(response.status === 200){
        setAppointment(response.data.appointment)
        navigate(`/billing/${response.data.appointment.adminProcessStep}`);
      }
      
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  }

  const handlePrev = ()=>{
    navigate("/artist-dashboard")
  }


  if(loading){
    return <LoaderModal/>
  }


  return (
    <div className="flex flex-col items-center w-full gap-4">
      {appointment?.typeofservice === "tattoo" && <h3>{t("Is this hourly or set price?")}</h3>}
     {appointment?.typeofservice === "tattoo" && <select
        name="fix"
        className="p-2 md:w-2/4 w-full text-black font-semibold rounded-lg"
        onChange={handleSelect}
        value={isFixedPrice}
      >
        <option value={""}>{t("Select")}</option>
        <option value={"no"}>{t("Hourly")}</option>
        <option value={"yes"}>{t("Set Price")}</option>
      </select>}

      <div className="flex flex-col md:flex-row gap-2 items-center w-2/4">
        <div className="flex flex-col gap-2 items-center w-full">
          <label>{t("Enter Price:")}</label>
            <div className="flex gap-1 bg-white p-1 rounded-lg items-center pl-2">
              <span className="text-black">
                $
              </span>
                <input
                  type="number"
                  name="price"
                  className="p-1 rounded-lg text-black flex-1 focus:outline-none"
                  disabled={isFixedPrice === ""}
                  value={formatedPrice}
                  onChange={handleInputChangeInternal}
                  onBlur={handleZeros}
                  placeholder={t("Price")}
                />
            </div>
        </div>
      </div>
      <div className="flex items-center gap-5"> 

      <button className="yellowButton py-2 text-black px-4 font-bold rounded-lg" onClick={handlePrev}>
        {t("Back")}
      </button>
      <button className="yellowButton py-2 text-black px-4 font-bold rounded-lg" onClick={handleNext}>
        {t("Next")}
      </button>
      </div>
    </div>
  );
}
