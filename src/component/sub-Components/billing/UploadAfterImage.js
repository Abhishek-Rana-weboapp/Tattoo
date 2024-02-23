import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { apiUrl } from "../../../url";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import { decodeUrls, encodeUrls } from "../../../commonFunctions/Encoders";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import LoaderModal from "../../modal/LoaderModal";

export default function UploadAfterImage({
  updateAppointment,
  setUpdateAppointment,
  handlePrev
}) {
  const navigate = useNavigate();
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const { t } = useTranslation();
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [imageStatus, setImageStatus] = useState("IDLE");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState([]);
  const [videoStatus, setVideoStatus] = useState("IDLE");
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
      if(updateAppointment.after_image){
        setUploadedUrls(decodeUrls(updateAppointment.after_image))
      }

      if(updateAppointment.video_url){
        setUploadedVideoUrl(decodeUrls(updateAppointment.video_url))
      }
  },[])

  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    try {
      const response = await axios.post(`${apiUrl}/upload`, formData);
      return response.data.profile_url;
    } catch (err) {
      console.error("File Upload Failed", err.message);
      return null;
    }
  };

  const handleAfterButton = () => {
    imageRef?.current?.click();
  };

  const handleAfterVideoButton = () => {
    videoRef?.current?.click();
  };


  const handleAfterVideo = async (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) {
      setAlertMessage(t("Please upload a video"));
      setAlert(!alert);
      return;
    } else {
      setVideoStatus("UPLOADING");
      const uploadPromises = Array.from(selectedFiles).map(uploadFile);
      const urls = await Promise.all(uploadPromises);
      const filteredUrls = urls.filter((url) => url !== null);
      setVideoStatus("IDLE");
      setUploadedVideoUrl((prev) => [...prev, ...filteredUrls]);
    }
  };


  const handleAfterImage = async (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) {
      setAlert(!alert);
      setAlertMessage(t("Please upload  an image"));
      return;
    }
    setImageStatus("UPLOADING");
    const uploadPromises = Array.from(selectedFiles).map(uploadFile);
    const urls = await Promise.all(uploadPromises);
    setImageStatus("IDLE");
    setUploadedUrls((prev) => [...prev, ...urls]);
  };

  const handleDeleteImage = (index) => {
    setUploadedUrls(
      uploadedUrls.filter((img, imageIndex) => {
        if (imageIndex !== index) return img;
      })
    );
  };

  const handleDeleteVideo = (index) => {
    setUploadedVideoUrl(uploadedVideoUrl.filter((vid, vidIndex)=>vidIndex !== index))
  };

  const handleNext = async () => {
    let data;
    if (uploadedUrls.length > 0 || uploadedVideoUrl.length > 0) {
      setLoading(true)
      if (uploadedUrls.length > 0 && uploadedVideoUrl.length === 0) {
        const encodedAfterImage = encodeUrls(uploadedUrls);
        data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: "after_image",
              updateValue: encodedAfterImage,
            },
            {
              id: updateAppointment?.id,
              updateField: "process_step",
              updateValue: 8,
            },
          ],
        };
      }
      if (uploadedUrls.length === 0 && uploadedVideoUrl.length > 0) {
        const encodedAfterVideo = encodeUrls(uploadedVideoUrl);
        data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: "video_url",
              updateValue: encodedAfterVideo,
            },
            {
              id: updateAppointment?.id,
              updateField: "process_step",
              updateValue: 8,
            },
          ],
        };
      }
       if (uploadedUrls.length > 0 && uploadedVideoUrl.length > 0) {
        const encodedAfterImage = encodeUrls(uploadedUrls);
        const encodedAfterVideo = encodeUrls(uploadedVideoUrl);
        data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: "after_image",
              updateValue: encodedAfterImage,
            },
            {
              id: updateAppointment?.id,
              updateField: "video_url",
              updateValue: encodedAfterVideo,
            },
            {
              id: updateAppointment?.id,
              updateField: "process_step",
              updateValue: 8,
            },
          ],
        };
      }
        await axios.post(`${apiUrl}/artist/post_new`, data).
        then((res) => {
          axios
          .get(
            `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
            )
            .then((response) => {
              setUpdateAppointment(response.data.data[0]);
              setLoading(false)
              navigate(
                `/billing/${updateAppointment?.id}/${response.data.data[0].process_step}`
                );
              })
              .catch((err) =>{
                setLoading(false)
                setAlert(!alert);
            setAlertMessage(t("Something went wrong"));
            return;
              }
              );
            }).catch(err=>{
              setLoading(false)
              setAlert(!alert);
            setAlertMessage(t("Something went wrong"));
            return;
            })
    } else {
      setAlert(!alert);
      setAlertMessage(t("Please upload a image or video"));
      return;
    }
  };

  if(loading){
    return <LoaderModal/>
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center overflow-hidden">
        <h3>{t("After Image")}</h3>
        <div className="flex flex-col gap-2 items-center overflow-hidden">
          {/* Images preview */}
          <div className="md:flex grid grid-cols-2 gap-2 overflow-auto">
            {uploadedUrls?.map((image, index) => {
              return (
                <div className="relative">
                  <img
                    key={image}
                    src={image}
                    alt={`after-${index}`}
                    className="w-40 h-40 rounded-lg"
                  ></img>
                  <IoMdClose
                    className="img-del-icon"
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
            ref={imageRef}
            multiple
            style={{ display: "none" }} // Hide the input element
            onChange={handleAfterImage}
          />
          <button
            className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
            onClick={handleAfterButton}
            disabled={imageStatus === "UPLOADING"}
          >
            {imageStatus === "UPLOADING" ? <Loader/> : (t("After Image"))}
          </button>
        </div>

        <>
          {/* Video Preview */}
          {uploadedVideoUrl && (
            <div className="w-30 h-30 flex md:flex-row flex-col gap-2 overflow-auto">
              {uploadedVideoUrl.map((url, index) => {
                return (
                  <div className="relative">
                    <video controls width="320" height="240">
                      <source src={url} type="video/mp4"></source>
                    </video>
                    <IoMdClose
                      className="img-del-icon"
                      onClick={()=>handleDeleteVideo(index)}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <input
            type="file"
            accept=".mp4, .webm, .ogg" // Specify allowed file types
            ref={videoRef}
            multiple
            style={{ display: "none" }} // Hide the input element
            onChange={handleAfterVideo}
          />
          <button
            className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
            onClick={handleAfterVideoButton}
            disabled={videoStatus === "UPLOADING"}
          >
            {videoStatus === "UPLOADING" ? <Loader/> : t("Upload Video")}
          </button>
        </>
      </div>
      <div className="flex justify-center gap-4">
      <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={handlePrev}
        // disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
      >
        {t("Prev")}
      </button>

      <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={handleNext}
        disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
        >
        {t("Save")}
      </button>
        </div>
    </>
  );
}
