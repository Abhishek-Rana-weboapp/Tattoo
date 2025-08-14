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

export default function UploadAfterImage() {
  const { appointment, setAppointment } = useAppointmentContext();
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
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
    const hasImages = images && images.length > 0;
    const hasVideos = videos && videos.length > 0;
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

      updates.adminProcessStep = 9;
    } else if (isTattooNotSelected) {
      updates.adminProcessStep = 9;
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
      navigate("/billing/7");
    }else{
      navigate("/billing/6")
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

      const response = await axiosInstance.post("/upload", formData);
      if (response.status === 200) {
        if (name === "image") {
          setImages(response.data.profile_urls);
        } else {
          setVideos(response.data.profile_urls);
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
                      src={`${apiUrl}${image}`}
                      className="w-44 h-44  object-cover"
                    />
                    <IoMdClose
                      className="absolute cursor-pointer top-1.5 right-1.5 hover:text-gray-500"
                      // onClick={() => handleDeleteImage(index)}
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
                        src={`${apiUrl}${video}`}
                        type="video/mp4"
                      ></source>
                    </video>
                    <IoMdClose
                      className="absolute cursor-pointer top-1.5 right-1.5 hover:text-white"
                      // onClick={() => handleDeleteVideo(index)}
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



// import axios from "axios";
// import { useContext, useEffect, useRef, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { apiUrl } from "../../../url";
// import UserContext from "../../../context/UserContext";
// import { useTranslation } from "react-i18next";
// import { decodeUrls, encodeUrls } from "../../../commonFunctions/Encoders";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../loader/Loader";
// import LoaderModal from "../../modal/LoaderModal";
// import { AUTHHEADERS } from "../../../commonFunctions/Headers";

// export default function UploadAfterImage({
//   updateAppointment,
//   setUpdateAppointment,
//   handlePrev
// }) {
//   const navigate = useNavigate();
//   const { alert, setAlert, setAlertMessage } = useContext(UserContext);
//   const { t } = useTranslation();
//   const [uploadedUrls, setUploadedUrls] = useState([]);
//   const [imageStatus, setImageStatus] = useState("IDLE");
//   const [uploadedVideoUrl, setUploadedVideoUrl] = useState([]);
//   const [videoStatus, setVideoStatus] = useState("IDLE");
//   const [loading, setLoading] = useState(false)


//   useEffect(()=>{
//       if(updateAppointment.after_image){
//         setUploadedUrls(decodeUrls(updateAppointment.after_image))
//       }

//       if(updateAppointment.video_url){
//         setUploadedVideoUrl(decodeUrls(updateAppointment.video_url))
//       }
//   },[])

//   const imageRef = useRef(null);
//   const videoRef = useRef(null);

//   const uploadFile = async (file) => {
//     const formData = new FormData();
//     formData.append("profiles", file);
//     try {
//       const response = await axios.post(`${apiUrl}upload`, formData, {headers:AUTHHEADERS()});
//       return response.data.profile_url;
//     } catch (err) {
//       console.error("File Upload Failed", err.message);
//       return null;
//     }
//   };

//   const handleAfterButton = () => {
//     imageRef?.current?.click();
//   };

//   const handleAfterVideoButton = () => {
//     videoRef?.current?.click();
//   };


//   const handleAfterVideo = async (e) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles.length === 0) {
//       setAlertMessage(t("Please upload a video"));
//       setAlert(!alert);
//       return;
//     } else {
//       setVideoStatus("UPLOADING");
//       const uploadPromises = Array.from(selectedFiles).map(uploadFile);
//       const urls = await Promise.all(uploadPromises);
//       const filteredUrls = urls.filter((url) => url !== null);
//       setVideoStatus("IDLE");
//       videoRef.current.value=""
//       setUploadedVideoUrl((prev) => [...prev, ...filteredUrls]);
//     }
//   };


//   const handleAfterImage = async (e) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles.length === 0) {
//       setAlert(!alert);
//       setAlertMessage(t("Please upload  an image"));
//       return;
//     }
//     setImageStatus("UPLOADING");
//     const uploadPromises = Array.from(selectedFiles).map(uploadFile);
//     const urls = await Promise.all(uploadPromises);
//     imageRef.current.value=""
//     setImageStatus("IDLE");
//     setUploadedUrls((prev) => [...prev, ...urls]);
//   };

//   const handleDeleteImage = (index) => {
//     setUploadedUrls(
//       uploadedUrls.filter((img, imageIndex) => {
//         if (imageIndex !== index) return img;
//       })
//     );
//   };

//   const handleDeleteVideo = (index) => {
//     setUploadedVideoUrl(uploadedVideoUrl.filter((vid, vidIndex)=>vidIndex !== index))
//   };

//   const handleNext = async () => {
//     let data;
//     if (uploadedUrls.length > 0 || uploadedVideoUrl.length > 0) {
//       setLoading(true)
//       if (uploadedUrls.length > 0 && uploadedVideoUrl.length === 0) {
//         const encodedAfterImage = encodeUrls(uploadedUrls);
//         data = {
//           updates: [
//             {
//               id: updateAppointment?.id,
//               updateField: "after_image",
//               updateValue: encodedAfterImage,
//             },
//             {
//               id: updateAppointment?.id,
//               updateField: "process_step",
//               updateValue: 9,
//             },
//           ],
//         };
//       }
//       if (uploadedUrls.length === 0 && uploadedVideoUrl.length > 0) {
//         const encodedAfterVideo = encodeUrls(uploadedVideoUrl);
//         data = {
//           updates: [
//             {
//               id: updateAppointment?.id,
//               updateField: "video_url",
//               updateValue: encodedAfterVideo,
//             },
//             {
//               id: updateAppointment?.id,
//               updateField: "process_step",
//               updateValue: 9,
//             },
//           ],
//         };
//       }
//        if (uploadedUrls.length > 0 && uploadedVideoUrl.length > 0) {
//         const encodedAfterImage = encodeUrls(uploadedUrls);
//         const encodedAfterVideo = encodeUrls(uploadedVideoUrl);
//         data = {
//           updates: [
//             {
//               id: updateAppointment?.id,
//               updateField: "after_image",
//               updateValue: encodedAfterImage,
//             },
//             {
//               id: updateAppointment?.id,
//               updateField: "video_url",
//               updateValue: encodedAfterVideo,
//             },
//             {
//               id: updateAppointment?.id,
//               updateField: "process_step",
//               updateValue: 9,
//             },
//           ],
//         };
//       }
//         await axios.post(`${apiUrl}artist/post_new`, data, {headers : AUTHHEADERS()}).
//         then((res) => {
//           setUpdateAppointment(res.data.updatedtable);
//           setLoading(false)
//           navigate(`/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`);
//         }).catch(err=>{
//               setLoading(false)
//               setAlert(!alert);
//             setAlertMessage(t("Something went wrong"));
//             return;
//             })
//     } else {
//       setAlert(!alert);
//       setAlertMessage(t("Please upload a image or video"));
//       return;
//     }
//   };

//   if(loading){
//     return <LoaderModal/>
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-4 items-center overflow-hidden">
//         <h3>{t("After Image")}</h3>
//         <div className="flex flex-col gap-2 items-center overflow-hidden">
//           {/* Images preview */}
//           <div className="flex flex-wrap gap-2 overflow-auto">
//             {uploadedUrls.length !== 0 && uploadedUrls.map((image, index) => {
//               return (
//                 <div className="relative">
//                   <img
//                     key={image}
//                     src={image}
//                     alt={`after-${index}`}
//                     className="w-40 h-40 rounded-lg"
//                   ></img>
//                   <IoMdClose
//                     className="img-del-icon"
//                     onClick={() => handleDeleteImage(index)}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <input
//             type="file"
//             accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
//             ref={imageRef}
//             multiple
//             style={{ display: "none" }} // Hide the input element
//             onChange={handleAfterImage}
//           />
//           <button
//             className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
//             onClick={handleAfterButton}
//             disabled={imageStatus === "UPLOADING"}
//           >
//             {imageStatus === "UPLOADING" ? <Loader/> : (t("After Image"))}
//           </button>
//         </div>

//         <>
//           {/* Video Preview */}
//           {uploadedVideoUrl.length !== 0 && (
//             <div className="w-30 h-30 flex md:flex-row flex-col gap-2 overflow-auto">
//               {uploadedVideoUrl.map((url, index) => {
//                 return (
//                   <div className="relative">
//                     <video controls width="320" height="240">
//                       <source src={url} type="video/mp4"></source>
//                     </video>
//                     <IoMdClose
//                       className="img-del-icon"
//                       onClick={()=>handleDeleteVideo(index)}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//           <input
//             type="file"
//             accept=".mp4, .webm, .ogg" // Specify allowed file types
//             ref={videoRef}
//             multiple
//             style={{ display: "none" }} // Hide the input element
//             onChange={handleAfterVideo}
//           />
//           <button
//             className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
//             onClick={handleAfterVideoButton}
//             disabled={videoStatus === "UPLOADING"}
//           >
//             {videoStatus === "UPLOADING" ? <Loader/> : t("Upload Video")}
//           </button>
//         </>
//       </div>
//       <div className="flex justify-center gap-4">
//       <button
//         className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
//         onClick={handlePrev}
//         // disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
//       >
//         {t("Back")}
//       </button>

//       <button
//         className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
//         onClick={handleNext}
//         disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
//         >
//         {t("Save")}
//       </button>
//         </div>
//     </>
//   );
// }
