import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import { apiUrl } from "../../../url";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../../modal/LoaderModal";
import Modal from "../../modal/Modal";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import toast from "react-hot-toast";
import axiosInstance from "../../../config/axios";
import { artistNames } from "../../../data/artistsnames";

export default function CompleteAgreement() {
  const {appointment, setAppointment} = useAppointmentContext();
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState();
  const signatureRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [uploading, setUploading]= useState(false);
  const [artistName, setArtistName] = useState("")

  useEffect(() => {
    if (appointment) {
      if (appointment.Sign_completion) {
        setImgUrl(appointment.Sign_completion);
      }
    }
  }, [appointment]);

const handleSave = async () => {
  if (signatureRef?.current?.isEmpty()) {
    toast.error(t("Please provide your signature"));
    return
  } 
    const dataUrl = signatureRef?.current?.toDataURL("image/png");

    // Convert base64 -> Blob -> File
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "signature.png", { type: "image/png" });

    try {
      setUploading(true)
      const formData = new FormData();
      formData.append("profiles", file)
      const response = await axiosInstance.post("upload", formData)
      if(response.status === 200){
        setImgUrl(response?.data?.profile_urls[0])
      }
    } catch (error) {
        toast.error(error.response.data.message || t("Something went wrong"))
    }finally{
      setUploading(false)
    }

};

  const handleClear = () => {
    signatureRef?.current?.clear();
    setImgUrl();
  };

  const handleNext = async () => {
    if(!artistName){
      toast.error("Please select artist name")
      return
    }
    if(!imgUrl){
      toast.error("Please provide a signature")
      return
    }
    try {
      const updates = {
        completionSignature:imgUrl,
        artistName
      }
      setLoading(true)
      const res = await axiosInstance.put(`/appointment/${appointment.id}`,updates)
      if(res.status === 200){
        setAppointment(res.data.appointment);
        setModalOpen(true)
      }
    } catch (error) {
      toast.error("")
    }finally{
      setLoading(false)
    }
  };


  const handlePrev = ()=>{
    navigate(`/billing/8`)
  }

  const handleGeneratePDF = async () => {
    setLoading(true);
    await axiosInstance
      .post(
        `pdf/generate`,
        {
          userName: appointment?.userName,
          appointmentId: appointment?.id,
        },
      )
      .then((res) => {
        toast.success(t("PDF uploaded to google drive"));
        navigate("/artist-dashboard", { replace: true });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || t("Something went wrong"));
      }).finally(()=>{
        setLoading(false);
      })
  };

  const handleSelectArtistName = (e)=>{
    setArtistName(e.target.value)
  }

  if (loading || uploading) {
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
    <div className="flex md:w-2/4 w-full flex-col gap-3 items-center overflow-y-auto  p-2">
      <h3 className="text-white font-bold text-center">
        {t(
          "Staff Acknowledgment of Service Completion and Client Information Verification."
        )}
      </h3>
      <div className="overflow-auto p-2">
        <p className="text-center">
          {t(`I,`)} {appointment.artistPiercerNames},
          {t(
            "hereby confirm that I have thoroughly reviewed the client's submitted information, including their medical history, emergency contact details, and doctor's information. I have also ensured that the client has duly signed and agreed to the waiver releases, hold harmless agreement, and terms of service. As a self-employed contractor or employee of Fame Tattoos Inc., I affirm that I have competently completed the services requested by the client at Fame Tattoos Inc., in accordance with their instructions."
          )}
        </p>
      </div>

      <div className="max-w-80 w-full flex flex-col gap-2 items-center">
         <h4 className="font-medium uppercase">{t("Please Select Artist Name")}</h4>
         <select className="bg-white p-2 rounded-xl w-full text-black" onChange={handleSelectArtistName} value={artistName}>
            <option value="" >{t("Select Artist Name")}</option>
           {
            artistNames.map((name, index)=>(
              <option key={index} value={name} selected={name === artistName}>{name}</option>
            ))
           }
         </select>
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
            <img src={`${apiUrl}${imgUrl}`} className="w-full h-full"></img>
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
