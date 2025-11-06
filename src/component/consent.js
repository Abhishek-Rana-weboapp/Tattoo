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
import SignatureCanvas from 'react-signature-canvas';
import Button from "./buttons/Button";
import axiosInstance from "../config/axios";
  import toast from "react-hot-toast";
  import { useTranslation } from "react-i18next";

function ConsentForm() {
  //  new code
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appointmentData, setAppointmentData } = useAppointmentContext();
  const { guardianInitials, guardianfullName, fullName, initials, user } =
    useAuthContext();
    
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [imageBlob, setImageBlob] = useState(null);
  const [step, setStep] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [signatureRef, setSignatureRef] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear image blob when switching tabs
    setImageBlob(null);
    // Clear signature if switching from draw tab
    if (tab === 1 && signatureRef) {
      signatureRef.clear();
    }
  };

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
      console.log(imageBlob);
      
      const formData = new FormData();
      // Provide a filename so servers/multer treat the Blob as a file
      const fileName = (imageBlob && imageBlob.type && imageBlob.type.includes("png")) ? "signature.png" : "signature.jpg";
      formData.append("profiles", imageBlob, fileName);
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
  // Handle signature drawing validation
  if (activeTab === 2) {
    if (!signatureRef || signatureRef.isEmpty()) {
      toast.error("Please draw your signature before adopting");
      return;
    }
    // Convert signature to blob
    const dataURL = signatureRef.toDataURL();
    fetch(dataURL)
      .then(res => res.blob())
      .then(blob => {
        handleImageUpload(blob);
      })
      .catch(err => {
        console.error("Error converting signature:", err);
        toast.error("Failed to convert signature");
      });
    return;
  } else {
    // Handle text signature validation
    if (!imageBlob) {
      toast.error("Please generate your signature before adopting");
      return;
    }
  }

  handleImageUpload(imageBlob);
};

const handleImageUpload = async (blob) => {
  setUploadingImage(true);
  try {
    const profileUrl = await uploadImage(blob)
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
                {t("Adopt your Initials and Signature")}
              </h2>
              <h2 className="md:text-xl  text-center font-semibold mt-3">
                {step === 1
                  ? t("Confirm Your Name and Initials")
                  : t("Confirm Guardian's Name and Initials")
                }
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
                    className="w-20 border-gray-300 border-1 border rounded-lg p-1 Blacksword bg-gray-200  cursor-not-allowed opacity-60"
                    value={step === 1 ? initials : guardianInitials}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full mt-3 justify-center ">
                <button
                  className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                    activeTab === 1 && "bg-gray-300"
                  } p-2 rounded-lg`}
                  onClick={() => handleTabChange(1)}
                >
                  <TranslationWrapper text={"Written"} />
                </button>
                <button
                  className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                    activeTab === 2 && "bg-gray-300"
                  } p-2 rounded-lg`}
                  onClick={() => handleTabChange(2)}
                >
                  <TranslationWrapper text={"Draw"} />
                </button>
              </div>
              <div className="mt-3">
                <h3 className="text-center font-semibold -mb-2 capitalize">{t("signature")}</h3>
                {activeTab === 1 && (
                  <div>
                    <ImageGenerator
                      text={step === 1 ? fullName : guardianfullName}
                      setImageBlob={setImageBlob}
                      imageBlob={imageBlob}
                    />
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-center text-sm text-gray-600 mb-2">
                      Draw your signature in the box below
                    </div>
                    <div className="border-2 border-gray-300 rounded-lg bg-white w-full max-w-md mx-auto">
                      <SignatureCanvas
                        ref={setSignatureRef}
                        penColor="black"
                        velocityFilterWeight={0.5}
                        minWidth={1}
                        maxWidth={3}
                        canvasProps={{
                          width: 400,
                          height: 150,
                          className: "sigCanvas w-full touch-none",
                          style: {
                            border: "1px solid #000",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                            touchAction: "none",
                          },
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => signatureRef && signatureRef.clear()}
                      >
                        {t("Clear")}
                      </button>
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        onClick={() => {
                          if (signatureRef && !signatureRef.isEmpty()) {
                            // Convert dataURL to blob
                            const dataURL = signatureRef.toDataURL();
                            fetch(dataURL)
                              .then(res => res.blob())
                              .then(blob => {
                                setImageBlob(blob);
                                toast.success("Signature saved!");
                              })
                              .catch(err => {
                                console.error("Error converting signature:", err);
                                toast.error("Failed to save signature");
                              });
                          } else {
                            toast.error("Please draw a signature first");
                          }
                        }}
                      >
                        {t("Save Signature")}
                      </button>
                    </div>
                    {imageBlob && (
                      <div className="text-green-600 text-sm font-medium">
                        ✓ Signature ready for adoption
                      </div>
                    )}
                  </div>
                )}
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
                  disabled={uploadingImage || (activeTab === 1 && !imageBlob) || (activeTab === 2 && !imageBlob)}
                  onClick={handleInitialsAdopt}
                  className={`mt-4 shadow ${(activeTab === 1 && !imageBlob) || (activeTab === 2 && !imageBlob) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <TranslationWrapper text={
                    (activeTab === 1 && !imageBlob) || (activeTab === 2 && !imageBlob) 
                      ? t("Please create signature first") 
                      : t("Adopt & Initial")
                  } />
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
