import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../url";
import { useNavigate } from "react-router-dom";

export default function PriceComponent({
  updateAppointment,
  setUpdateAppointment,
  handlePrice,
  handlePrev,
}) 
{

  const navigate = useNavigate()

  const [formatedPrice, setFormatedPrice] = useState()
  const [price, setPrice] = useState(updateAppointment.price ||  "")
  const [fix, setFix] = useState(updateAppointment.fix_price || "")
  
  useEffect(()=>{
     if(updateAppointment.price){
      setFormatedPrice(`${parseFloat(updateAppointment.price).toFixed(2)}`);
     }
  },[updateAppointment])
  
  
  const handleInputChangeInternal = (event) => {
    // Update the raw price in the state
    const rawPrice = parseInt(event.target.value.replace(/[^0-9.]/g, ""));
    setPrice(rawPrice)
    handlePrice("price", rawPrice);
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
           navigate(`/billing/${updateAppointment?.id}/${res.data.data[0].process_step}`)
        })
        .catch(err=>{console.error(err)})
      })
      .catch(err=>{
        console.error(err)
      })
    }
  }


  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h3>Is this hourly or set price?</h3>
      <select
        name="fix"
        className="p-2 md:w-2/4 w-full text-black font-semibold rounded-lg"
        onChange={handleSelect}
        value={fix}
      >
        <option value={""}>Select</option>
        <option value={"no"}>Hourly</option>
        <option value={"yes"}>Set Price</option>
      </select>

      <div className="flex flex-col md:flex-row gap-2 items-center w-2/4">
        <div className="flex flex-col gap-2 items-center w-full">
          <label>Enter Price:</label>
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
              placeholder="Price"
            />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5"> 

      <button className="yellowButton py-2 text-black px-4 font-bold rounded-lg" onClick={handlePrev}>
        Prev
      </button>
      <button className="yellowButton py-2 text-black px-4 font-bold rounded-lg" onClick={handleNext}>
        Next
      </button>
      </div>
    </div>
  );
}
