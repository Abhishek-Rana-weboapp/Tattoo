import React, { useState } from "react";

const CustomerInfo = () => {
    const [userData, setUserData] = useState({
        address:"",
        city:"",
        state:"",
        zip:"",
        race:"",
        gender:"",
    })

    const [otherInput, setOtherInput] = useState("")

    const handleInputs = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if(name === "genderMale" || name === "genderFemale" || name === "genderOther"){
            if(name === "genderOther"){
                setUserData(prev=>({...prev, gender : otherInput}))
            }else{
                setUserData(prev=>({...prev, gender:value}))
            }
        }else{
            setUserData(prev=>({...prev , [name] : value}))
        }
    }
  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto p-8 text-white gap-4">
        <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">Additional info</label>
      <form className="flex flex-col md:w-1/3 w-full justify-between h-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">Address</label>
            <input
              name="address"
              placeholder="Address"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              onChange={handleInputs}
            ></input>
          </div>

          <div className="flex justify-between md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">City</label>
            <input
              name="city"
              placeholder="City"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              onChange={handleInputs}
            ></input>
          </div>

          <div className="flex justify-between md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">State</label>
            <input
              name="state"
              placeholder="State"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              onChange={handleInputs}
            ></input>
          </div>

          <div className="flex justify-between md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">Zip</label>
            <input
              name="zip"
              placeholder="Zip"
              type="number"
              className="p-2 rounded-lg text-black md:flex-1"
              onChange={handleInputs}
            ></input>
          </div>

          <div className="flex gap-4 items-center">
            <label>Gender :</label>
            <label className="flex gap-2">
            <input name="genderMale" type="radio" value="male" checked={userData.gender === "male"} onChange={handleInputs}></input>
                Male
            </label>
            <label className="flex gap-2">
            <input name="genderFemale" type="radio" value="female" checked={userData.gender === "female"} onChange={handleInputs}></input>
                Female
            </label>
            <label className="flex gap-2 items-center">
                <input name="genderOther" type="radio" value="other" checked={userData.gender !== "male" && userData.gender !== "female" && userData.gender !== ""} onChange={handleInputs}></input>
                other 
            <input type="text" className="p-2 rounded-lg " value={otherInput} onChange={(e)=>setOtherInput(e.target.value)} ></input>
            </label>
          </div>

          <div className="flex justify-between md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">Race</label>
            <input
              name="race"
              placeholder="Race"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              onChange={handleInputs}
            ></input>
          </div>
        </div>

        <button className="yellowButton px-4 py-2 text-black font-bold self-center rounded-3xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerInfo;
