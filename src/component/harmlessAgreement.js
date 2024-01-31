import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import { data } from "autoprefixer";
import SignatureModal from "./modal/SignatureModal";

function HoldHarmlessAgreement() {
  const { harmlessagreement, setharmlessagreement } =
    React.useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { setIsVisible, alert, setAlert, setAlertMessage, signature, setSignature } =
    useContext(UserContext);
  const [signatureRef, setSignatureRef] = useState();
  const inputRef = useRef()

  const initials = sessionStorage.getItem("initials")
  const name = `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem("lastname")}`

  useEffect(() => {
    setIsVisible(true);
    inputRef?.current?.focus()
  }, []);

  // const handleNameChange = (e) => {
  //   setharmlessagreement({
  //     ...harmlessagreement,
  //     name: e.target.value,
  //   });
  // };

  // const handleInitialsChange = (e) => {
  //   setharmlessagreement({
  //     ...harmlessagreement,
  //     initials: e.target.value,
  //   });
  // };

  console.log(harmlessagreement)
  const handleAgreementToggle = (e) => {
    console.log(e.target.checked);
    setharmlessagreement(prev=>({...prev, agreed : e.target.checked}))
    if(e.target.checked === true){
     setharmlessagreement(prev=>({...prev , initials : initials , name:name, signatureurl: signature}))
    }else{
      setharmlessagreement(prev=>({...prev , initials : "" , name:"", signatureurl:undefined}))
    }
  };

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSaveSignature = () => {
    if(signatureRef?.current?.isEmpty()){
      setAlertMessage(t("Please add your signature"))
      setAlert(!alert)
    }else{
      const dataUrl = signatureRef?.current?.toDataURL();
      setharmlessagreement({
        ...harmlessagreement,
        signatureurl: dataUrl,
      });
      setShowPopup(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !harmlessagreement?.name ||
      !harmlessagreement?.initials ||
      !harmlessagreement?.agreed ||
      !harmlessagreement?.signatureurl
    ) {
      setAlert(!alert);
      setAlertMessage("Please fill in all the required fields.");
    } else {
      navigate("/term");
    }
  };

  const handleSignature = ()=>{
    if(harmlessagreement?.name && harmlessagreement?.initials && harmlessagreement?.agreed){
      setShowPopup(!showPopup)
    }else{
      setAlert(!alert)
      setAlertMessage(t("Please fill in all the required fields."))
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-between p-2 md:p-8 text-white  md:w-4/6 overflow-hidden">
      <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center">
        {t("Hold Harmless Agreement")}
      </label>
      <div className="flex flex-col flex-1 p-2 rounded-md gap-2 justify-between overflow-hidden backdrop-blur bg-opacity-50">
        
          <div className="overflow-auto scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-thumb-rounded scrollbar-track -rounded">
            <p className="text-center outline-1 outline-white">
              {t("I, Name:")} {harmlessagreement?.name}{" "}
              {t(
                " hereby acknowledge and agree that as a patron and customer of Fame Tattoos, Inc., its premises, facility, services, and products, involves risks of injury to persons or property, including but not limited to those described below, and patron/customer assumes full responsibility for such risks. In consideration of being a patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services, piercing services, tattoo removal services, tooth gems, observation, use of shop equipment, services, or participation in any way, patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc., its directors, officers, employees, independent contractors, and agents harmless from all liability to any patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss, damage, personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of injury to patron/customer's person or property, including injury leading to disfigurement or death of patron/customer, whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest extent permitted by law, while patron/customer is in, upon, or about the Fame Tattoos, Inc., premises using or not using their services, facility, or equipment."
              )}
            </p>
          </div>

          <div className="flex flex-col  md:flex-row gap-2 justify-center">
            <div className="flex gap-1 items-center justify-center">
              <label>{t("Name")}:</label>
              <input
              ref={inputRef}
                className="bg-gray-700 text-white rounded-md p-2"
                type="text"
                value={harmlessagreement?.name}
                // onChange={handleNameChange}
              />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <label>{t("Initials")}:</label>
              <input
                className="bg-gray-700 text-white  rounded-md p-2 Blacksword"
                type="text"
                value={harmlessagreement?.initials}
                // onChange={handleInitialsChange}
              />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={harmlessagreement?.agreed}
                onChange={handleAgreementToggle}
              />
              <label>{t("Select to add your name , initials and signature")}</label>
            </div>
          </div>
          
          {
                harmlessagreement?.signatureurl && <div className="h-20 w-full flex justify-center ">
                  <img className="w-1/4 h-full bg-white" src= {harmlessagreement?.signatureurl} />
                  </div>
          }
          {/* <div className="flex justify-center">
            <button className="yellowButton py-2 px-3 rounded-3xl text-black font-bold" onClick={handleSignature}>{t("Add Signature")}</button>
          </div> */}
          {/* {
            
            showPopup &&(
                <SignatureModal
                  setSignatureRef={setSignatureRef}
                  handleSave={handleSaveSignature}
                  handleClear={handleClear}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                />
              )


            (
              <div className="w-full flex flex-col justify-center items-center">
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 300,
                    height: 150,
                    className: "sigCanvas",
                    style: {
                      border: "1px solid #000",
                      backgroundColor: "#9ca3af",
                      borderRadius: "10px",
                    },
                  }}
                  ref={signatureRef}
                />
                <div className="flex gap-4 items-center">
                <button
                  type="button"
                  className="mx-2 "
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleClear}
                >
                  {t("Clear")}
                </button>
                <button
                  className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold "
                  onClick={handleSaveSignature}
                  >
                  {t("Save")}
                </button>
                  </div>
              </div>
            )
          } */}
        <div className="w-full flex justify-between">
          <button
            type="submit"
            className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={() => navigate(-1)}
          >
            {t("Previous")}
          </button>
          <button
            type="submit"
            className="bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={handleSubmit}
          >
            {t("Next")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoldHarmlessAgreement;
