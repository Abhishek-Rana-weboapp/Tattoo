import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import SkinCondition from "./skinCondition";
import { data } from "autoprefixer";
import { apiUrl } from "../url";
import Timer from "./timer/Timer";
import PriceComponent from "./sub-Components/billing/PriceComponent";
import { useNavigate } from "react-router-dom";
import ShowBill from "./sub-Components/billing/ShowBill";
import UploadAfterImage from "./sub-Components/billing/UploadAfterImage";
import CompleteAgreement from "./sub-Components/billing/CompleteAgreement";
import { decodeUrls, encodeUrls } from "../commonFunctions/Encoders";

const BillingComponent = () => {
  const {
    setIsVisible,
    setAlert,
    setAlertMessage,
    alert,
    updateAppointment,
    setUpdateAppointment,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const beforeRef = useRef();
  const afterRef = useRef();
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [appointments, setAppointments] = useState();
  const [beforeImage, setBeforeImage] = useState();
  const [afterImage, setAfterImage] = useState();
  const [step, setStep] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bill, setBill] = useState({});
  const [resultantMinutes, setResultantMinutes] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const videoRef = useRef();
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [encodedUrlString, setEncodedUrlString] = useState([]);
  const artistLogged = sessionStorage.getItem("fullname");

  const selectedAppointment = JSON.parse(
    sessionStorage.getItem("selectedAppointment")
  );

  useEffect(() => {
    setIsVisible(true);
    fetchAppointments();
    if (selectedAppointment) {
      if (selectedAppointment.length > 0) {
        setUpdateAppointment(selectedAppointment[0]);
      }
    } else {
      navigate("/artist-dashboard");
    }
  }, []);

  useEffect(() => {
    if (updateAppointment) {
      setBillingData((prev) => ({
        ...prev,
        bill_by: artistLogged,
        username: updateAppointment?.username,
        id: updateAppointment?.id,
      }));
    }
  }, [updateAppointment]);

  const fetchAppointments = async () => {
    await axios
      .get(`${apiUrl}/artist/appointment_list`)
      .then((res) => setAppointments(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const [billingData, setBillingData] = useState({
    username: "",
    id: "",
    price: 0,
    fix: "",
    before_image: "",
    after_image: "",
    start_time: "",
    end_time: "",
    break_time: "",
    bill_by: "",
    video_url: "",
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (step === 4 && !billingData.end_time) {
        const message =
          "You have unsaved data. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    const handlePopstate = (event) => {
      if (step === 4 && !billingData.end_time) {
        const message =
          "You have unsaved data. Are you sure you want to leave?";
        const isConfirmed = window.confirm(message);

        if (!isConfirmed) {
          // If the user cancels, prevent the default behavior and stay on the current page.
          event.preventDefault();
          // You might also want to consider navigating forward again to keep the user on the same page.
          // window.history.forward();
        }
      }
    };

    const handleBeforeReload = (event) => {
      if (step === 4 && !billingData.end_time) {
        const message =
          "You have unsaved data. Reloading will discard your changes. Are you sure?";
        const isConfirmed = window.confirm(message);

        if (!isConfirmed) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("beforeunload", handleBeforeReload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("beforeunload", handleBeforeReload);
    };
  }, [step, billingData.end_time]);

  const [uploadedImages, setUploadedImages] = useState({
    before_image: null,
    after_image: null,
  });

  const [finalPrice, setFinalPrice] = useState(null);

  const handleNext = () => {
    if (step === 1) {
      if (billingData.fix) {
        if (billingData.price) {
          setStep(2);
        } else {
          setAlert(!alert);
          setAlertMessage(t("Please Enter the Price"));
        }
      } else {
        setAlert(!alert);
        setAlertMessage(t("Please Select an option"));
      }
    }
    if (step === 3) {
      if (beforeImage) {
        setStep(4);
      } else {
        setAlert(!alert);
        setAlertMessage(t("Please Provide an image"));
      }
    }
    if (step === 5) {
      setStep(6);
    }
    if (step === 6) {
      setStep(7);
    }
  };

  const handleStartDate = () => {
    if (updateAppointment?.typeofservice === "tattoo") {
      if (beforeImage) {
        setIsRunning(!isRunning);
        setStartTime(formatStartTime());
        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16);
        setBillingData((prevData) => ({
          ...prevData,
          start_time: formattedDateTime,
        }));
      } else {
        setAlertMessage("Please Provide before Image");
        setAlert(!alert);
      }
    }
    if (updateAppointment?.typeofservice !== "tattoo") {
      setIsRunning(!isRunning);
      setStartTime(formatStartTime());
      const now = new Date();
      const formattedDateTime = now.toISOString().slice(0, 16);
      setBillingData((prevData) => ({
        ...prevData,
        start_time: formattedDateTime,
      }));
    }
  };

  const handleEndDate = () => {
    setIsRunning(!isRunning);
    setEndTime(formatEndTime());
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    setBillingData((prevData) => ({
      ...prevData,
      end_time: formattedDateTime,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePrice = (name, value) => {
    setBillingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSkin = async (option, explanation, field) => {
    let data;
    if (option) {
      if (option === "good") {
        data = {
          id: updateAppointment?.id,
          updateField: field,
          updateValue: option,
        };
      }
      if (option === "bad") {
        if (explanation) {
          data = {
            id: updateAppointment?.id,
            updateField: field,
            updateValue: explanation,
          };
        } else {
          setAlert(!alert);
          setAlertMessage(t("Please enter the explanation"));
        }
      }
      if (data) {
        await axios
          .post(`${apiUrl}/artist/post_new`, data)
          .then((res) => {
            axios
              .get(
                `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
              )
              .then((response) => {
                if (response.status === 200) {
                  setUpdateAppointment(response.data.data[0]);
                  if (response?.data.data[0]?.typeofservice === "tattoo") {
                    setStep(3);
                  } else {
                    setStep(4);
                  }
                }
              });
          })
          .catch((err) => console.log(err));
      }
    } else {
      setAlertMessage("Please Enter the skin explanation");
      setAlert(!alert);
    }
  };

  const fetchBill = async()=>{
    await axios.get(`${apiUrl}/artist/billing_list_id?id=${bill.id}`)
    .then((res)=>{
      setBill(res.data.data[0])
      setStep(7)
    })
  }

  const handleBillingUpdate = async(afterImageUrls , afterVideoUrl)=>{
      if(afterImageUrls.length > 0){
        const encodedString = encodeUrls(afterImageUrls)
        const data = {
          id:bill?.id,
          updateField:"after_image",
          updateValue:encodedString
        }
        await axios.post(`${apiUrl}/artist/post_new_billing`, data)
        .then(res=>{
          if(afterVideoUrl){
            const videoData = {
              id:bill?.id,
              updateField:"video_url",
              updateValue:afterVideoUrl
            }
            axios.post(`${apiUrl}/artist/post_new_billing`, videoData)
            .then(response=>{
              fetchBill()
              return
            })
            .catch(err=>console.error(err))
          }else{
            fetchBill()
          }
        })
        .catch(err=>console.log(err))
      }
  }

  useEffect(() => {
    // This will be executed after uploadedUrls is updated
    const encodeList = encodeUrls(uploadedUrls);
    console.log(encodeList);
    setEncodedUrlString(encodeList);
  }, [uploadedUrls]);


  const handleImageUpload = async (imagePath, type) => {
    const url = URL.createObjectURL(imagePath);
    if (type === "before_image") {
      setBeforeImage(url);
    }
    if (type === "after_image") {
      setAfterImage(url);
    }
    const formData = new FormData();
    formData.append("profile", imagePath);
    await axios
      .post(`${apiUrl}/upload`, formData)
      .then((response) => {
        const imageUrl = response.data.profile_url;
        setBillingData((prevData) => ({
          ...prevData,
          [type]: imageUrl,
        }));

        // Display uploaded image
        setUploadedImages((prevImages) => ({
          ...prevImages,
          [type]: imageUrl,
        }));
      })
      .catch((error) => {
        // Handle image upload error
      });
  };

  const handleBeforeButton = () => {
    beforeRef?.current?.click();
  };


  const handleBillingSubmit = async () => {
    await axios
      .post(`${apiUrl}/artist/calculate-billing`, billingData)
      .then((billingResponse) => {
        const data = {
                  id: updateAppointment?.id,
                  updateField: "ArtistPiercerNames",
                  updateValue: artistLogged,
                };
                axios.post(`${apiUrl}/artist/post_new`, data).then((res) => {
                  if (res.status === 201) {
                    axios
                      .get(`${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`)
                      .then((res) => {
                        sessionStorage.setItem(
                          "selectedAppointment",
                          JSON.stringify(res.data.data)
                        );
                        setFinalPrice(billingResponse.data.finalPrice);
                        setBill(billingResponse.data.insertedData);
                        setStep(5);
                      })
                      .catch((err) => console.log(err));
                  }
                });
      })
      .catch((error) => {
        console.error("Billing error:", error);
      });
  };


  const handlePrev = () => {
    switch (step) {
      case 1:
        navigate(-1);
      case 2:
        setStep(1);
        break;

      case 3:
        setStep(2);
        break;

      case 4:
        if (updateAppointment?.typeofservice === "tattoo") {
          setStep(3);
        } else {
          setStep(2);
        }
    }
  };

  useEffect(() => {
    if (bill) {
      const startTime = new Date(bill.start_time);
      const endTime = new Date(bill.end_time);
      setResultantMinutes((endTime - startTime) / 1000);
    }
  }, [bill]);

  const formatStartTime = () => {
    const startTime = new Date();
    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${String(hours % 12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${ampm}`;
  };

  const formatEndTime = () => {
    const endTime = new Date();
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${String(hours % 12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${ampm}`;
  };

console.log(bill)
  
  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
      {step === 1 && (
        <PriceComponent
          updateAppointment={updateAppointment}
          billingData={billingData}
          handleInputChange={handleInputChange}
          handlePrice={handlePrice}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}

      {step === 2 && (
        <SkinCondition onClick={handleUpdateSkin} handlePrev={handlePrev} />
      )}

      {step === 3 && (
        <>
          {updateAppointment?.typeofservice === "tattoo" && (
            <div className="flex flex-col gap-2 items-center">
              {/* Image upload for before */}
              <h3>Please Provide Before Image:</h3>
              {uploadedImages.before_image && (
                <img src={beforeImage} alt="Before" className="w-40 h-40" />
              )}
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
                ref={beforeRef}
                style={{ display: "none" }} // Hide the input element
                onChange={(e) =>
                  handleImageUpload(e.target.files[0], "before_image")
                }
              />
              <button
                className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
                onClick={handleBeforeButton}
              >
                Upload Before Image
              </button>
              <div className="flex gap-5 items-center">
                <button
                  className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
                  onClick={handlePrev}
                >
                  Prev
                </button>
                <button
                  className="yellowButton py-2 text-black px-4 font-bold rounded-lg"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center w-full h-full gap-3">
          <Timer
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            startTime={startTime}
            endTime={endTime}
            billingData={billingData}
            setBillingData={setBillingData}
          />
          {!isRunning && !billingData.start_time && (
            <button
              name="start_time"
              className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
              value={billingData.start_time}
              onClick={handleStartDate}
            >
              Start
            </button>
          )}
          {isRunning && !billingData.end_time && (
            <button
              className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
              name="end_time"
              value={billingData.end_time}
              onClick={handleEndDate}
            >
              End
            </button>
          )}
          {billingData.end_time && billingData.start_time && (
            <button
              className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
              name="end_time"
              value={billingData.end_time}
              onClick={handleBillingSubmit}
            >
              Next
            </button>
          )}
        </div>
      )}

      {step === 5 && (
        <ShowBill
          bill={bill}
          resultantMinutes={resultantMinutes}
          handleNext={handleNext}
        />
      )}
      {step === 6 && (
        <UploadAfterImage
          handleBillingUpdate={handleBillingUpdate}
        />
      )}

      {step === 7 && <CompleteAgreement />}
    </div>
  );
};

export default BillingComponent;
