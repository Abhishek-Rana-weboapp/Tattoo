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
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [bill, setBill] = useState()
  const [resultantMinutes, setResultantMinutes] = useState()

const selectedAppointment= JSON.parse(sessionStorage.getItem("selectedAppointment"))

  useEffect(() => {
    setIsVisible(true);
    fetchAppointments();
    if(selectedAppointment ){
      if(selectedAppointment.length > 0){
        setUpdateAppointment(selectedAppointment[0])
      }
    }else{
      navigate("/artist-dashboard")
    }
  }, []);
  
  
  useEffect(()=>{
    if(updateAppointment){
      setBillingData(prev=>({...prev, bill_by :updateAppointment?.ArtistPiercerNames, username:updateAppointment?.username, id:updateAppointment?.id }))
    }
  },[updateAppointment])

  const fetchAppointments = async () => {
    await axios
      .get(`${apiUrl}/artist/appointment_list`)
      .then((res) => setAppointments(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const [billingData, setBillingData] = useState({
    username: "",
    id:"",
    price: 0,
    fix: "",
    before_image: "",
    after_image: "",
    start_time: "",
    end_time: "",
    break_time:"",
    bill_by:""
  });

  console.log(billingData)

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (step === 4 && !billingData.end_time) {
        const message = "You have unsaved data. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };
  
    const handlePopstate = (event) => {
      if (event.state && event.state.direction === "back" && step === 4 && !billingData.end_time) {
        const message = "You have unsaved data. Are you sure you want to leave?";
        const isConfirmed = window.confirm(message);
  
        if (!isConfirmed){
          window.history.forward();
        }
      }
    };
  
    const handleBeforeReload = (event) => {
      if (step === 4 && !billingData.end_time) {
        const message = "You have unsaved data. Reloading will discard your changes. Are you sure?";
        const isConfirmed = window.confirm(message);
  
        if (!isConfirmed) {
          event.preventDefault();
        }
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("beforereload", handleBeforeReload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("beforereload", handleBeforeReload);
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
    if(step === 4){
      setStep(5)
    }
  };

  const handleStartDate = () => {
    if (updateAppointment?.typeofservice === "tattoo") {
      if (beforeImage) {
        setIsRunning(!isRunning);
        setStartTime(formatStartTime())
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
      setStartTime(formatStartTime())
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
    setEndTime(formatEndTime())
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

  const handlePrice = (name , value)=>{
    setBillingData(prev=>({
      ...prev, [name]:value
    }))
  }

  console.log("price" ,billingData.price)

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
             axios.get(`${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`).then(response=>{
              if(response.status === 200){
                setUpdateAppointment(response.data.data[0])
                if (response?.data.data[0]?.typeofservice === "tattoo") {
                  setStep(3);
                } else {
                  setStep(4);
                }
              }
              })
          })
          .catch((err) => console.log(err));
      }
    } else {
      setAlertMessage("Please Enter the skin explanation");
      setAlert(!alert);
    }
  };  


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
        .post(`${apiUrl}/artist/calculate-billing`, billingData)
        .then((billingResponse) => {
          // Handle billing response
          setFinalPrice(billingResponse.data.finalPrice);
          setBill(billingResponse.data.insertedData)
          setStep(6)
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

  
  useEffect(()=>{
    if(bill){
      const startTime = new Date(bill.start_time)
    const endTime = new Date(bill.end_time)
    setResultantMinutes((endTime - startTime)/1000)
  }
},[bill])

const formatStartTime = () => {
  const startTime = new Date();
  const hours = startTime.getHours();
  const minutes = startTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${String(hours % 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
};

const formatEndTime = () => {
  const endTime = new Date();
  const hours = endTime.getHours();
  const minutes = endTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${String(hours % 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
};



console.log(bill  )
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
        <div className="flex flex-col items-center w-full h-full">
          <Timer isRunning={isRunning} setIsRunning={setIsRunning} startTime={startTime} endTime={endTime} billingData={billingData} setBillingData={setBillingData} />
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
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      )}

      {step === 5 && billingData.start_time && billingData.end_time && (
        <>
          <div className="flex flex-col gap-2 items-center">
            <h3 >After Image</h3>
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
      {
        step === 6 && <div className="flex flex-col gap-2 items-center">
          <h3 className="font-bold text-white">Bill</h3>
          <label className="text-xl font-semibold">Price calculation</label>
          <div className="flex gap-2 ">
            <label>Bill by : </label>
            <label>{bill.bill_by}</label>
          </div>
          <div className="flex gap-2 ">
            <label>Total Time : </label>
            <label>{resultantMinutes
    ? `${String(Math.floor(resultantMinutes / 3600)).padStart(2, '0')} : ${String(
      Math.floor((resultantMinutes % 3600) / 60)
    ).padStart(2, '0')}`
    : '00:00'}</label>
          </div>
          <div className="flex gap-2 ">
            <label>Break Time : </label>
            <label>{String(Math.floor(bill.break_time/60)).padStart(2, "0")} : {String(Math.floor(bill.break_time%60)).padStart(2, "0")}</label>
          </div>
          <div className="flex gap-2 ">
            <label>Total Work Time : </label>
            <label>{`${String(Math.floor(bill.totalWorkingTime / 3600)).padStart(2, '0')} : ${String(
            Math.floor((bill.totalWorkingTime % 3600) / 60)
          ).padStart(2, '0')}`}</label>
          </div>

          <div className="flex gap-2 ">
            <label className="text-xl font-bold">Total Price : </label>
            <label className="text-xl font-bold">{parseInt(bill.price)}$</label>
          </div>
        </div>
      }
      
    </div>
  );
};

export default BillingComponent;
