import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import UserContext from "../../context/UserContext";
import html2canvas from "html2canvas";
import { captureCursiveSignature } from "../../commonFunctions/utils";

const GaurdianInitialsModal = ({
  gaurdianInitials,
  cursiveGaurdianSignatureImage,
  setCursiveGaurdianSignatureImage,
  setCursiveGaurdianInitialsImage,
  gaurdianActiveTab,
  setGaurdianActiveTab,
  handleGaurdianAdopt,
  drawnGaurdianSignature, 
  setDrawnGaurdianSignature
}) => {
  const { t } = useTranslation();
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);

  const gaurdianInfo = JSON.parse(sessionStorage.getItem("gaurdianInfo"));
  const signatureRef = useRef(null);

  useEffect(() => {
    const handleGaurdianCursive = async () => {
      const gaurdianSignature = await captureCursiveSignature("cursiveSignatureGaurdian");
      setCursiveGaurdianSignatureImage(gaurdianSignature);
      const gaurdianInitials = await captureCursiveSignature("cursiveInitialGaurdian")
      console.log(gaurdianInitials)
      setCursiveGaurdianInitialsImage(gaurdianInitials)
    };
    handleGaurdianCursive();
  }, []);

  const handleSignatureSave = () => {
    if (signatureRef?.current?.isEmpty()) {
      setAlertMessage(t("Please add your signature"));
      setAlert(!alert);
    } else {
      const dataUrl = signatureRef?.current?.toDataURL();
      setDrawnGaurdianSignature(dataUrl);
    }
  };

  const handleClear = () => {
    signatureRef?.current?.clear()
  };



  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-4/5 md:w-2/3 h-2/3 bg-white flex flex-col items-center gap-2 p-4 rounded-lg overflow-hidden">
      <div className="w-full  bg-white flex flex-col items-center gap-2 p-4 rounded-lg md:overflow-hidden overflow-auto md:text-base text-sm">

        <h2>{t("Gaurdian's Initials and Signature")}</h2>
        <label className="font-bold">{t("Confirm Your Name and Initials")}</label>
        <div className="flex items-center gap-2 w-3/4">
          <div className="flex flex-col text-start w-3/4">
            <label className="font-bold">
              {t("Gaurdian's Name")}<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-1 border-gray-400 border-1 rounded-lg font-bold"
              value={
                `${gaurdianInfo?.firstName} ${gaurdianInfo?.lastName}` || ""
              }
              readOnly
              />
          </div>
          <div className="flex flex-col text-start w-1/4">
            <label className="font-bold">
              {t("Initials")}<span className="text-red-500">*</span>
            </label>
            <label
            id="cursiveInitialGaurdian"
              className="p-1 border-gray-400 border-1 rounded-lg  Blacksword"
            >{gaurdianInitials}</label>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <button
              className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                gaurdianActiveTab === 1 && "bg-gray-300"
              } p-2 rounded-lg`}
              onClick={() => setGaurdianActiveTab(1)}
              >
              {t("Written")}
            </button>
            <button
              className={`bg-none font-semibold text-black hover:bg-gray-300 ${
                gaurdianActiveTab === 2 && "bg-gray-300"
              } p-2 rounded-lg`}
              onClick={() => setGaurdianActiveTab(2)}
              >
              {t("Draw")}
            </button>
          </div>
          <div>
            {gaurdianActiveTab === 1 && (
              <div className="border-1 rounded-lg border-gray-500 w-full">
                <img
                  src={cursiveGaurdianSignatureImage}
                  className="w-full h-40"
                  ></img>
              </div>
            )}
          </div>
        </div>
        {gaurdianActiveTab === 2 && (
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
            {drawnGaurdianSignature && (
              <div className="border-1 rounded-lg border-gray-500 w-1/4 flex justify-center">
                <img src={drawnGaurdianSignature} className="w-full h-20"></img>
              </div>
            )}
          </div>
        )}
        {gaurdianActiveTab === 1 && (
          <div id="cursiveSignatureGaurdian">
            <p
              className="selector"
              style={{ fontFamily: "Blacksword", fontSize: "18px" }}
              >
              {`${gaurdianInfo.firstName} ${gaurdianInfo.lastName}`}
            </p>
          </div>
        )}
        <p className=" text-xs">
          {t(
            "By selecting Adopt and initial, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legally binding contracts-just the same as a pen-and-paper signature or initial"
          )}
        </p>
          </div>
        <div className="flex justify-end w-full">
          <button
            className="bg-yellow-400 font-bold p-2 rounded-md hover:scale-105 ease-in-out duration-300"
            onClick={handleGaurdianAdopt}
            >
            {t("Adopt and Initial")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GaurdianInitialsModal;
