import { useEffect, useState } from "react";
import { apiUrl } from "../../../url";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../../modal/LoaderModal";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import InputButton from "../../buttons/InputButton";
import toast from "react-hot-toast";
import axiosInstance from "../../../config/axios";
import TranslationWrapper from "../../Layout/TranslationWrapper";
import { decodeUrls, encodeUrls } from "../../../commonFunctions/Encoders";
import { resolveMediaUrl } from "../../../commonFunctions/mediaUrl";

export default function UploadAfterImage() {
  const { appointment, setAppointment } = useAppointmentContext();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const prevSteps = ["tattoo", "permanent-makeup"]


  useEffect(()=>{
    if(appointment){
     if(appointment.afterImage || appointment.afterVideo){
       if(appointment.afterImage){
        setImages(decodeUrls(appointment.afterImage))
       }
       if(appointment.afterVideo){
        setVideos(decodeUrls(appointment.afterVideo))
       }
       if(appointment.typeofservice === "tattoo" && appointment.adminProcessStep === 4){
        setSelected("Yes")
      }
      return
     }
     if(appointment.typeofservice === "tattoo" && appointment.adminProcessStep === 4){
        setSelected("no")
     }
    }
  },[appointment])

  const handleNext = async () => {
    const hasImages = images.length > 0;
    const hasVideos = videos.length > 0;
    const isTattooNotSelected =
      appointment.typeofservice === "tattoo" && selected === "no";

    let updates = {};

    if (hasImages || hasVideos) {
      if (hasImages) {
        updates.afterImage = encodeUrls(images);
      }

      if (hasVideos) {
        updates.afterVideo = encodeUrls(videos);
      }

      updates.adminProcessStep = 10;
    } else if (isTattooNotSelected) {
      updates.adminProcessStep = 10;
    } else {
      toast.error(
        "Please upload at least one image or video to proceed further"
      );
      return;
    }
   try {
    setLoading(true)
    const response = await axiosInstance.put(`appointment/${appointment.id}`, updates)
    if(response.status === 200){
      setAppointment(response.data.appointment);
      toast.success(t("After Images and videos updated successfully"));
      navigate(`/billing/${response.data.appointment.adminProcessStep}`)
    }
   } catch (error) {
     toast.error(error.response.data.message || "Something went wrong")
   }finally{
    setLoading(false)
   }
  };

  const handlePrev = () => {
    if(prevSteps.includes(appointment.typeofservice)){
      navigate("/billing/8");
    }else{
      navigate("/billing/7")
    }
  };

  const handleUpload = async (e) => {
    const name = e.target.name;
    const selectedFiles = e.target.files;
    if (!selectedFiles || !selectedFiles.length === 0) {
      toast.error("Please select an image to upload");
      return;
    }
    try {
      if (name === "image") {
        setImageLoading(true);
      } else {
        setVideoLoading(true);
      }
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("profiles", file);
      });

      const response = await axiosInstance.post("upload", formData);
      e.target.value = null;
      if (response.status === 200) {
        if (name === "image") {
          setImages(prev=>([...prev, ...response.data.profile_urls]));
        } else {
          setVideos(prev=>([...prev, ...response.data.profile_urls]));
        }
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to upload files to server"
      );
    } finally {
      setImageLoading(false);
      setVideoLoading(false);
    }
  };

  if (loading) {
    return <LoaderModal />;
  }

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full items-center overflow-x-hidden ">
      {/* Image upload for before */}
      <h3 className="md:text-2xl font-bold uppercase text-lg mb-5">
        <TranslationWrapper
          text={"Please provide a before procedure image or video"}
        />
      </h3>

        <>
          {images && images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => {
                return (
                  <div className="relative" key={image}>
                    <img
                      src={resolveMediaUrl(apiUrl, image)}
                      className="w-44 h-44  object-cover"
                    />
                    <IoMdClose
                      className="absolute cursor-pointer top-1.5 right-1.5 hover:text-gray-500"
                      onClick={() => handleDeleteImage(index)}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <InputButton
            className="font-bold px-4"
              onChange={handleUpload}
              loading={imageLoading}
              multiple
              text={"Upload After Images"}
              name="image"
              accept={".jpg, .jpeg, .png, .pdf"}
            />
          </div>

          {videos && videos.length > 0 && (
            <div className="flex flex-wrap">
              {videos.map((video, index) => {
                return (
                  <div className="relative" key={video}>
                    <video controls width="320" height="240" className="w-44 h-44">
                      <source
                        src={resolveMediaUrl(apiUrl, video)}
                        type="video/mp4"
                      ></source>
                    </video>
                    <IoMdClose
                      className="absolute cursor-pointer top-1.5 right-1.5 hover:text-white"
                      onClick={() => handleDeleteVideo(index)}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <InputButton
             className="font-bold px-4"
              onChange={handleUpload}
              loading={videoLoading}
              multiple
              text={"Upload After Videos"}
              name="video"
              accept=".mp4, .webm, .ogg"
            />
          </div>
        </>

      <div className="flex gap-5 items-center">
        <button
          className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
          onClick={handlePrev}
        >
          {t("Back")}
        </button>
        <button
          className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
          onClick={() => handleNext()}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
}


