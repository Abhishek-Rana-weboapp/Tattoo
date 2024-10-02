import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProgressBar from "./ProgressBar";
import ConsentFormLayout from "./Layout/FormLayout";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import ClientInitialsModal from "./modal/ClientInitialsModal";
import GaurdianInitialsModal from "./modal/GaurdianInitialsModal";
import { questions, minorQuestions } from "../data/ConsentQuestions";

function ConsentForm() {
  const { t } = useTranslation();
  const importQuestions = questions;
  const importMinorQuestions = minorQuestions;
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
    harmlessagreement,
    setGaurdianInitialsImg,
    setInitialsImg
  } = React.useContext(UserContext);
  const inputRef = useRef();


  // const [signatureRef, setSignatureRef] = useState();
  const [cursiveSignatureImage, setCursiveSignatureImage] = useState("");
  const [cursiveGaurdianSignatureImage, setCursiveGaurdianSignatureImage] =
    useState("");
  const [storedInitials, setStoredInitials] = useState(
    sessionStorage.getItem("initials")
  );
  const [cursiveInitialsImage, setCursiveInitialsImage] = useState("");
  const [cursiveGaurdianInitialsImage, setCursiveGaurdianInitialsImage] =
    useState("");
  const [clientInitialsModalOpen, setClientInitialsModalOpen] = useState(true);
  const [gaurdianInitialsModalOpen, setGaurdianInitialsModalOpen] =
    useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const minor = sessionStorage.getItem("minor");
  const typeofservice = sessionStorage.getItem("typeofservice");
  const [currentPage, setCurrentPage] = useState(1);
  const [statements, setStatements] = useState([]);


  useEffect(() => {
    inputRef?.current?.focus();
    if (minor === "false" && currentPage > Object.keys(initials).length) {
      setInitials({ ...initials, [currentPage]: "" });
    } else if (currentPage > Object.keys(initials).length) {
      setInitials({ ...initials, [currentPage]: "" });
      setGaurdianInitials({ ...gaurdianInitials, [currentPage]: "" });
    }
  }, [currentPage]);

  const handleCheckbox = (page, e) => {
    if (e.target.checked === true) {
      setInitials({ ...initials, [page]: storedInitials });
    } else {
      setInitials({ ...initials, [page]: "" });
    }
  };

  const handleGaurdianCheckbox = (page, e) => {
    if (e.target.checked === true) {
      setGaurdianInitials({
        ...gaurdianInitials,
        [page]: storedGaurdianInitials,
      });
    } else {
      setGaurdianInitials({ ...gaurdianInitials, [page]: "" });
    }
  };

  useEffect(() => {
    const handleCursive = async () => {
      const cursiveSignatureImage = await captureCursiveSignature(
        "cursiveSignature"
      );
      setCursiveSignatureImage(cursiveSignatureImage);
      const cursiveInitialsImage = await captureCursiveSignature(
        "cursiveinitials"
      );
      setCursiveInitialsImage(cursiveInitialsImage);
      setInitialsImg(cursiveInitialsImage)
    };
    handleCursive();
    if (minor === "true") {
      typeofservice
        ? typeofservice === "removal"
          ? setStatements(importMinorQuestions.tattooRemovalQuestions)
          : typeofservice === "piercing"
          ? setStatements(importMinorQuestions.piercingQuestions)
          : typeofservice === "tooth-gems"
          ? setStatements(importMinorQuestions.toothGemQuestions)
          : setStatements(importMinorQuestions.tattooQuestions)
        : setStatements(importMinorQuestions.tattooQuestions);
    } else {
      typeofservice
        ? typeofservice === "removal"
          ? setStatements(importQuestions.tattooRemovalQuestions)
          : typeofservice === "piercing"
          ? setStatements(importQuestions.piercingQuestions)
          : typeofservice === "tooth-gems"
          ? setStatements(importQuestions.toothGemQuestions)
          : setStatements(importQuestions.tattooQuestions)
        : setStatements(importQuestions.tattooQuestions);
    }
  }, []);

  useEffect(() => {
    if (statements?.length > 0) {
      setTotalPages(statements?.length);
    }
  }, [statements]);


  const nextPage = () => {
    if (currentPage < totalPages && currentPage !== statements.length) {
      // Check if the initials for the current page have been filled
      if (minor === "true") {
        if (!initials[currentPage] || !gaurdianInitials[currentPage]) {
          setAlert(!alert);
          setAlertMessage(t("Please provide your initials"));
          return;
        } else {
          setprogressValue_(progressValue_ + 1);
          setCurrentPage(currentPage + 1);
          return;
        }
      } else {
        if (!initials[currentPage]) {
          setAlert(!alert);
          setAlertMessage(t("Please provide your initials"));
          return;
        }
        setprogressValue_(progressValue_ + 1);
        setCurrentPage(currentPage + 1);
      }
    } else if (currentPage === statements.length) {
      if (minor === "true") {
        if (!initials[currentPage] || !gaurdianInitials[currentPage]) {
          setAlert(!alert);
          setAlertMessage(t("Please provide your initials"));
          return;
        } else {
          navigate("/harmless-agreement");
        }
      } else {
        if (!initials[currentPage]) {
          setAlert(!alert);
          setAlertMessage(t("Please provide your initials"));
          return;
        }
        navigate("/harmless-agreement");
      }
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
  };

  const handleGaurdianAdopt = () => {
    if (gaurdianActiveTab === 1) {
      if (cursiveGaurdianSignatureImage) {
        setGaurdianSignature(cursiveGaurdianSignatureImage);
        setGaurdianInitialsModalOpen(false);
        setGaurdianInitialsImg(cursiveGaurdianInitialsImage)
        // setharmlessagreement({...harmlessagreement , gaurdianInitialsImg : cursiveGaurdianInitialsImage})
        return;
      }
    }
    if (gaurdianActiveTab === 2) {
      if (drawnGaurdianSignature) {
        setGaurdianSignature(drawnGaurdianSignature);
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

  const captureCursiveSignature = async (id) => {
    // Use html2canvas to capture the cursive signature as an image
    const cursiveSignatureCanvas = await html2canvas(
      document.getElementById(id),
      {
        scale: 3, // Increase the scale for higher resolution
        backgroundColor: null, // Set background color to null to capture transparency
        logging: false, // Disable logging to console
        useCORS: true, // Enable cross-origin resource sharing
        allowTaint: true, // Allow tainting of the canvas (useful if the content includes images from other domains)
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
            setCursiveInitialsImage={setCursiveInitialsImage}
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
          drawnGaurdianSignature={drawnGaurdianSignature}
          setDrawnGaurdianSignature={setDrawnGaurdianSignature}
          setCursiveGaurdianInitialsImage={setCursiveGaurdianInitialsImage}
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
            {statements && t(statements[currentPage - 1])}
          </p>
        </div>

        {/* Clients Section */}
        <div className="md:w-3/4 w-full px-4 mx-auto flex justify-between items-center">
          <label className=" text-white md:text-base text-sm flex gap-2 items-center select-none cursor-pointer">
            <input
              type="checkbox"
              className=" w-6 h-6"
              checked={initials[currentPage]}
              onChange={(e) => handleCheckbox(currentPage, e)}
            ></input>
              {t("Select to add your initials")}
            </label>
            <input
              ref={inputRef}
              type="text"
              value={initials[currentPage]}
              disabled
              className="bg-gray-700 w-24 text-white p-2 rounded-md font-bold Blacksword"
            />
        </div>

        {/* gaurdians section */}
        {minor === "true" && (
          <div className="md:w-3/4 w-full px-4 mx-auto flex justify-between items-center">
            <div className="flex gap-2 items-center justify-start w-3/5 md:w-80">
              <label className=" text-white md:text-base text-sm flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                className=" w-6 h-6"
                checked={gaurdianInitials[currentPage]}
                onChange={(e) => handleGaurdianCheckbox(currentPage, e)}
              ></input>
                {t("Select to add Gaurdian's initials")}
              </label>
            </div>
              <input
                ref={inputRef}
                type="text"
                value={gaurdianInitials[currentPage]}
                readOnly
                className="bg-gray-700 text-white p-2 w-24 rounded-md font-bold Blacksword"
              />
          </div>
        )}

        <div className="w-full h-10 ">
          <ProgressBar progress={progressValue_} count={statements?.length} />
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
            onClick={prevPage}
          >
            {t("Back")}
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
