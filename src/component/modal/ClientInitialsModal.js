import React, { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas"

const ClientInitialsModal = ({cursiveSignatureImage, setCursiveSignatureImage, handleAdopt, fullName, activeTab, setActiveTab,drawnSignature, setDrawnSignature , storedInitials}) => {
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const { t } = useTranslation();

  const signatureRef = useRef();

  const handleSignatureSave = () => {
    if (signatureRef?.current?.isEmpty()) {
      setAlertMessage(t("Please add your signature"));
      setAlert(!alert);
    } else {
      const dataUrl = signatureRef?.current?.toDataURL();
      setDrawnSignature(dataUrl);
    }
  };

  const handleClear = ()=>{
    signatureRef?.current?.clear();
  }
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg">
        <h1>{t("Adopt Your Initials and Signature")}</h1>
        <label className="font-bold">{t("Confirm Your Name and Initials")}</label>
        <div className="flex items-center gap-2 w-3/4">
          <div className="flex flex-col text-start w-3/4">
            <label className="font-bold">
              {t("Full Name")}<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-1 border-gray-400 border-1 rounded-lg font-bold"
              value={fullName}
            ></input>
          </div>
          <div className="flex flex-col text-start w-1/4">
            <label className="font-bold">
              {t("Initials")}<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-1 border-gray-400 border-1 rounded-lg  Blacksword"
              value={storedInitials}
            ></input>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <button
              className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                activeTab === 1 && "bg-gray-300"
              } p-2 rounded-lg`}
              onClick={() => setActiveTab(1)}
            >
              {t("Written")}
            </button>
            <button
              className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                activeTab === 2 && "bg-gray-300"
              } p-2 rounded-lg`}
              onClick={() => setActiveTab(2)}
            >
              {t("Draw")}
            </button>
          </div>
          <div>
            {activeTab === 1 && (
              <div className="border-1 rounded-lg border-gray-500 w-full">
                <img src={cursiveSignatureImage} className="w-full h-40"></img>
              </div>
            )}
          </div>
        </div>
        {activeTab === 2 && (
          <div className="flex flex-col items-center">
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 400,
                height: 200,
                className: "sigCanvas",
                style: {
                  border: "1px solid #000",
                  backgroundColor: "#9ca3af",
                  borderRadius: "10px",
                },
              }}
              ref={signatureRef}
            />

            {/* Buttons to handle the save and clear methods */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                style={{
                  background: "#e74c3c",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={handleClear}
              >
                {t("Clear")}
              </button>
              <button
                type="button"
                style={{
                  background: "#2ecc71",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleSignatureSave}
              >
                {t("Save")}
              </button>
            </div>
            {/* <button className="bg-yellow-400 font-bold text-black py-2 rounded-lg px-4" onClick={()=>setSignatureModal(!signatureModal)}>Add Signature</button> */}
            {drawnSignature && (
              <div className="border-1 rounded-lg border-gray-500 w-1/4 flex justify-center">
                <img src={drawnSignature} className="w-full h-20"></img>
              </div>
            )}
          </div>
        )}
        {activeTab === 1 && (
          <div id="cursiveSignature">
            <p
              className="selector"
              style={{ fontFamily: "Blacksword", fontSize: "18px" }}
            >
              {fullName}
            </p>
          </div>
        )}
        <p className=" text-xs">
          {t(
            "By selecting Adopt and initial, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legally binding contracts-just the same as a pen-and-paper signature or initial"
          )}
        </p>
        <div className="flex justify-end w-full">
          <button
            className="bg-yellow-400 font-bold p-2 rounded-md hover:scale-105 ease-in-out duration-300"
            onClick={handleAdopt}
          >
            {t("Adopt and Initial")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientInitialsModal;
