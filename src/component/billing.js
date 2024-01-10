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

  useEffect(() => {
    setIsVisible(true);
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    await axios
      .get(`${apiUrl}/artist/appointment_list`)
      .then((res) => setAppointments(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const [billingData, setBillingData] = useState({
    username: updateAppointment?.username,
    price: 10,
    fix: "",
    before_image: "",
    after_image: "",
    start_time: "",
    end_time: "",
  });

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
  };

  const handleStartDate = () => {
    if (updateAppointment.typeofservice === "tattoo") {
      if (beforeImage) {
        setIsRunning(!isRunning);
        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16);
        console.log(formattedDateTime);
        setBillingData((prevData) => ({
          ...prevData,
          start_time: formattedDateTime,
        }));
      } else {
        setAlertMessage("Please Provide before Image");
        setAlert(!alert);
      }
    }
    if (updateAppointment.typeofservice !== "tattoo") {
      setIsRunning(!isRunning);
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
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    setBillingData((prevData) => ({
      ...prevData,
      end_time: formattedDateTime,
    }));
    setStep(5)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
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
            if (updateAppointment?.typeofservice === "tattoo") {
              setStep(3);
            } else {
              setStep(4);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      setAlertMessage("Please Enter the skin explanation");
      setAlert(!alert);
    }
  };

  console.log(updateAppointment);

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

  const handleAfterButton = () => {
    afterRef?.current?.click();
  };

  const handleBillingSubmit = () => {
    if (afterImage) {
      axios
        .post(`${apiUrl}artist/calculate-billing`, billingData)
        .then((billingResponse) => {
          // Handle billing response
          setFinalPrice(billingResponse.data.finalPrice);
          setAlertMessage(
            `Final Price : $${billingResponse?.data?.finalPrice}`
          );
          setAlert(true);
        })
        .catch((error) => {
          // Handle billing error
          console.error("Billing error:", error);
        });
    } else {
      setAlertMessage("Please provide all details");
      setAlert(!alert);
    }
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

  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
      {step === 1 && (
        <PriceComponent
          updateAppointment={updateAppointment}
          billingData={billingData}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}

      {step === 2 && <SkinCondition onClick={handleUpdateSkin} handlePrev={handlePrev} />}
      {/* <div className='w-full flex gap-4 justify-center'> */}
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

              {/* <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'before_image')} /> */}
            </div>
          )}
        </>
      )}

      {/* </div> */}

      {/* Image upload for after */}

      {/* <input type="datetime-local" name="start_time" value={billingData.start_time} onChange={handleInputChange} /> */}
      {step === 4 && (
        <div className="flex flex-col items-center w-full h-full justify-center">
          <Timer isRunning={isRunning} setIsRunning={setIsRunning} />
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
        </div>
      )}

      {step === 5 && billingData.start_time && billingData.end_time && (
        <>
          <div className="flex flex-col gap-2 items-center">
            <label>After Image:</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
              ref={afterRef}
              style={{ display: "none" }} // Hide the input element
              onChange={(e) =>
                handleImageUpload(e.target.files[0], "after_image")
              }
            />
            <button
              className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
              onClick={handleAfterButton}
            >
              Upload After Image
            </button>
            {/* <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'after_image')} /> */}
            {uploadedImages.after_image && (
              <img src={afterImage} alt="After" className="w-40 h-40" />
            )}
          </div>

          <button
            className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
            onClick={handleBillingSubmit}
          >
            Calculate
          </button>
        </>
      )}
    </div>
  );
};

export default BillingComponent;
