import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import ProgressBar from "./ProgressBar";
import Title from "../assets/Title.png";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import SignatureModal from "./modal/SignatureModal";

const ConsentFormGuard = () => {
  const { t } = useTranslation();
  var progressValue = 100;
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [showPopup, setShowPopup] = useState(false);
  const { setIsVisible, alert, setAlert, setAlertMessage } =
    useContext(UserContext);

  const [signature_type, setsignature_type] = useState(null);

  const [signatureRef, setSignatureRef] = useState();
  const [signatureImage, setSignatureImage] = useState(null);
  const [clientSignatureImage, setClientSignatureImage] = useState(null);
  const [technicianSignatureImage, setTechnicianSignatureImage] =
    useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    procedureType: "",
    procedureDescription: "",
    procedureLocation: "",
    consentAgree: false,
    photoConsent: false,
    techName: "",
    techSignature: "",
    techDate: "",
    clientSignature: "",
    clientSignatureDate: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const dataUrl = signatureRef?.current?.toDataURL();
    if(signatureRef?.current?.isEmpty()){
      setAlert(!alert)
      setAlertMessage(t("Please provide your signature"))
    }else{
      if (signature_type === "clientSignature") {
        setClientSignatureImage(dataUrl);
        setFormData(prev=>({...prev , clientSignature : dataUrl}))
      } if(signature_type === "techSignature") {
        setTechnicianSignatureImage(dataUrl);
        setFormData(prev=>({...prev , techSignature : dataUrl}))
      }
    }
    setShowPopup(!showPopup);
  };

  const handleClear = (e) => {
    e.preventDefault();
    signatureRef.current.clear();
    setSignatureImage(null);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setShowPopup(false);

  //   // You can now use the signatureImage state to submit the signature to your API
  //   if (signatureImage) {
  //     console.log("Submitting Signature:", signatureImage, signature_type);

  //     if (signature_type === "techSignature") {
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         techSignature: signatureImage,
  //       }));
  //     } else if (signature_type === "clientSignature") {
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         clientSignature: signatureImage,
  //       }));
  //     }
  //     setSignatureImage(null);
  //     // Add your API submission logic here
  //   } else {
  //     console.log("Please save a signature before submitting.");
  //   }
  // };

  const handelapi = async (event) => {
    event.preventDefault();

    const appointment_detail = JSON.parse(
      sessionStorage.getItem("appointment_detail")
    );
    console.log("apoinment detail", formData);
    for (const key in formData) {
      if (
        formData.hasOwnProperty(key) &&
        (formData[key] === "" || formData[key] === null)
      ) {
        setAlert(!alert);
        setAlertMessage(t(`Please fill in all the required fields.`));
        return;
      }
    }

    try {
      const response = await fetch(`${apiUrl}/appointment/post?update=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: appointment_detail?.username,
          id: appointment_detail?.id,
          consent_guard: formData,
        }),
      });

      if (response.status === 201) {
        setAlert(!alert);
        setAlertMessage(t("Appointment booked"));
        navigate("/");
      } else {
        setAlert(!alert);
        setAlertMessage(t("All fields are required, please refill the form."));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {showPopup && (
        <SignatureModal
          handleSave={handleSave}
          handleClear={handleClear}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          setSignatureRef={setSignatureRef}
          signature_type={signature_type}
        />
      )}

      <div className="w-full h-full flex flex-col items-center bg-black p-8 text-white overflow-hidden ">
        <h1 className="text-3xl font-bold mb-4 text-yellow-500 uppercase underline">
          {t("Consent Form")}
        </h1>
        <form className="bg-gray-800 p-3 flex flex-col gap-2 rounded-md shadow-md w-4/5 backdrop-blur bg-opacity-50 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded p-2">
            <section className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h2 className="uppercase underline font-semibold">
                  {t("Client Information")}
                </h2>

                <div className="flex justify-between gap-2">
                  <div className="flex-1">
                    <label
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                      htmlFor="fullName"
                    >
                      {t("Full Name:")}
                    </label>
                    <input
                      className="p-2 bg-gray-400 rounded-md w-full text-black"
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData?.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ flex: "1" }}>
                    <label
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                      htmlFor="dateOfBirth"
                    >
                      {t("Date of Birth:")}
                    </label>
                    <input
                      className="p-2 bg-gray-400 rounded-md w-full text-black"
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData?.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <div style={{ flex: "1" }}>
                    <label
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                      htmlFor="address"
                    >
                      {t("Address")}:
                    </label>
                    <input
                      className="p-2 bg-gray-400 rounded-md w-full text-black"
                      type="text"
                      id="address"
                      name="address"
                      value={formData?.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div style={{ flex: "1" }}>
                    <label
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                      htmlFor="phone"
                    >
                      {t("Phone")}:
                    </label>
                    <input
                      className="p-2 bg-gray-400 rounded-md w-full text-black"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData?.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-1">
              <h2 className="uppercase underline font-semibold">
                {t("Procedure Information")}
              </h2>
              <label style={{ fontWeight: "bold" }} htmlFor="procedureType">
                {t("Procedure")} (Tattoo/Piercing/Permanent Makeup):
              </label>
              <input
                className="p-2 bg-gray-400 w-full rounded-md text-black"
                type="text"
                id="procedureType"
                name="procedureType"
                value={formData?.procedureType}
                onChange={handleInputChange}
                required
              />
              <br />

              <label
                style={{ fontWeight: "bold" }}
                htmlFor="procedureDescription"
              >
                {t("Description of Procedure:")}
              </label>
              <textarea
                className="w-full p-2 bg-gray-400 rounded-md text-black"
                id="procedureDescription"
                name="procedureDescription"
                rows="4"
                value={formData?.procedureDescription}
                onChange={handleInputChange}
                required
              ></textarea>
              <br />

              <label style={{ fontWeight: "bold" }} htmlFor="procedureLocation">
                {t("Location of Procedure:")}
              </label>
              <input
                className="p-2 bg-gray-400 w-full rounded-md text-black"
                type="text"
                id="procedureLocation"
                name="procedureLocation"
                value={formData?.procedureLocation}
                onChange={handleInputChange}
                required
              />
              <br />
            </section>

            <section className="flex flex-col gap-2 items-start">
              <h2 className="uppercase underline font-semibold">
                {t("Risks and Benefits")}
              </h2>
              <p style={{ fontWeight: "bold" }}>
                {t(
                  "I have been informed of the potential risks, benefits, and alternatives associated with the chosen procedure, including but not limited to infection, allergic reactions, scarring, and dissatisfaction with the results. I understand that the results may vary based on my skin type, lifestyle, and adherence to aftercare instructions."
                )}
              </p>
            </section>

            <section className="flex flex-col gap-2 items-start">
              <h2 className="uppercase underline font-semibold">
                {t("Aftercare Instructions")}
              </h2>
              <p style={{ fontWeight: "bold" }}>
                {t(
                  "I understand that proper aftercare is essential for the success of the procedure and to minimize the risk of complications. I commit to following the aftercare instructions provided by the technician."
                )}
              </p>
            </section>

            <section className="flex flex-col gap-2 items-start">
              <h2 className="uppercase underline font-semibold">
                {t("Consent")}
              </h2>
              <div className="w-full flex gap-2 items-center">
                <input
                  className="w-7 h-7 "
                  type="checkbox"
                  id="consentAgree"
                  name="consentAgree"
                  style={{ marginLeft: "5px" }}
                  checked={formData?.consentAgree}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label style={{ fontWeight: "bold" }} htmlFor="consentAgree">
                  {t(
                    "I hereby consent to the chosen procedure and confirm that I am undertaking it willingly and voluntarily. I acknowledge that I have had the opportunity to ask questions, and all my concerns have been addressed to my satisfaction."
                  )}
                </label>
              </div>
            </section>

            <section className="flex flex-col gap-2 items-start">
              <h2 className="uppercase underline font-semibold">
                {t("Release of Liability")}
              </h2>
              <p style={{ fontWeight: "bold" }}>
                {t(
                  "I release the technician, the establishment, and their employees from any liability related to the procedure. I understand that the outcome may vary from person to person, and no guarantees have been made regarding the results."
                )}
              </p>
            </section>

            <section className="flex flex-col gap-2 items-start">
              <h2 className="uppercase underline font-semibold">
                {t("Before and After Photos")}
              </h2>
              <div className="w-full flex gap-2 items-center">
                <input
                  className="w-5 h-5 "
                  type="checkbox"
                  id="photoConsent"
                  name="photoConsent"
                  style={{ marginLeft: "5px" }}
                  checked={formData?.photoConsent}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label style={{ fontWeight: "bold" }} htmlFor="photoConsent">
                  {t(
                    "I agree to allow the technician to take before and after photos of the procedure for documentation and promotional purposes."
                  )}
                </label>
              </div>
            </section>

            <section className="flex flex-col gap-2 items-start">

              <h2 className="uppercase underline font-semibold">
                {t("Witness (Technician)")}
              </h2>
              <label style={{ fontWeight: "bold" }} htmlFor="techName">
                {t("Technician's Name:")}
              </label>
              <input
                className="p-2 bg-gray-400 rounded-md w-full text-black"
                type="text"
                id="techName"
                name="techName"
                value={formData?.techName}
                onChange={handleInputChange}
                required
              />
              <br />

              {technicianSignatureImage && (
                <div className="flex w-full justify-center">
                  <img
                    src={technicianSignatureImage}
                    alt="Signature Preview"
                    style={{
                      background : "white" ,
                      border: "1px solid #000",
                      borderRadius: "5px",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              )}

              <label style={{ fontWeight: "bold" }} htmlFor="techSignature">
                {t("Technician's Signature:")}
              </label>
              <button
                className="yellowButton py-2 px-8 rounded-3xl font-bold text-black w-full capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPopup(true);
                  setsignature_type("techSignature");
                }}
              >
                {t("add signature")}
              </button>

              <label style={{ fontWeight: "bold" }} htmlFor="techDate">
                Date (MM/DD/YYYY):
              </label>
              <input
                className="p-2 bg-gray-400 rounded-md w-full text-black"
                type="date"
                id="techDate"
                name="techDate"
                value={formData?.techDate}
                onChange={handleInputChange}
                required
              />
              <br />
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="uppercase underline font-semibold">
                {t("Client's Signature")}
              </h2>

              {clientSignatureImage && (
                <div className="flex justify-center">
                  <img
                    src={clientSignatureImage}
                    alt="Signature Preview"
                    style={{
                      background : "white",
                      border: "1px solid #000",
                      borderRadius: "5px",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              )}

              <label style={{ fontWeight: "bold" }} htmlFor="clientSignature">
                {t("Signature:")}
              </label>
              <button
                className="yellowButton py-2 px-8 rounded-3xl font-bold text-black w-full capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPopup(true);
                  setsignature_type("clientSignature");
                }}
              >
                {t("add signature")}
              </button>

              <label
                style={{ fontWeight: "bold" }}
                htmlFor="clientSignatureDate"
              >
                Date (MM/DD/YYYY):
              </label>
              <input
                className="p-2 bg-gray-400 rounded-md w-full"
                type="date"
                id="clientSignatureDate"
                name="clientSignatureDate"
                value={formData?.clientSignatureDate}
                onChange={handleInputChange}
                required
              />
              <br />
            </section>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="yellowButton py-2 px-8 rounded-3xl font-bold text-black"
              onClick={handelapi}
            >
              {t("Submit")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ConsentFormGuard;
