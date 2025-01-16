import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import UserContext from "../../../context/UserContext";
import { apiUrl } from "../../../url";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderModal from "../../modal/LoaderModal";
import { AUTHHEADERS } from "../../../commonFunctions/Headers";
import Modal from "../../modal/Modal";

export default function CompleteAgreement({ updateAppointment, handlePrev }) {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState();
  const signatureRef = useRef();
  const navigate = useNavigate();
  const { setAlert, setAlertMessage, alert } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (updateAppointment) {
      if (updateAppointment.Sign_completion) {
        setImgUrl(updateAppointment.Sign_completion);
      }
    }
  }, [updateAppointment]);

  const handleSave = async () => {
    if (signatureRef?.current?.isEmpty()) {
      setAlertMessage(t("Please provide your signature"));
      setAlert(!alert);
    } else {
      const dataUrl = signatureRef?.current?.toDataURL();
      setImgUrl(dataUrl);
    }
  };

  const handleClear = () => {
    signatureRef?.current?.clear();
    setImgUrl();
  };

  const handleNext = async () => {
    if (imgUrl) {
      setLoading(true);
      const data = {
        updates: [
          {
            id: updateAppointment?.id,
            updateField: "Sign_completion",
            updateValue: imgUrl,
          },
        ],
      };
      await axios
        .post(`${apiUrl}artist/post_new`, data, {headers : AUTHHEADERS()})
        .then((res) => {
          if (res.status === 201) {
            setLoading(false);
            setModalOpen(true)
            return;
          }
        })
        .catch((err) => {
          setLoading(false);
          setAlert(!alert);
          setAlertMessage(t("Something went wrong"));
          return;
        });
    } else {
      setAlert(!alert);
      setAlertMessage(t("Please save the Signature first"));
      return;
    }
  };

  const handleGeneratePDF = async () => {
    await axios
      .post(
        `${apiUrl}pdf/generate`,
        {
          username: updateAppointment?.username,
          serviceId: updateAppointment?.id,
        },
        { headers: AUTHHEADERS() }
      )
      .then((res) => {
        setAlert(!alert);
        setAlertMessage(t("pdf uploaded to google drive"));
        navigate("/artist-dashboard", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <>
    {
      modalOpen && <Modal>
        <div className="flex flex-col gap-4 p-4">
        <label className="text-2xl text-black">Generate pdf for this appointment</label>
        <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={handleGeneratePDF}
        // disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
        >
        Generate PDF
      </button>
        </div>
      </Modal>
    }
    <div className="flex md:w-2/4 w-full flex-col gap-3 items-center overflow-hidden p-2">
      <h3 className="text-white font-bold text-center">
        {t(
          "Staff Acknowledgment of Service Completion and Client Information Verification."
        )}
      </h3>
      <div className="overflow-auto p-2">
        <p className="text-center">
          {t(`I,`)} {updateAppointment.ArtistPiercerNames},
          {t(
            "hereby confirm that I have thoroughly reviewed the client's submitted information, including their medical history, emergency contact details, and doctor's information. I have also ensured that the client has duly signed and agreed to the waiver releases, hold harmless agreement, and terms of service. As a self-employed contractor or employee of Fame Tattoos Inc., I affirm that I have competently completed the services requested by the client at Fame Tattoos Inc., in accordance with their instructions."
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 250,
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
        </div>
        {imgUrl && (
          <div className="bg-white h-28 w-30">
            <img src={imgUrl} className="w-full h-full"></img>
          </div>
        )}
        <div className="flex justify-center gap-2">
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
              fontWeight: 600,
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
              fontWeight: 600,
            }}
            onClick={handleSave}
          >
            {t("Save")}
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
          onClick={handlePrev}
          // disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
        >
          Prev
        </button>
        <button
          className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
          onClick={handleNext}
          // disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
        >
          Sign
        </button>
      </div>
      
    </div>
    </>
  );
}
