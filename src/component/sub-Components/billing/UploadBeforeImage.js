import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiUrl } from "../../../url";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { decodeUrls, encodeUrls } from "../../../commonFunctions/Encoders";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../../modal/LoaderModal";
import { AUTHHEADERS } from "../../../commonFunctions/Headers";
import UploadButton from "../../buttons/UploadButton";

export default function UploadBeforeImage({
  handlePrev,
  updateAppointment,
  setUpdateAppointment,
}) {
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [imageStatus, setImageStatus] = useState("IDLE");
  const [videoStatus, setVideoStatus] = useState("IDLE");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (updateAppointment?.before_image) {
      setUploadedUrls(decodeUrls(updateAppointment.before_image));
      setSelected("yes")
    }

    if (updateAppointment.video_url) {
      setUploadedVideoUrl(decodeUrls(updateAppointment.before_video));
      setSelected("yes")
    }
  }, []);


  useEffect(()=>{
    if(updateAppointment.typeofservice === "tattoo") {
      if(selected === "no"){
        setUploadedUrls([])
        setUploadedVideoUrl([])
      }
    }
  },[selected])

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    try {
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: AUTHHEADERS(),
      });
      return response.data.profile_url;
    } catch (err) {
      setAlertMessage(t("File Upload Failed"));
      setAlert(!alert);
      return null;
    }
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
    const filteredUrls = urls.filter((url) => url !== null);
    setImageStatus("IDLE");
    setUploadedUrls((prev) => [...prev, ...filteredUrls]);
  };

  const handleDeleteImage = (index) => {
    setUploadedUrls(
      uploadedUrls.filter((img, imageIndex) => {
        if (imageIndex !== index) return img;
      })
    );
  };

  const handleNext = async () => {
    let data;
    if (uploadedUrls.length > 0 || uploadedVideoUrl.length > 0) {
      setLoading(true);
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
        .post(`${apiUrl}/artist/post_new`, data, { headers: AUTHHEADERS() })
        .then((res) => {
          setUpdateAppointment(res.data.updatedtable);
          setLoading(false);
          navigate(
            `/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`
          );
        })
        .catch((err) => {
          setLoading(false);
          setAlertMessage(t("Something went wrong"));
          setAlert(!alert);
          return;
        });
    } else {
      if(updateAppointment.typeofservice === "tattoo"  && selected === "no"){
         data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: "process_step",
              updateValue: 4,
            },
          ],
        }
        await axios
        .post(`${apiUrl}/artist/post_new`, data, { headers: AUTHHEADERS() })
        .then((res) => {
          setUpdateAppointment(res.data.updatedtable);
          setLoading(false);
          navigate(
            `/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`
          );
        })
        .catch((err) => {
          setLoading(false);
          setAlertMessage(t("Something went wrong"));
          setAlert(!alert);
          return;
        });
      }else{
        setAlert(!alert);
        setAlertMessage(t("Please upload a image or video"));
        return;
      }
    }
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
    setUploadedVideoUrl(
      uploadedVideoUrl.filter((vid, vidIndex) => vidIndex !== index)
    );
  };

  if (loading) {
    return <LoaderModal />;
  }

  const handleCheckboxes = (e) => {
    const value = e.target.value;
    if (value === selected) {
      setSelected("");
      return;
    }
    setSelected(value);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full items-center overflow-hidden ">
      {/* Image upload for before */}
      <h3>{t("Please Provide Before Image:")}</h3>
      <div className="flex flex-col gap-2 items-center overflow-hidden">
        {updateAppointment.typeofservice === "tattoo" && (
          <div className="space-y-3">
            <label
              className={`uppercase md:text-xl text-sm text-white md:font-bold flex gap-2`}
            >
              <span className="underline">{`Q1`}:</span>
              <span>{t("Is this a cover-up or fix-up?")}</span>
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
                {t("Yes")}
              </label>
              <label className="md:text-2xl text-lg uppercase text-white flex gap-2 items-center hover:cursor-pointer">
                <input
                  type="checkbox"
                  className=" w-6 h-6 "
                  value="no"
                  checked={selected === "no"}
                  onChange={handleCheckboxes}
                />
                {t("No")}
              </label>
            </div>
          </div>
        )}

      </div>



       { updateAppointment.typeofservice === "removal" ?<>
          {/* Images Previews */}
        {uploadedUrls.length !== 0 && (
          <div className="flex flex-wrap gap-2 overflow-auto">
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
            })}
          </div>
        )}
          <UploadButton accept={".jpg, .jpeg, .png, .pdf"} disabled={imageStatus === "UPLOADING"} handleInput={handleUploadBeforeImage}>Upload Before Image</UploadButton>
         


      {/* Videos previews */}

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
                    onClick={() => handleDeleteVideo(index)}
                  />
                </div>
              );
            })}
          </div>
        )}

        <UploadButton disabled={videoStatus === "UPLOADING"} handleInput={handleBeforeVideo} accept={".mp4, .webm, .ogg"}>Upload Video</UploadButton>
      </div>
      </> : (updateAppointment.typeofservice === "tattoo" && selected === "yes") && <>
          {/* Images Previews */}
        {uploadedUrls.length !== 0 && (
          <div className="flex flex-wrap gap-2 overflow-auto">
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
            })}
          </div>
        )}
          <UploadButton accept={".jpg, .jpeg, .png, .pdf"} disabled={imageStatus === "UPLOADING"} handleInput={handleUploadBeforeImage}>Upload Before Image</UploadButton>
         


      {/* Videos previews */}

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
                    onClick={() => handleDeleteVideo(index)}
                  />
                </div> 
              );
            })}
          </div>
        )}

        <UploadButton disabled={videoStatus === "UPLOADING"} handleInput={handleBeforeVideo} accept={".mp4, .webm, .ogg"}>Upload Video</UploadButton>
      </div>
      </>}

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
