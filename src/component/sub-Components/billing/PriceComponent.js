import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../../url";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import LoaderModal from "../../modal/LoaderModal";

export default function PriceComponent({
  updateAppointment,
  setUpdateAppointment,
  handlePrev,
}) 
{

  const navigate = useNavigate()
  const {alert,setAlert, setAlertMessage} = useContext(UserContext)
  const {t} = useTranslation()

  const [formatedPrice, setFormatedPrice] = useState()
  const [price, setPrice] = useState(updateAppointment.price ||  "")
  const [fix, setFix] = useState(updateAppointment.fix_price || "")
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
     if(updateAppointment.price){
      setFormatedPrice(`${parseFloat(updateAppointment.price).toFixed(2)}`);
     }
  },[updateAppointment])
  
  
  const handleInputChangeInternal = (event) => {
    // Update the raw price in the state
    const rawPrice = parseInt(event.target.value.replace(/[^0-9.]/g, ""));
    setPrice(rawPrice)
    setFormatedPrice(rawPrice)
    // Format for display
  };


  const handleSelect = (e)=>{
       setFix(e.target.value)
  }
  
  const handleZeros = ()=>{
    if(formatedPrice){
      setFormatedPrice(formatedPrice === "" ? "" : `${parseFloat(formatedPrice).toFixed(2)}`);
    }
  }

  const handleNext = async()=>{
    if(price && fix){
      setLoading(true)
      const data = {
      updates:[
        {
          id:updateAppointment?.id,
          updateField:"price",
          updateValue:price
        },
        {
          id:updateAppointment?.id,
          updateField:"fix_price",
          updateValue:fix
        },
        {
          id:updateAppointment?.id,
          updateField:"process_step",
          updateValue:2
        }
      ]
    }
      await axios.post(`${apiUrl}/artist/post_new`, data)
      .then(res=>{
        axios.get(`${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`)
        .then(res=>{
           setUpdateAppointment(res.data.data[0])
           setLoading(false)
           navigate(`/billing/${updateAppointment?.id}/${res.data.data[0].process_step}`)
        })
        .catch(err=>{
          setLoading(false)
          setAlertMessage(t("Something went wrong"))
          setAlert(!alert)
        })
      })
      .catch(err=>{
        setLoading(false)
        setAlertMessage(t("Something went wrong"))
        setAlert(!alert)
      })
    }
  }

  if(loading){
    return <LoaderModal/>
  }


  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h3>{t("Is this hourly or set price?")}</h3>
      <select
        name="fix"
        className="p-2 md:w-2/4 w-full text-black font-semibold rounded-lg"
        onChange={handleSelect}
        value={fix}
      >
        <option value={""}>{t("Select")}</option>
        <option value={"no"}>{t("Hourly")}</option>
        <option value={"yes"}>{t("Set Price")}</option>
      </select>

      <div className="flex flex-col md:flex-row gap-2 items-center w-2/4">
        <div className="flex flex-col gap-2 items-center w-full">
          <label>{t("Enter Price:")}</label>
          <span className="w-full flex gap-1 items-center">
            $
            <input
              type="number"
              name="price"
              className="p-2 rounded-lg text-black flex-1"
              disabled={fix === ""}
              value={formatedPrice}
              onChange={handleInputChangeInternal}
              onBlur={handleZeros}
              placeholder={t("Price")}
            />
          </span>
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
