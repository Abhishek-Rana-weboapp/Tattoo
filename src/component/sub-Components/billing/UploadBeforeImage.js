import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiUrl } from "../../../url";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { decodeUrls, encodeUrls } from "../../../commonFunctions/Encoders";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

export default function UploadBeforeImage({ handlePrev, updateAppointment, setUpdateAppointment }) {
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [imageStatus, setImageStatus] = useState("IDLE");
  const { t } = useTranslation();
  const beforeRef = useRef(null);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
      if(updateAppointment?.before_image){
        setUploadedUrls(decodeUrls(updateAppointment.before_image))
      }
  },[])

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    try {
      const response = await axios.post(`${apiUrl}/upload`, formData);
      return response.data.profile_url;
    } catch (err) {
      setAlertMessage(t('File Upload Failed'))
      setAlert(!alert)
      return null;
    }
  };

  const handleBeforeButton = () => {
    beforeRef?.current?.click();
  };

  const handleUploadBeforeImage = async (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) {
      setAlert(!alert);
      setAlertMessage(t("Please upload  an image"));
      return;
    }
    setImageStatus("UPLOADING");
    const uploadPromises = Array.from(selectedFiles).map(uploadFile);
    const urls = await Promise.all(uploadPromises);
    console.log(urls)
    const filteredUrls = urls.filter(url=>url !== null)
    setImageStatus("IDLE");
    setUploadedUrls((prev) => [...prev, ...filteredUrls]);
  };

  console.log(uploadedUrls)

    const handleDeleteImage = (index) => {
      setUploadedUrls(
        uploadedUrls.filter((img, imageIndex) => {
          if (imageIndex !== index) return img;
        })
      );
    };

      const handleNext = async()=>{
        if(uploadedUrls){
          setLoading(true)
          const encodeUrlString = encodeUrls(uploadedUrls)
          const data = {
            updates: [
              {
                id: updateAppointment?.id,
                updateField: "before_image",
                updateValue:encodeUrlString,
              },
              {
                id: updateAppointment?.id,
                updateField: "process_step",
                updateValue: 4,
              },
            ],
          };
          await axios
          .post(`${apiUrl}/artist/post_new`, data)
          .then((res) => {
            axios
            .get(
              `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
              )
              .then((res) => {
                setUpdateAppointment(res.data.data[0]);
                setLoading(false)
                navigate(`/billing/${updateAppointment?.id}/${res.data.data[0].process_step}`);
                })
                .catch((err) => {
                  setAlertMessage(t('Something went wrong'))
                  setAlert(!alert)
                  setLoading(false)
                  return
                });
              })
              .catch((err) => {
                setLoading(false)
                setAlertMessage(t('Something went wrong'))
                setAlert(!alert)
                return
              });
            }
      }

  return (
    <div className="flex flex-col gap-2 w-full h-full items-center overflow-hidden">
      {/* Image upload for before */}
      <h3>{t("Please Provide Before Image:")}</h3>
      {uploadedUrls.length !== 0 && (<div className="flex md:grid md:grid-cols-3 md:grid-rows-3 flex-col gap-2 overflow-y-auto overflow-x-hidden md:w-2/4  md:justify-center items-center md:items-start h-full">
            {uploadedUrls.map((url, index) => {
            return (
              <div className="relative md:w-full w-2/3 md:h-full h-60">
                <img
                  key={url}
                  src={url}
                  alt="Before"
                  className={`rounded-lg w-full h-full`}
                />
                <IoMdClose
                  className="img-del-icon"
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            );
          })
        }
        </div>
          )}
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
        ref={beforeRef}
        multiple
        style={{ display: "none" }} // Hide the input element
        onChange={handleUploadBeforeImage}
      />
      <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={handleBeforeButton}
        disabled={imageStatus === "UPLOADING"}
      >
        {imageStatus === "UPLOADING" ? <Loader/> : t("Upload Before Image")}
      </button>
      <div className="flex gap-5 items-center">
        <button
          className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
          onClick={handlePrev}
        >
          {t("Prev")}
        </button>
        <button
          className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
          onClick={() => handleNext(uploadedUrls)}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
}
