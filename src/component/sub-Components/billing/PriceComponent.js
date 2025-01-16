import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../../url";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import LoaderModal from "../../modal/LoaderModal";
import { AUTHHEADERS } from "../../../commonFunctions/Headers";

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
  const [fix, setFix] = useState(updateAppointment.fix_price ? updateAppointment.fix_price : updateAppointment.typeofservice !== "tattoo" ? "yes" : "")
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
      await axios.post(`${apiUrl}artist/post_new`, data, {headers:AUTHHEADERS()})
      .then((res) => {
        setLoading(false)
        setUpdateAppointment(res.data.updatedtable);
        navigate(`/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`);
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
      {updateAppointment.typeofservice === "tattoo" && <h3>{t("Is this hourly or set price?")}</h3>}
     {updateAppointment.typeofservice === "tattoo" && <select
        name="fix"
        className="p-2 md:w-2/4 w-full text-black font-semibold rounded-lg"
        onChange={handleSelect}
        value={fix}
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
                  disabled={fix === ""}
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
