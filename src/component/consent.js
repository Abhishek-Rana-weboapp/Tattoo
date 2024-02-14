import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import ProgressBar from "./ProgressBar";
import ConsentFormLayout from "./Layout/FormLayout";
import { useTranslation } from "react-i18next";
import SignatureModal from "./modal/SignatureModal";
import html2canvas from "html2canvas";

import ClientInitialsModal from "./modal/ClientInitialsModal";
import GaurdianInitialsModal from "./modal/GaurdianInitialsModal";

function ConsentForm() {
  const { t } = useTranslation();
  var progressValue = 5;
  const [progressValue_, setprogressValue_] = useState(1);
  const [fullName, setFullName] = useState(
    `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem(
      "lastname"
    )}`
  );
  const [drawnSignature, setDrawnSignature] = useState();
  const [drawnGaurdianSignature, setDrawnGaurdianSignature] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const [gaurdianActiveTab, setGaurdianActiveTab] = useState(1);
  const storedGaurdianInitials = sessionStorage.getItem("gaurdianInitials");


  const navigate = useNavigate();
  const {
    initials,
    setInitials,
    alert,
    setAlert,
    setAlertMessage,
    setSignature,
    setGaurdianSignature,
    gaurdianInitials,
    setGaurdianInitials,
  } = React.useContext(UserContext);
  const inputRef = useRef();

  // const [signatureRef, setSignatureRef] = useState();
  const [cursiveSignatureImage, setCursiveSignatureImage] = useState("");
  const [cursiveGaurdianSignatureImage, setCursiveGaurdianSignatureImage] =
    useState("");
  const [storedInitials, setStoredInitials] = useState(
    sessionStorage.getItem("initials")
  );
  const [clientInitialsModalOpen, setClientInitialsModalOpen] = useState(true);
  const [gaurdianInitialsModalOpen, setGaurdianInitialsModalOpen] =
    useState(false);

  const minor = sessionStorage.getItem("minor");

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

  const handleCheckbox = (page, e) => {
    // setChecked({ ...checked, [page]: e.target.checked });
    if (e.target.checked === true) {
      setInitials({ ...initials, [page]: storedInitials });
    } else {
      setInitials({ ...initials, [page]: "" });
    }
  };

  const handleGaurdianCheckbox = (page, e)=>{
    if (e.target.checked === true) {
      setGaurdianInitials({ ...initials, [page]: storedGaurdianInitials });
    } else {
      setGaurdianInitials({ ...initials, [page]: "" });
    }
  }

  useEffect(() => {
    const handleCursive = async () => {
      const cursiveSignatureImage = await captureCursiveSignature();
      setCursiveSignatureImage(cursiveSignatureImage);
    };
    handleCursive();
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages && currentPage !== 13) {
      // Check if the initials for the current page have been filled
      if (minor === "true") {
        if(!initials[currentPage] || !gaurdianInitials[currentPage]){
          setAlert(!alert);
          setAlertMessage(t("Please provide your initials"));
          return
        }else{
          setprogressValue_(progressValue_ + 1);
          setCurrentPage(currentPage + 1);
          return
        }
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


  const handleAdopt = () => {
    if (activeTab === 1) {
      if (cursiveSignatureImage) {
        setSignature(cursiveSignatureImage);
        if (minor === "true") {
          setClientInitialsModalOpen(false);
          setGaurdianInitialsModalOpen(true);
          return;
        } else {
          setClientInitialsModalOpen(false);
          return;
        }
      }
    }
    if (activeTab === 2) {
      if (drawnSignature) {
        setSignature(drawnSignature);
        if (minor) {
          setClientInitialsModalOpen(false);
          setGaurdianInitialsModalOpen(true);
          return;
        } else {
          setClientInitialsModalOpen(false);
          return;
        }
      }
    }
  };

  const handleGaurdianAdopt = () => {
    if (gaurdianActiveTab === 1) {
      if (cursiveGaurdianSignatureImage) {
        setGaurdianSignature(cursiveGaurdianSignatureImage);
        setGaurdianInitialsModalOpen(false);
        return
      }
    }
    if (gaurdianActiveTab === 2) {
      if (drawnSignature) {
        setGaurdianSignature(drawnSignature);
        setGaurdianInitialsModalOpen(false);
        if (minor) {
          return;
        } else {
          setClientInitialsModalOpen(false);
          return;
        }
      }
    }
  };

  const captureCursiveSignature = async () => {
    // Use html2canvas to capture the cursive signature as an image
    const cursiveSignatureCanvas = await html2canvas(
      document.getElementById("cursiveSignature"),
      {
        scale: 3, // Increase the scale for higher resolution
        logging: false, // Disable logging to console
        useCORS: true, // Enable cross-origin resource sharing
        allowTaint: true, // Allow tainting of the canvas (useful if the content includes images from other domains)
        backgroundColor: null, // Set background color to null to capture transparency
      }
    );
    // Convert the canvas to a base64-encoded image
    return cursiveSignatureCanvas.toDataURL();
  };

  return (
    <>
      {
        //Modal for confirming initials and signature
        clientInitialsModalOpen && (
          <ClientInitialsModal
            cursiveSignatureImage={cursiveSignatureImage}
            setCursiveSignatureImage={setCursiveSignatureImage}
            handleAdopt={handleAdopt}
            storedInitials={storedInitials}
            activeTab={activeTab}
            fullName={fullName}
            setActiveTab={setActiveTab}
            drawnSignature={drawnSignature}
            setDrawnSignature={setDrawnSignature}
          />
        )
      }
      {gaurdianInitialsModalOpen && (
        <GaurdianInitialsModal
          setGaurdianActiveTab={setGaurdianActiveTab}
          gaurdianActiveTab={gaurdianActiveTab}
          gaurdianInitials={storedGaurdianInitials}
          cursiveGaurdianSignatureImage={cursiveGaurdianSignatureImage}
          setCursiveGaurdianSignatureImage={setCursiveGaurdianSignatureImage}
          handleGaurdianAdopt={handleGaurdianAdopt}
          drawnGaurdianSignature ={drawnGaurdianSignature}
          setDrawnGaurdianSignature = {setDrawnGaurdianSignature}
        />
      )}
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

        {/* Clients Section */}
        <div className="flex md:flex-col justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <input
              type="checkbox"
              className=" w-6 h-6"
              checked={initials[currentPage]}
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
              readOnly
              className="bg-gray-700 text-white p-2 rounded-md font-bold Blacksword"
            />
          </div>
        </div>


        {/* gaurdians section */}
        {minor === "true" && <div className="flex md:flex-col justify-center gap-2">
          <div className="flex gap-2 items-center justify-center">
            <input
              type="checkbox"
              className=" w-6 h-6"
              checked={gaurdianInitials[currentPage]}
              onChange={(e) => handleGaurdianCheckbox(currentPage, e)}
            ></input>
            <label className=" text-white">
              {t("Select to add Gaurdian's initials")}
            </label>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <label className=" text-white md:block hidden">
              {t("Initials")}:{" "}
            </label>
            <input
              ref={inputRef}
              type="text"
              value={gaurdianInitials[currentPage]}
              readOnly
              className="bg-gray-700 text-white p-2 rounded-md font-bold Blacksword"
            />
          </div>
        </div>}


        <div className="w-full h-10 ">
          <ProgressBar progress={progressValue_} count={13} />
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={prevPage}
          >
            {t("Prev")}
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
