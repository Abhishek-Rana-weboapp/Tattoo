import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import { data } from "autoprefixer";

function HoldHarmlessAgreement() {
  const { harmlessagreement, setharmlessagreement } =
    React.useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sigUrl, setSigUrl] = useState(null);
  const [showpop, setshowpop] = useState(true);
  const { setIsVisible, alert, setAlert, setAlertMessage } =
    useContext(UserContext);
  const signatureRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNameChange = (e) => {
    setharmlessagreement({
      ...harmlessagreement,
      name: e.target.value,
    });
  };

  const handleInitialsChange = (e) => {
    setharmlessagreement({
      ...harmlessagreement,
      initials: e.target.value,
    });
  };

  const handleAgreementToggle = () => {
    setAgreed(!agreed);
  };
  const handleClear = () => {
    signatureRef.current.clear();
    setshowpop(true);
  };

  const handleSaveSignature = () => {
    const dataUrl = signatureRef.current.toDataURL();

    setharmlessagreement({
      ...harmlessagreement,
      signatureurl: dataUrl,
    });
    setshowpop(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !harmlessagreement.name ||
      !harmlessagreement.initials ||
      !agreed ||
      !harmlessagreement.signatureurl
    ) {
      setAlert(!alert);
      setAlertMessage("Please fill in all required fields.");
    } else {
      console.log("data-======", harmlessagreement);
      navigate("/term");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-between  p-8 text-white  md:w-4/6 overflow-hidden">
      <h1 className="text-xl md:text-4xl font-bold mb-4 text-yellow-500">
        Hold Harmless Agreement
      </h1>
      <div className="flex flex-col flex-1 p-2 rounded-md gap-2 justify-between bg-gray-800 overflow-hidden backdrop-blur bg-opacity-50">
        <div className="flex flex-col justify-center gap-3 overflow-hidden">
          <div className="overflow-auto scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-thumb-rounded scrollbar-track -rounded">
            <p className="text-center outline-1 outline-white">
              {t("I, Name:")} {harmlessagreement.name}{" "}
              {t(
                " hereby acknowledge and agree that as a patron and customer of Fame Tattoos, Inc., its premises, facility, services, and products, involves risks of injury to persons or property, including but not limited to those described below, and patron/customer assumes full responsibility for such risks. In consideration of being a patron/customer of Fame Tattoos, Inc., for any purpose including, but not limited to, tattoo services, piercing services, tattoo removal services, tooth gems, observation, use of shop equipment, services, or participation in any way, patron/customer agrees to the following: Patron/Customer hereby releases and holds Fame Tattoos, Inc., its directors, officers, employees, independent contractors, and agents harmless from all liability to any patron/customer, their children, personal representatives, assigns, heirs, and next of kin for any loss, damage, personal injury, deformity, death, and forever gives up any claims or demands therefore, on account of injury to patron/customer's person or property, including injury leading to disfigurement or death of patron/customer, whether caused by the active or passive negligence of Fame Tattoos, Inc., or otherwise, to the fullest extent permitted by law, while patron/customer is in, upon, or about the Fame Tattoos, Inc., premises using or not using their services, facility, or equipment."
              )}
            </p>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <label>Name:</label>
            <input
              className="bg-gray-700 text-white rounded-md p-2"
              type="text"
              value={harmlessagreement.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-center">
            <label>Initials:</label>
            <input
              className="bg-gray-700 text-white  rounded-md p-2"
              type="text"
              value={harmlessagreement.initials}
              onChange={handleInitialsChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-center">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={agreed}
              onChange={handleAgreementToggle}
            />
            <label>I agree to the terms</label>
          </div>
          {showpop && agreed && harmlessagreement.initials && (
            <div className="w-full flex justify-center items-center">
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
          )}
        </div>
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
