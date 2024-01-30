import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import ProgressBar from "./ProgressBar";
import ConsentFormLayout from "./Layout/FormLayout";
import { useTranslation } from "react-i18next";
import SignatureModal from "./modal/SignatureModal";
import html2canvas from "html2canvas";
import SignatureCanvas from "react-signature-canvas"

function ConsentForm() {
  const { t } = useTranslation();
  var progressValue = 5;
  const [progressValue_, setprogressValue_] = useState(1);

  const navigate = useNavigate();
  const {
    initials,
    setInitials,
    alert,
    setAlert,
    setAlertMessage,
    harmlessagreement,
    setharmlessagreement,
    checked,
    setChecked,
    signature,
    setSignature,
  } = React.useContext(UserContext);
  const inputRef = useRef();
  const [fullName, setFullName] = useState(
    `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem(
      "lastname"
    )}`
  );
  const [storedInitials, setStoredInitials] = useState(
    sessionStorage.getItem("initials")
  );
  const [initialsModal, setInitiallsModal] = useState(true);
  const [isChanged, setIsChanged] = useState();
  const [signatureModal, setSignatureModal] = useState(false);
  // const [signatureRef, setSignatureRef] = useState();
  const [activeTab , setActiveTab] = useState(1)
  const [drawnSignature, setDrawnSignature] = useState()
  const [cursiveSignatureImage, setCursiveSignatureImage] = useState('');
  const signatureRef = useRef()

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 13;
  const statements = [
    "I am at least 18 years of age.",
    "I do not have any mental or medical impairment that could affect my well-being because of my decision to get a tattoo.",
    "I agree to follow instructions concerning the care of my tattoo. Any tattoo touch-ups will be done at my own expense.",
    "I understand that colors may vary depending on skin tone. I understand that the finished tattoo may look different from the original design.",
    "I, being of sound mind and body, I hereby release any and all employees, contractors, agents, or persons representing Fame Tattoos, Inc. from all responsibility. I agree not to sue Fame Tattoos, Inc. or its heirs or assigns in connection with any and all damages, claims, demands, rights, and causes of action of whatever kind or nature, based upon injuries, property damages, or death of myself or any other persons arising from my decisions to have any tattoo related work at this time, whether or not caused by any negligence of Fame Tattoos, Inc. and its heirs and employees.",
    "I agree for myself, my heirs, assigns and legal representatives to hold harmless from all damages, actions, causes of action, claim judgments, costs of litigations, Attorney fees, and all other costs and expenses which might arise from my decision to have any tattoo work done by Fame Tattoos, Inc. and its heirs and employees.",
    "I agree to pay for any and all damages and injuries to any persons and property belonging to Fame Tattoos, Inc. or any other person to whom they may become liable contractually or by operation of law, caused by or resulting from my decision to have any tattoo done",
    "I acknowledge that obtaining this tattoo is my choice alone and will result in a permanent change to my appearance and that no representation has been made to me as to the ability to later restore the skin involved in this tattoo to its prior condition",
    "I have been advised that all tattoos will be permanent and that it can only be removed with a surgical procedure, and that any effective removal will leave permanent scarring and disfigurement. This cautionary notice is required to be provided to me by the health department and I hereby acknowledge receipt of this formal notice",
    "I hereby grant irrevocable consent to and authorize the use of any reproduction by Fame Tattoos, Inc. Any and all photographs and/or video which are taken this day of me, negative or positive proof which will be hereby attached for any purposes whatsoever, without further compensation to me. All negatives, together with the prints, video, or live internet stream shall become and remain the property of Fame Tattoos, Inc., solely and completely",
    "I acknowledge infection is always possible as a result of obtaining a tattoo. I have been provided with information describing the tattoo procedure to be performed and instructions on aftercare. I have been made aware that if I have any signs or symptoms of infection, such as swelling, pain, redness, warmth, fever, unusual discharge, or odor to contact my physician. Additionally, I take full responsibility for the care of my new tattoo and/or piercing site, following the provided instructions given verbally, via text message, email, or on WWW.FAMETATTOOS.COM",
    "I hereby consent to receive text messages and emails from Fame Tattoos, Inc., for transactional, informational, and promotional purposes. I understand that standard message and data rates may apply for SMS messages, and I acknowledge that I'm responsible for any such charges incurred",
    "I swear, affirm, and agree that all the above information is true and correct and that I understand it.",
  ];

  

  useEffect(() => {
    inputRef?.current?.focus();
  }, [currentPage]);

  const handleInitialsChange = (page, initialsValue) => {
    setInitials({ ...initials, [page]: storedInitials });
  };

  const handleSignatureSave = ()=>{
      if(signatureRef?.current?.isEmpty()){
        setAlertMessage(t("Please add your signature"))
        setAlert(!alert)
      }else{
        const dataUrl = signatureRef?.current?.toDataURL();
        setDrawnSignature(dataUrl)
      }
    };
  
  const handleCheckbox = (page, e) => {
    setChecked({ ...checked, [page]: e.target.checked });
    if (e.target.checked === true) {
      setInitials({ ...initials, [page]: storedInitials });
    } else {
      setInitials({ ...initials, [page]: "" });
    }
  };

  useEffect(()=>{
    const handleCursive = async()=>{
      const cursiveSignatureImage = await captureCursiveSignature();
      setCursiveSignatureImage(cursiveSignatureImage);
    }
    handleCursive()
  },[])

  const nextPage = () => {
    if (currentPage < totalPages && currentPage !== 13) {
      // Check if the initials for the current page have been filled
      if (!initials[currentPage]) {
        setAlert(!alert);
        setAlertMessage(t("Please provide your initials"));
      } else {
        setprogressValue_(progressValue_ + 1);
        setCurrentPage(currentPage + 1);
      }
    } else if (currentPage === 13) {
      navigate("/harmless-agreement");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setprogressValue_(progressValue_ - 1);
      setCurrentPage(currentPage - 1);
    }
    if (currentPage === 1) navigate(-1);
  };
  
  const handleAdopt = async() => {
    if(activeTab === 1){
      if(cursiveSignatureImage){
        setSignature(cursiveSignatureImage)
        setInitiallsModal(!initialsModal);
        setharmlessagreement({ ...harmlessagreement, name: fullName });
      }
    }
    if(activeTab === 2){
      if(drawnSignature){
        setSignature(drawnSignature)
        setharmlessagreement({ ...harmlessagreement, name: fullName });
        setInitiallsModal(!initialsModal);
      }
    }
  };

  const handleClear = ()=>{
    signatureRef?.current?.clear();
  }

  
  const captureCursiveSignature = async () => {
    // Use html2canvas to capture the cursive signature as an image
    const cursiveSignatureCanvas = await html2canvas(document.getElementById('cursiveSignature'), {
      scale: 3, // Increase the scale for higher resolution
      logging: false, // Disable logging to console
      useCORS: true, // Enable cross-origin resource sharing
      allowTaint: true, // Allow tainting of the canvas (useful if the content includes images from other domains)
      backgroundColor: null, // Set background color to null to capture transparency
    });
    // Convert the canvas to a base64-encoded image
    return cursiveSignatureCanvas.toDataURL();
  };

  return (
    <>
        {signatureModal && (
          <div>
          {/* <SignatureModal
            setSignatureRef={setSignatureRef}
            handleSave={handleSignatureSave}
            handleClear={handleClear}
            showPopup={signatureModal}
            setShowPopup={setSignatureModal}
          /> */}
      </div>
        )}
      {
        //Modal for confirming initials and signature
        initialsModal && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg">
              <h1>Adopt Your Initials and Signature</h1>
              <label className="font-bold">
                Confirm Your Name and Initials
              </label>
              <div className="flex items-center gap-2 w-3/4">
                <div className="flex flex-col text-start w-3/4">
                  <label className="font-bold">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="p-1 border-gray-400 border-1 rounded-lg font-bold"
                    value={fullName}
                  ></input>
                </div>
                <div className="flex flex-col text-start w-1/4">
                  <label className="font-bold">
                    Initials<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="p-1 border-gray-400 border-1 rounded-lg font-bold"
                    value={storedInitials}
                  ></input> 
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <button className={`bg-none font-semibold text-black hover:bg-gray-300 ${activeTab === 1 && "bg-gray-300"} p-2 rounded-lg`} onClick={()=>setActiveTab(1)}>Written</button>
                  <button className={`bg-none font-semibold text-black hover:bg-gray-300 ${activeTab === 2 && "bg-gray-300"} p-2 rounded-lg`} onClick={()=>setActiveTab(2)}>Draw</button>
                </div>
                <div>
                  {
                    activeTab === 1 && 
                 <div className="border-1 rounded-lg border-gray-500 w-full"> 
                    <img src={cursiveSignatureImage} className="w-full h-40"></img>
                    </div>
                  }
                </div>
              </div>
                { activeTab === 2 &&
                <div className="flex flex-col items-center">
                  <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 400,
                  height:200,
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
                    {drawnSignature && <div className="border-1 rounded-lg border-gray-500 w-1/4 flex justify-center"> 
                    <img src={drawnSignature} className="w-full h-20"></img>
                    </div>
                  }
                  </div>
                }
                {activeTab === 1 && <div id="cursiveSignature">
                  <p className="selector" style={{ fontFamily: 'Blacksword', fontSize: '18px'} }>{fullName}</p>
                </div>}
              <p className=" text-xs">
                {t(
                  "By selecting Adopt and initial, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legally binding contracts-just the same as a pen-and-paper signature or initial"
                )}
              </p>
              <div className="flex justify-between w-full">
                <button className="bg-yellow-400 font-bold p-2 rounded-md hover:scale-105 ease-in-out duration-300">
                  Cancel
                </button>
                <button
                  className="bg-yellow-400 font-bold p-2 rounded-md hover:scale-105 ease-in-out duration-300"
                  onClick={handleAdopt}
                >
                  Adopt and Initial
                </button>
              </div>
            </div>
          </div>
        )
      }
      <ConsentFormLayout
        progressValue={progressValue}
        progressValue_={progressValue_}
        progressValue_count_={13}
        title="Consent form"
      >
        <div className="flex flex-col flex-1 items-center overflow-y-auto p-3 md:p-1 scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded">
          <p className="text-white text-lg md:text-2xl font-semibold text-center">
            {t(statements[currentPage - 1])}
          </p>
        </div>
        <div className="flex md:flex-col justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <input
              type="checkbox"
              className=" w-6 h-6"
              checked={checked[currentPage]}
              onChange={(e) => handleCheckbox(currentPage, e)}
            ></input>
            <label className=" text-white">
              {t("Select to add your initials")}
            </label>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <label className=" text-white md:block hidden">
              {t("Initials")}:{" "}
            </label>
            <input
              ref={inputRef}
              type="text"
              value={initials[currentPage]}
              // onChange={(e) => handleInitialsChange(currentPage, e.target.value)}
              disabled
              className="bg-gray-700 text-white p-2 rounded-md font-bold"
            />
          </div>
        </div>
        <div className="w-full h-10 ">
          <ProgressBar progress={progressValue_} count={13} />
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={prevPage}
          >
            {t("Previous")}
          </button>
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={nextPage}
          >
            {t("Next")}
          </button>
        </div>
      </ConsentFormLayout>
    </>
  );
}

export default ConsentForm;
