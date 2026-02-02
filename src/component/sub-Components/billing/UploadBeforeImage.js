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

export default function UploadBeforeImage({}) {
  const { appointment, setAppointment } = useAppointmentContext();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const ignoreSteps = [1,2,3]


  useEffect(()=>{
    if(appointment){
     if(appointment.beforeImage || appointment.beforeVideo){
       if(appointment.beforeImage){
        setImages(decodeUrls(appointment.beforeImage))
       }
       if(appointment.beforeVideo){
        setVideos(decodeUrls(appointment.beforeVideo))
       }
       if(appointment.typeofservice === "tattoo" && !ignoreSteps.includes(appointment.adminProcessStep) ){
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
        updates.beforeImage = encodeUrls(images);
      }

      if (hasVideos) {
        updates.beforeVideo = encodeUrls(videos);
      }

      updates.adminProcessStep = 5;
    } else if (isTattooNotSelected) {
      updates.adminProcessStep = 5;
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
      if(setSelected === "yes") toast.success(t("Before Images and videos updated successfully")) ;
      navigate(`/billing/${response.data.appointment.adminProcessStep}`)
    }
   } catch (error) {
     toast.error(error.response.data.message || "Something went wrong")
   }finally{
    setLoading(false)
   }
  };

  const handlePrev = () => {
    navigate("/billing/2");
  };

  const handleCheckboxes = (e) => {
    const value = e.target.value;
    if (value === selected) {
      setSelected("");
      return;
    }
    setSelected(value);
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
          setImages(prev => ([...prev, ...response.data.profile_urls]));
        } else {
          setVideos(prev => ([...prev, ...response.data.profile_urls]));
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
    <div className="flex flex-col gap-3 w-full h-full items-center">
      {/* Image upload for before */}
      <h3 className="md:text-2xl font-bold uppercase text-lg mb-5">
        <TranslationWrapper
          text={"Please provide a before procedure image or video"}
        />
      </h3>
      <div className="flex flex-col gap-2 items-center overflow-hidden">
        {appointment.typeofservice === "tattoo" && (
          <div className="space-y-3">
            <label
              className={`uppercase md:text-xl text-sm text-white md:font-bold flex gap-2`}
            >
              <TranslationWrapper text={`Q1`} /> :
              <TranslationWrapper text={"Is this a cover-up or fix-up?"} />
            </label>
            <div className="flex flex-col md:text-2xl text-base items-center gap-4">
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  value="yes"
                  checked={selected === "yes"}
                  onChange={handleCheckboxes}
                />
                <TranslationWrapper text={"Yes"} />
              </label>
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className=" w-6 h-6 "
                  value="no"
                  checked={selected === "no"}
                  onChange={handleCheckboxes}
                />
                <TranslationWrapper text={"No"} />
              </label>
            </div>
          </div>
        )}
      </div>

      {(appointment.typeofservice === "removal" ||
        (appointment.typeofservice === "tattoo" && selected === "yes")) && (
        <>
          {images && images.length > 0 && (
            <div className="flex flex-wrap">
              {images.map((image, index) => {
                return (
                  <div className="relative" key={image}>
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <img
                      src={`${apiUrl}${image}`}
                      className="w-44 h-44 object-cover"
                    />
                    <IoMdClose
                      className="absolute cursor-pointer top-1.5 right-1.5 hover:text-white"
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
              text={"Upload Before Images"}
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
                        src={`${apiUrl}${video}`}
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
              text={"Upload Before Videos"}
              name="video"
              accept=".mp4, .webm, .ogg"
            />
          </div>
        </>
      )}

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
