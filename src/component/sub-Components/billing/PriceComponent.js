import React, { useEffect, useState } from "react";

export default function PriceComponent({
  updateAppointment,
  billingData,
  handlePrice,
  handleInputChange,
  handleNext,
  handlePrev,
}) 
{

  useEffect(()=>{
     if(billingData.price){
      setFormatedPrice(`${parseFloat(billingData.price).toFixed(2)}`);
     }
  },[])


  const [formatedPrice, setFormatedPrice] = useState()

  const handleInputChangeInternal = (event) => {
    // Update the raw price in the state
    const rawPrice = parseInt(event.target.value.replace(/[^0-9.]/g, ""));
    handlePrice("price", rawPrice);
    setFormatedPrice(rawPrice)
    // Format for display
  };
  
  const handleZeros = ()=>{
    if(formatedPrice){
      setFormatedPrice(formatedPrice === "" ? "" : `${parseFloat(formatedPrice).toFixed(2)}`);
    }
  }


  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h3>Is this hourly or set price?</h3>
      <select
        name="fix"
        className="p-2 md:w-2/4 w-full text-black font-semibold rounded-lg"
        onChange={handleInputChange}
        value={billingData.fix}
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
              disabled={billingData.fix === ""}
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
