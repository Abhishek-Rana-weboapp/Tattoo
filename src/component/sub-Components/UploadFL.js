import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import InputButton from "../buttons/InputButton";
import { apiUrl } from "../../url";
import { useTranslation } from "react-i18next";
import LoaderModal from "../modal/LoaderModal";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import { useAppointmentContext } from "../../context/AppointmentContext";

const UploadFL = ({ setStep, step }) => {
  const {appointment, setAppointment} = useAppointmentContext()
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [flForm, setFlForm] = useState("");
  const [flLoading, setFlLoading] = useState(false);

  const handleSubmit = async () => {
    if(!flForm){
      toast.error("Please upload the FL form")
      return
    }

    const updates = {
      flForm
    }
    try {
      setLoading(true)
      const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
      if(response.status === 200){
        setAppointment(response.data.appointment)
        toast.success("FL form submitted")
        setStep(4)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
  };

  const handleFLDelete = () => {
    setFlForm("")
  };

  const handleFLPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFlLoading(true);
      const formData = new FormData();
      formData.append("profiles", file);
      await axiosInstance
        .post(`${apiUrl}upload`, formData)
        .then((res) => {
          if (res.data.profile_urls) {
            setFlForm(res.data.profile_urls[0]);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message || "Something went wrong");
          setFlLoading(false);
        }).finally(()=>{
          setFlLoading(false)
        })
    }
  };

  const handlePrev = () => {
    setStep(2);
  };

  {
    if (loading) return <LoaderModal />;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-center overflow-auto bg-black p-8 text-white">
        <div className="w-full h-full flex flex-col gap-3 items-center overflow-auto bg-black p-8 text-white">
          <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
            {" "}
            {t("FL Consent Form")}
          </h1>
          {flForm && (
            <div className="relative md:w-1/4 w-full">
              <img
                src={`${apiUrl}${flForm}`}
                className="w-full"
                alt="ID Photo"
              />
              <IoMdClose
                className="absolute right-2 top-2 hover:cursor-pointer"
                onClick={handleFLDelete}
              />
            </div>
          )}

          <InputButton
            onChange={handleFLPhotoUpload}
            loading={flLoading}
            text={"Upload FL form"}
          />

          <p className="text-center">
            {"Please upload FL Health Department Consent Form"}
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-between">
          <button
            onClick={handlePrev}
            className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
          >
            {t("Back")}
          </button>

          <button
            onClick={handleSubmit}
            disabled={!flForm}
            className="yellowButton px-4 py-2 font-bold rounded-3xl text-black"
          >
            {t("Submit")}
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadFL;
