import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiUrl } from "../../../url";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { decodeUrls, encodeUrls } from "../../../commonFunctions/Encoders";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import LoaderModal from "../../modal/LoaderModal";

export default function UploadBeforeImage({ handlePrev, updateAppointment, setUpdateAppointment }) {
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [imageStatus, setImageStatus] = useState("IDLE");
  const [videoStatus, setVideoStatus] = useState("IDLE");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState([])
  const { t } = useTranslation();
  const beforeRef = useRef(null);
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
      if(updateAppointment?.before_image){
        setUploadedUrls(decodeUrls(updateAppointment.before_image))
      }

        if(updateAppointment.video_url){
          setUploadedVideoUrl(decodeUrls(updateAppointment.before_video))
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
        let data
        if (uploadedUrls.length > 0 || uploadedVideoUrl.length > 0) {
          setLoading(true)
          if (uploadedUrls.length > 0 && uploadedVideoUrl.length === 0) {
            const encodedBeforeImage = encodeUrls(uploadedUrls);
            data = {
              updates: [
                {
                  id: updateAppointment?.id,
                  updateField: "before_image",
                  updateValue: encodedBeforeImage,
                },
                {
                  id: updateAppointment?.id,
                  updateField: "process_step",
                  updateValue: 4,
                },
              ],
            };
          }
          if (uploadedUrls.length === 0 && uploadedVideoUrl.length > 0) {
            const encodedBeforeVideo = encodeUrls(uploadedVideoUrl);
            data = {
              updates: [
                {
                  id: updateAppointment?.id,
                  updateField: "before_video",
                  updateValue: encodedBeforeVideo,
                },
                {
                  id: updateAppointment?.id,
                  updateField: "process_step",
                  updateValue: 4,
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
                  updateField: "before_image",
                  updateValue: encodedAfterImage,
                },
                {
                  id: updateAppointment?.id,
                  updateField: "before_video",
                  updateValue: encodedAfterVideo,
                },
                {
                  id: updateAppointment?.id,
                  updateField: "process_step",
                  updateValue: 4,
                },
              ],
            };
          }
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
            }else {
              setAlert(!alert);
              setAlertMessage(t("Please upload a image or video"));
              return;
            }
      }

      const handleBeforeVideoButton = () => {
        videoRef?.current?.click();
      };

      const handleBeforeVideo = async (e) => {
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

      const handleDeleteVideo = (index) => {
        setUploadedVideoUrl(uploadedVideoUrl.filter((vid, vidIndex)=>vidIndex !== index))
      };

      if(loading){
        return <LoaderModal/>
      }

  return (
    <div className="flex flex-col gap-2 w-full h-full items-center overflow-hidden">
      {/* Image upload for before */}
      <h3>{t("Please Provide Before Image:")}</h3>
      <div className="flex flex-col gap-2 items-center overflow-hidden">

      {uploadedUrls.length !== 0 && (<div className="md:flex grid grid-cols-2 gap-2 overflow-auto">
            {uploadedUrls.map((url, index) => {
              return (
                <div className="relative">
                <img
                  key={url}
                  src={url}
                  alt="Before"
                  className="w-40 h-40 rounded-lg"
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
        </div>

        <div className="flex flex-col gap-2 items-center overflow-hidden">


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
            onChange={handleBeforeVideo}
            />
          <button
            className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
            onClick={handleBeforeVideoButton}
            disabled={videoStatus === "UPLOADING"}
            >
            {videoStatus === "UPLOADING" ? <Loader/> : t("Upload Video")}
          </button>
        </div>

      <div className="flex gap-5 items-center">
        <button
          className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
          onClick={handlePrev}
          >
          {t("Back")}
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
