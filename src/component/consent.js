import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import ConsentFormLayout from "./Layout/FormLayout";
import { questions, minorQuestions } from "../data/ConsentQuestions";
import { useAppointmentContext } from "../context/AppointmentContext";
import { useAuthContext } from "../context/AuthContext";
import Modal from "./modal/Modal";
import TranslationWrapper from "./Layout/TranslationWrapper";
import ImageGenerator from "./imageCreater/ImageGenerator";
import ImageWriterGenerator from "./imageCreater/ImageWriterGenerator";
import Button from "./buttons/Button";
import axiosInstance from "../config/axios";
import toast from "react-hot-toast";

function ConsentForm() {
  //  new code
  const navigate = useNavigate();

  const { appointmentData, setAppointmentData } = useAppointmentContext();
  const { guardianInitials, guardianfullName, fullName, initials, user } =
    useAuthContext();
    
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [imageBlob, setImageBlob] = useState(null);
  const [step, setStep] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Step navigation state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statements, setStatements] = useState([]);
  const [initialsPerPage, setInitialsPerPage] = useState({}); // page: initials
  const [guardianInitialsPerPage, setGuardianInitialsPerPage] = useState({}); // page: initials

  const handleCheckbox = (e,page) => {
    const checked = e.target.checked;
    if(e.target.name === "initials") {
    setInitialsPerPage((prev) => ({
      ...prev,
      [page]: checked ?  initials : "",
    }));
  }
    if(e.target.name === "guardianInitials") {
    setGuardianInitialsPerPage((prev) => ({
      ...prev,
      [page]: checked ? guardianInitials : "",
    }));
  }
};

  const uploadImage = async(imageBlob) =>{
    try {
      const formData = new FormData();
      formData.append("profiles", imageBlob);
      const response = await axiosInstance.post("upload", formData);
      if (response.status === 200) {
        return response.data.profile_urls[0];
      }
      throw new Error("Image upload failed");
      
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  }

  const nextPage = () => {
    if (!initialsPerPage[currentPage]) {
      toast.error("Please provide your initials");
      return;
    }
    if(user.minor && !guardianInitialsPerPage[currentPage]){
      toast.error("Please provide guardian's initials");
      return;
    }
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setAppointmentData(prev => ({
        ...prev,
        consentForm:"agreed",
      })
      )
      navigate("/harmless-agreement");
      return
      // Done, maybe submit or close
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      return;
    }
    if (currentPage === 1) {
      navigate(-1);
      return;
    }
  };

const handleInitialsAdopt = async () => {
  if (!imageBlob) return;

  setUploadingImage(true);
  try {
    const profileUrl = await uploadImage(imageBlob);

    if (step === 1) {
      setAppointmentData((prev) => ({
        ...prev,
        initials,
        signatureImage: profileUrl,
      }));
      if (user.minor) {
        setStep(2);
        return;
      }
    } else if (step === 2) {
      setAppointmentData((prev) => ({
        ...prev,
        guardianInitials: guardianInitials,
        guardianSignatureImage: profileUrl,
      }));
    }
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Failed to upload image. Please try again.");
  } finally {
    setUploadingImage(false);
  }
};


useEffect(() => {
  if (appointmentData) {
    setStatements(questions[appointmentData.typeofservice] || []);
    setTotalPages(questions[appointmentData.typeofservice]?.length || 0);

    // Auto-fill initials if consent is already agreed
    if (appointmentData.consentForm === "agreed") {
      // Fill client initials for all pages
      const filledInitials = {};
      for (let i = 1; i <= (questions[appointmentData.typeofservice]?.length || 0); i++) {
        filledInitials[i] = appointmentData.initials || appointmentData.clientInitials || "";
      }
      setInitialsPerPage(filledInitials);

      // Fill guardian initials for all pages if minor
      if (user.minor) {
        const filledGuardianInitials = {};
        for (let i = 1; i <= (questions[appointmentData.typeofservice]?.length || 0); i++) {
          filledGuardianInitials[i] = appointmentData.guardianInitials || "";
        }
        setGuardianInitialsPerPage(filledGuardianInitials);
      }
    }
  }
}, [appointmentData, user.minor]);

  return (
    <>
      {isModalOpen && (
        <Modal>
          <div className="w-full h-[70vh] flex flex-col p-2 overflow-y-auto justify-between">
            <div>
              <h2 className="md:text-xl font-bold text-center">
                Adopt your Initials and Signature
              </h2>
              <h2 className="md:text-xl  text-center font-semibold mt-3">
                {step === 1
                  ? "Confirm Your Name and Initials"
                  : "Confirm Guardian's Name and Initials"}
              </h2>
              <div className="flex max-md:flex-col md:items-center items-start justify-between md:gap-10 overflow-hidden">
                <div className="flex flex-col text-start w-3/4 gap-2">
                  <label className="font-bold">
                    <TranslationWrapper
                      text={step === 1 ? "Full Name" : "Guardian's Full Name"}
                    />
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="p-1 border-gray-300 border-1 border rounded-lg "
                    value={step === 1 ? fullName : guardianfullName}
                  ></input>
                </div>
                <div className="flex flex-col gap-2 1/4">
                  <label className="font-bold w-max">
                    <TranslationWrapper text={"Initials"} />
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-20 border-gray-300 border-1 border rounded-lg p-1  Blacksword"
                    value={step === 1 ? initials : guardianInitials}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full mt-3 justify-center ">
                <button
                  className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                    activeTab === 1 && "bg-gray-300"
                  } p-2 rounded-lg`}
                  onClick={() => setActiveTab(1)}
                >
                  <TranslationWrapper text={"Written"} />
                </button>
                <button
                  className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                    activeTab === 2 && "bg-gray-300"
                  } p-2 rounded-lg`}
                  onClick={() => setActiveTab(2)}
                >
                  <TranslationWrapper text={"Draw"} />
                </button>
              </div>
              <div className="mt-3">
                <h3 className="text-center font-semibold -mb-2">Signature</h3>
                {activeTab === 1 && (
                  <div>
                    <ImageGenerator
                      text={step === 1 ? fullName : guardianfullName}
                      setImageBlob={setImageBlob}
                      imageBlob={imageBlob}
                    />
                  </div>
                )}
                {activeTab === 2 && <ImageWriterGenerator />}
              </div>
            </div>
            <div>
              <p className=" text-xs mt-4">
                <TranslationWrapper
                  text={
                    "By selecting Adopt and initial, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legally binding contracts-just the same as a pen-and-paper signature or initial"
                  }
                />
              </p>

              <div className="flex justify-center gap-2">
                {step === 2 && (
                  <Button
                    disabled={uploadingImage}
                    onClick={() => setStep(1)}
                    className="mt-4 shadow"
                  >
                    <TranslationWrapper text={"Back"} />
                  </Button>
                )}
                <Button
                  disabled={uploadingImage}
                  onClick={handleInitialsAdopt}
                  className="mt-4 shadow"
                >
                  <TranslationWrapper text={"Adopt & Initial"} />
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <ConsentFormLayout
        progressValue={currentPage}
        progressValue_={currentPage}
        progressValue_count_={totalPages}
        title="Consent form"
      >
        <div className="flex flex-col flex-1 items-center overflow-y-auto p-3 md:p-1">
          <p className="text-white text-lg md:text-2xl font-semibold text-center">
            <TranslationWrapper text={statements[currentPage - 1]} />
          </p>
        </div>
        <div className="max-w-2xl w-full px-4 mx-auto flex justify-between items-center">
          <label className="text-white md:text-base text-sm flex gap-2 items-center select-none cursor-pointer">
            <input
              type="checkbox"
              className="w-6 h-6"
              name="initials"
              checked={!!initialsPerPage[currentPage]}
              onChange={(e) => handleCheckbox(e,currentPage)}
            />
            <TranslationWrapper text={"Select to add your initials"} />
          </label>
          <input
            type="text"
            value={initialsPerPage[currentPage] || ""}
            disabled
            className="bg-gray-700 w-24 text-white p-2 rounded-md font-bold Blacksword"
          />
        </div>
        {user.minor && <div className="max-w-2xl w-full px-4 mx-auto flex justify-between items-center">
          <label className="text-white md:text-base text-sm flex gap-2 items-center select-none cursor-pointer">
            <input
              type="checkbox"
              className="w-6 h-6"
              name="guardianInitials"
              checked={!!guardianInitialsPerPage[currentPage]}
              onChange={(e) => handleCheckbox(e ,currentPage)}
            />
            <TranslationWrapper text={"Select to add guardian initials"} />
          </label>
          <input
            type="text"
            value={guardianInitialsPerPage[currentPage] || ""}
            disabled
            className="bg-gray-700 w-24 text-white p-2 rounded-md font-bold Blacksword"
          />
        </div>}
        <div className="w-full h-10 ">
          <ProgressBar progress={currentPage} count={totalPages} />
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold mb-2 mr-2"
            onClick={prevPage}
          >
            <TranslationWrapper text={"Back"} />
          </button>
          <button
            className="yellowButton py-2 px-4 rounded-3xl font-bold mb-2 mr-2"
            onClick={nextPage}
          >
            <TranslationWrapper text={"Next"} />
          </button>
        </div>
      </ConsentFormLayout>
    </>
  );
}

export default ConsentForm;

// import { useContext, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/UserContext";
// import ProgressBar from "./ProgressBar";
// import ConsentFormLayout from "./Layout/FormLayout";
// import { useTranslation } from "react-i18next";
// import html2canvas from "html2canvas";
// import ClientInitialsModal from "./modal/ClientInitialsModal";
// import GuardianInitialsModal from "./modal/GuardianInitialsModal";
// import { questions, minorQuestions } from "../data/ConsentQuestions";

// function ConsentForm() {
//   const { t } = useTranslation();
//   const importQuestions = questions;
//   const importMinorQuestions = minorQuestions;
//   var progressValue = 5;
//   const [progressValue_, setprogressValue_] = useState(1);
//   const [fullName, setFullName] = useState(
//     `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem(
//       "lastname"
//     )}`
//   );
//   const [drawnSignature, setDrawnSignature] = useState();
//   const [drawnGuardianSignature, setDrawnGuardianSignature] = useState();
//   const [activeTab, setActiveTab] = useState(1);
//   const [guardianActiveTab, setGuardianActiveTab] = useState(1);
//   const storedGuardianInitials = sessionStorage.getItem("guardianInitials");

//   const navigate = useNavigate();
//   const {
//     initials,
//     setInitials,
//     alert,
//     setAlert,
//     setAlertMessage,
//     setSignature,
//     setGuardianSignature,
//     guardianInitials,
//     setGuardianInitials,
//     harmlessagreement,
//     setGuardianInitialsImg,
//     setInitialsImg
//   } = useContext(UserContext);
//   const inputRef = useRef();

//   // const [signatureRef, setSignatureRef] = useState();
//   const [cursiveSignatureImage, setCursiveSignatureImage] = useState("");
//   const [cursiveGuardianSignatureImage, setCursiveGuardianSignatureImage] =
//     useState("");
//   const [storedInitials, setStoredInitials] = useState(
//     sessionStorage.getItem("initials")
//   );
//   const [cursiveInitialsImage, setCursiveInitialsImage] = useState("");
//   const [cursiveGuardianInitialsImage, setCursiveGuardianInitialsImage] =
//     useState("");
//   const [clientInitialsModalOpen, setClientInitialsModalOpen] = useState(true);
//   const [guardianInitialsModalOpen, setGuardianInitialsModalOpen] =
//     useState(false);
//   const [totalPages, setTotalPages] = useState(0);
//   const minor = sessionStorage.getItem("minor");
//   const typeofservice = sessionStorage.getItem("typeofservice");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statements, setStatements] = useState([]);

//   useEffect(() => {
//     if (minor === "false" && currentPage > Object.keys(initials).length) {
//       setInitials({ ...initials, [currentPage]: "" });
//     } else if (currentPage > Object.keys(initials).length) {
//       setInitials({ ...initials, [currentPage]: "" });
//       setGuardianInitials({ ...guardianInitials, [currentPage]: "" });
//     }
//   }, [currentPage]);

//   const handleCheckbox = (page, e) => {
//     if (e.target.checked === true) {
//       setInitials({ ...initials, [page]: storedInitials });
//     } else {
//       setInitials({ ...initials, [page]: "" });
//     }
//   };

//   const handleGuardianCheckbox = (page, e) => {
//     if (e.target.checked === true) {
//       setGuardianInitials({
//         ...guardianInitials,
//         [page]: storedGuardianInitials,
//       });
//     } else {
//       setGuardianInitials({ ...guardianInitials, [page]: "" });
//     }
//   };

//   useEffect(() => {
//     const handleCursive = async () => {
//       const cursiveSignatureImage = await captureCursiveSignature(
//         "cursiveSignature"
//       );
//       setCursiveSignatureImage(cursiveSignatureImage);
//       const cursiveInitialsImage = await captureCursiveSignature(
//         "cursiveinitials"
//       );
//       setCursiveInitialsImage(cursiveInitialsImage);
//       setInitialsImg(cursiveInitialsImage)
//     };
//     handleCursive();
//     if (minor === "true") {
//       typeofservice
//         ? typeofservice === "removal"
//           ? setStatements(importMinorQuestions.tattooRemovalQuestions)
//           : typeofservice === "piercing"
//           ? setStatements(importMinorQuestions.piercingQuestions)
//           : typeofservice === "tooth-gems"
//           ? setStatements(importMinorQuestions.toothGemQuestions)
//           : setStatements(importMinorQuestions.tattooQuestions)
//         : setStatements(importMinorQuestions.tattooQuestions);
//     } else {
//       typeofservice
//         ? typeofservice === "removal"
//           ? setStatements(importQuestions.tattooRemovalQuestions)
//           : typeofservice === "piercing"
//           ? setStatements(importQuestions.piercingQuestions)
//           : typeofservice === "tooth-gems"
//           ? setStatements(importQuestions.toothGemQuestions)
//           : setStatements(importQuestions.tattooQuestions)
//         : setStatements(importQuestions.tattooQuestions);
//     }
//   }, []);

//   useEffect(() => {
//     if (statements?.length > 0) {
//       setTotalPages(statements?.length);
//     }
//   }, [statements]);

//   const nextPage = () => {
//     if (currentPage < totalPages && currentPage !== statements.length) {
//       // Check if the initials for the current page have been filled
//       if (minor === "true") {
//         if (!initials[currentPage] || !guardianInitials[currentPage]) {
//           setAlert(!alert);
//           setAlertMessage(t("Please provide your initials"));
//           return;
//         } else {
//           setprogressValue_(progressValue_ + 1);
//           setCurrentPage(currentPage + 1);
//           return;
//         }
//       } else {
//         if (!initials[currentPage]) {
//           setAlert(!alert);
//           setAlertMessage(t("Please provide your initials"));
//           return;
//         }
//         setprogressValue_(progressValue_ + 1);
//         setCurrentPage(currentPage + 1);
//       }
//     } else if (currentPage === statements.length) {
//       if (minor === "true") {
//         if (!initials[currentPage] || !guardianInitials[currentPage]) {
//           setAlert(!alert);
//           setAlertMessage(t("Please provide your initials"));
//           return;
//         } else {
//           navigate("/harmless-agreement");
//         }
//       } else {
//         if (!initials[currentPage]) {
//           setAlert(!alert);
//           setAlertMessage(t("Please provide your initials"));
//           return;
//         }
//         navigate("/harmless-agreement");
//       }
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setprogressValue_(progressValue_ - 1);
//       setCurrentPage(currentPage - 1);
//     }
//     if (currentPage === 1) navigate(-1);
//   };

//   const handleAdopt = () => {
//     if (activeTab === 1) {
//       if (cursiveSignatureImage) {
//         setSignature(cursiveSignatureImage);
//         if (minor === "true") {
//           setClientInitialsModalOpen(false);
//           setGuardianInitialsModalOpen(true);
//           return;
//         } else {
//           setClientInitialsModalOpen(false);
//           return;
//         }
//       }
//     }
//     if (activeTab === 2) {
//       if (drawnSignature) {
//         setSignature(drawnSignature);
//         if (minor === "true") {
//           setClientInitialsModalOpen(false);
//           setGuardianInitialsModalOpen(true);
//           return;
//         } else {
//           setClientInitialsModalOpen(false);
//           return;
//         }
//       }
//     }
//   };

//   const handleGuardianAdopt = () => {
//     if (guardianActiveTab === 1) {
//       if (cursiveGuardianSignatureImage) {
//         setGuardianSignature(cursiveGuardianSignatureImage);
//         setGuardianInitialsModalOpen(false);
//         setGuardianInitialsImg(cursiveGuardianInitialsImage)
//         // setharmlessagreement({...harmlessagreement , guardianInitialsImg : cursiveGuardianInitialsImage})
//         return;
//       }
//     }
//     if (guardianActiveTab === 2) {
//       if (drawnGuardianSignature) {
//         setGuardianSignature(drawnGuardianSignature);
//         setGuardianInitialsModalOpen(false);
//         if (minor) {
//           return;
//         } else {
//           setClientInitialsModalOpen(false);
//           return;
//         }
//       }
//     }
//   };

//   const captureCursiveSignature = async (id) => {
//     // Use html2canvas to capture the cursive signature as an image
//     const cursiveSignatureCanvas = await html2canvas(
//       document.getElementById(id),
//       {
//         scale: 3, // Increase the scale for higher resolution
//         backgroundColor: null, // Set background color to null to capture transparency
//         logging: false, // Disable logging to console
//         useCORS: true, // Enable cross-origin resource sharing
//         allowTaint: true, // Allow tainting of the canvas (useful if the content includes images from other domains)
//       }
//     );
//     // Convert the canvas to a base64-encoded image
//     return cursiveSignatureCanvas.toDataURL();
//   };

//   return (
//     <>
//       {
//         //Modal for confirming initials and signature
//         clientInitialsModalOpen && (
//           <ClientInitialsModal
//             cursiveSignatureImage={cursiveSignatureImage}
//             setCursiveSignatureImage={setCursiveSignatureImage}
//             setCursiveInitialsImage={setCursiveInitialsImage}
//             handleAdopt={handleAdopt}
//             storedInitials={storedInitials}
//             activeTab={activeTab}
//             fullName={fullName}
//             setActiveTab={setActiveTab}
//             drawnSignature={drawnSignature}
//             setDrawnSignature={setDrawnSignature}
//           />
//         )
//       }
//       {guardianInitialsModalOpen && (
//         <GuardianInitialsModal
//           setGuardianActiveTab={setGuardianActiveTab}
//           guardianActiveTab={guardianActiveTab}
//           guardianInitials={storedGuardianInitials}
//           cursiveGuardianSignatureImage={cursiveGuardianSignatureImage}
//           setCursiveGuardianSignatureImage={setCursiveGuardianSignatureImage}
//           handleGuardianAdopt={handleGuardianAdopt}
//           drawnGuardianSignature={drawnGuardianSignature}
//           setDrawnGuardianSignature={setDrawnGuardianSignature}
//           setCursiveGuardianInitialsImage={setCursiveGuardianInitialsImage}
//         />
//       )}
//       <ConsentFormLayout
//         progressValue={progressValue}
//         progressValue_={progressValue_}
//         progressValue_count_={13}
//         title="Consent form"
//       >
//         <div className="flex flex-col flex-1 items-center overflow-y-auto p-3 md:p-1 scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded">
//           <p className="text-white text-lg md:text-2xl font-semibold text-center">
//             {statements && t(statements[currentPage - 1])}
//           </p>
//         </div>

//         {/* Clients Section */}
//         <div className="md:w-3/4 w-full px-4 mx-auto flex justify-between items-center">
//           <label className=" text-white md:text-base text-sm flex gap-2 items-center select-none cursor-pointer">
//             <input
//               type="checkbox"
//               className=" w-6 h-6"
//               checked={initials[currentPage]}
//               onChange={(e) => handleCheckbox(currentPage, e)}
//             ></input>
//               {t("Select to add your initials")}
//             </label>
//             <input
//               ref={inputRef}
//               type="text"
//               value={initials[currentPage]}
//               disabled
//               className="bg-gray-700 w-24 text-white p-2 rounded-md font-bold Blacksword"
//             />
//         </div>

//         {/* guardians section */}
//         {minor === "true" && (
//           <div className="md:w-3/4 w-full px-4 mx-auto flex justify-between items-center">
//             <div className="flex gap-2 items-center justify-start w-3/5 md:w-80">
//               <label className=" text-white md:text-base text-sm flex items-center gap-2 select-none cursor-pointer">
//               <input
//                 type="checkbox"
//                 className=" w-6 h-6"
//                 checked={guardianInitials[currentPage]}
//                 onChange={(e) => handleGuardianCheckbox(currentPage, e)}
//               ></input>
//                 {t("Select to add Guardian's initials")}
//               </label>
//             </div>
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={guardianInitials[currentPage]}
//                 readOnly
//                 className="bg-gray-700 text-white p-2 w-24 rounded-md font-bold Blacksword"
//               />
//           </div>
//         )}

//         <div className="w-full h-10 ">
//           <ProgressBar progress={progressValue_} count={statements?.length} />
//         </div>
//         <div className="flex justify-between mt-4">
//           <button
//             className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
//             onClick={prevPage}
//           >
//             {t("Back")}
//           </button>
//           <button
//             className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"
//             onClick={nextPage}
//           >
//             {t("Next")}
//           </button>
//         </div>
//       </ConsentFormLayout>
//     </>
//   );
// }

// export default ConsentForm;
