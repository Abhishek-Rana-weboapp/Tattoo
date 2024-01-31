import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { apiUrl } from "../../../url";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";

export default function UploadAfterImage({
  handleBillingUpdate
}) {
  const {alert, setAlert, setAlertMessage} = useContext(UserContext)
  const {t} = useTranslation()
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [imageStatus, setImageStatus] = useState("IDLE");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState();
  const [videoStatus, setVideoStatus] = useState("IDLE");

  const imageRef = useRef(null);
  const videoRef=useRef(null)
  const selectedAppointment = JSON.parse(sessionStorage.getItem("selectedAppointment"))

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
    const selectedFile = e.target.files[0]
    if (!selectedFile) {
      setAlertMessage(t("Please upload a video"));
      setAlert(!alert);
      return
    } else {
      setVideoStatus("UPLOADING")
      const formData = new FormData();
      formData.append("profile", selectedFile);
      await axios
        .post(`${apiUrl}/upload`, formData)
        .then((res) => {
          setUploadedVideoUrl(res.data.profile_url)
          setVideoStatus("IDLE")
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAfterImage = async (e) => {
    const selectedFiles = e.target.files;
    if(selectedFiles.length === 0){
      setAlert(!alert)
      setAlertMessage(t("Please upload  an image"))
      return ;
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
  console.log(selectedAppointment)

  return (
    <>
      <div className="flex flex-col gap-4 items-center overflow-hidden">
        <h3>After Image</h3>
        <div className="flex flex-col gap-2 items-center overflow-hidden">

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
          {imageStatus === "UPLOADING" ? "..." :"After Image"}
        </button>

        {/* Images preview */}
        <div className="flex md:flex-row flex-col gap-2 overflow-auto">
          {uploadedUrls?.map((image, index) => {
            return (
              <div className="relative">
                <img key={image} src={image} alt={`after-${index}`} className="w-40 h-40 rounded-lg"></img>
                <IoMdClose
                  className="img-del-icon"
                  onClick={() => handleDeleteImage(index)}
                  />
              </div>
            );
          })}
        </div>
          </div>

        {selectedAppointment[0]?.typeofservice === "tattoo" && (
          <>
            <input
              type="file"
              accept=".mp4, .webm, .ogg" // Specify allowed file types
              ref={videoRef}
              style={{ display: "none" }} // Hide the input element
              onChange={handleAfterVideo}
            />
            <button
              className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
              onClick={handleAfterVideoButton}
              disabled={videoStatus === "UPLOADING"}
            >
             {videoStatus === "UPLOADING" ? "..." : "Upload Video"}
            </button>

            {/* Video Preview */}
            {uploadedVideoUrl && (
              <div className="w-30 h-30">
                <video  controls width="320" height="240">
                  <source src={uploadedVideoUrl} type="video/mp4"></source>
                </video>
              </div>
            )}
          </>
        )}
      </div>

      <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={()=>handleBillingUpdate(uploadedUrls, uploadedVideoUrl)}
      >
        Save
      </button>
    </>
  );
}
