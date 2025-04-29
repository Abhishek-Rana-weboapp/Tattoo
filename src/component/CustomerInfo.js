import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../url";
import axios, { AxiosHeaders } from "axios";
import { AUTHHEADERS } from "../commonFunctions/Headers";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "./modal/Modal";
import { states } from "../data/states";

const CustomerInfo = () => {

  const username = sessionStorage.getItem("username")
  const storedDetailedInfo = JSON.parse(sessionStorage.getItem("detailedInfo"))
  const {alert, setAlert, setAlertMessage} = useContext(UserContext)
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [showPopup_, setShowPopup_] = useState(false)
  const minor = sessionStorage.getItem("minor") || ""

    const [userData, setUserData] = useState({
        address:"",
        city:"",
        state:"Florida",
        zip:"",
        race:"",
        gender:"",
    })

    const [otherInput, setOtherInput] = useState("")
    const [otherChecked, setOtherChecked] = useState(false)

    useEffect(()=>{
       if(!Object.values(storedDetailedInfo).includes(null)){
        setUserData(storedDetailedInfo)
        setShowPopup_(true)
       }
    },[])


    const handleInputs = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if(name === "genderMale" || name === "genderFemale" || name === "genderOther"){
            if(name === "genderOther"){
              setOtherChecked(true)
                setUserData(prev=>({...prev, gender : otherInput}))
            }else{
              setOtherChecked(false)
                setUserData(prev=>({...prev, gender:value}))
            }
        }else{
            setUserData(prev=>({...prev , [name] : value}))
        }
    }

    useEffect(()=>{
       if(otherInput){
        setUserData(prev=>({...prev, gender : otherInput}))
       }
    },[otherInput])


    const handleSubmit = async (e)=>{
      e.preventDefault()
      if(userData.address && userData.city && userData.state && userData.zip && userData.gender && userData.race ){
        await axios.patch(`${apiUrl}artist/user_update?username=${username}`, userData , {headers:AUTHHEADERS()})
        .then(res=>{
          if(minor === "true"){
            navigate("/gaurdian-info")
          }else{
            navigate("/dashboard")
          }
        })
        .catch(err=>{
          setAlertMessage(t("Something went wrong"))
          setAlert(!alert)
        })
      }else{
         setAlertMessage(t("Please fill all the details"))
         setAlert(!alert)
          return
      }
      }
      
    const handleYes = () => {
      setShowPopup_(false)
    }
    
    const handleNo = ()=>{
      if(minor === "true"){
        navigate("/gaurdian-info")
      }else{
        navigate("/dashboard")
      }
    }

  return (

    <>
    {showPopup_ && (
        <Modal>
          <p className="text-3xl font-bold mb-4 text-black">
            {t("Do you want to update your Info?")}
          </p>
          <div className="flex  gap-5 items-center">
          <button
            className="yellowButton text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={handleYes}
          >
            {t("Yes")}
          </button>
          <button
            className="yellowButton text-black py-2 px-8 rounded-3xl font-bold mt-4"
            onClick={handleNo}
          >
            {t("No")}
          </button>
           
          </div>
        </Modal>
      )}
    <div className="w-full h-full flex flex-col items-center overflow-auto p-4 text-white gap-4">
        <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">{t("Additional info")}</label>
      <form className="flex flex-col md:w-1/3 w-full justify-between h-full overflow-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between md:items-center md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">{t("Address")} :</label>
            <input
              name="address"
              placeholder="Address"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              value={userData.address}
              onChange={handleInputs}
              ></input>
          </div>

          <div className="flex justify-between md:items-center md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">{t("City")} :</label>
            <input
              name="city"
              placeholder="City"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              value={userData.city}
              onChange={handleInputs}
              ></input>
          </div>

          <div className="flex justify-between md:items-center md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">{t("State")} :</label>
            <select
              name="state"
              placeholder="State"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              value={userData.state}
              onChange={handleInputs}
              >
                {
                  states.map(state=><option key={state}>{state}</option>)
                }
              </select>
          </div>

          <div className="flex justify-between md:items-center md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">{t("Zip")} :</label>
            <input
              name="zip"
              placeholder="Zip"
              type="number"
              className="p-2 rounded-lg text-black md:flex-1"
              value={userData.zip}
              onChange={handleInputs}
              ></input>
          </div>

          <div className="flex items-center md:flex-row flex-col">
            <label className="flex  md:w-20 w-full">{t("Gender")} :</label>
            <div className="flex flex-col md:flex-1 w-full">
              <div className="flex gap-2">
            <label className="flex gap-2 items-center ml-1">
            <input name="genderMale" type="radio" value="male" checked={userData.gender === "male"} onChange={handleInputs}></input>
                {t("Male")}
            </label>
            <label className="flex gap-2 items-center">
            <input name="genderFemale" type="radio" value="female" checked={userData.gender === "female"} onChange={handleInputs}></input>
                {t("Female")}
            </label>
            <label className="flex gap-2 items-center">
                <input name="genderOther" type="radio" checked={otherChecked} onChange={handleInputs}></input>
                {t("other")} 
            </label>
              </div>
            {otherChecked && <input type="text" className="p-2 rounded-lg text-black" value={otherInput} onChange={(e)=>setOtherInput(e.target.value)} ></input>}
            </div>
          </div>

          <div className="flex justify-between md:items-center md:flex-row flex-col">
            <label className="flex gap-3 md:w-20 w-full">{t("Race")} :</label>
            <input
              name="race"
              placeholder="Race"
              type="text"
              className="p-2 rounded-lg text-black md:flex-1"
              value={userData.race}
              onChange={handleInputs}
              ></input>
          </div>
        </div>

        <button className="yellowButton px-4 py-2 text-black font-bold self-center rounded-3xl mt-3">
          {t("Submit")}
        </button>
      </form>
    </div>
              </>
  );
};

export default CustomerInfo;
