import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import SkinCondition from "./skinCondition";
import { data } from "autoprefixer";
import { apiUrl } from "../url";
import Timer from "./timer/Timer";

const BillingComponent = () => {
  const { setIsVisible, setAlert, setAlertMessage, alert,updateAppointment , setUpdateAppointment } =
    useContext(UserContext);
  const beforeRef = useRef();
  const afterRef = useRef();
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [appointments, setAppointments] = useState()
  const [beforeImage, setBeforeImage] = useState()
  const [afterImage, setAfterImage] = useState()

  useEffect(() => {
    setIsVisible(true);
    fetchAppointments()
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
    fix: "yes",
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

  const handleStartDate = () => {
    if(beforeImage){
      setIsRunning(!isRunning);
      const now = new Date();
      const formattedDateTime = now.toISOString().slice(0, 16).replace("T", " ");
      setBillingData((prevData) => ({
        ...prevData,
        start_time: formattedDateTime,
      }));
    }else{
      setAlertMessage("Please Provide before Image")
      setAlert(!alert)
    }
  };

  const handleEndDate = () => {
    setIsRunning(!isRunning);
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16).replace("T", " ");
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

  const handleUpdateSkin = async (value, field) => {
    if (value) {
      const data = {
        id: updateAppointment?.id,
        updateField: field,
        updateValue: value,
      };
      await axios
        .post(`${apiUrl}/artist/post_new`, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } else {
      setAlertMessage("Please Enter the skin explanation");
      setAlert(!alert);
    }
  };

  console.log(updateAppointment);

  const handleImageUpload = async (imagePath, type) => {
    const url = URL.createObjectURL(imagePath)
    if(type === "before_image"){
      setBeforeImage(url)
    }
    if(type === "after_image"){
      setAfterImage(url)
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
    if(beforeImage && afterImage){

      axios
      .post("http://localhost:8080/artist/calculate-billing", billingData)
      .then((billingResponse) => {
        // Handle billing response
        setFinalPrice(billingResponse.data.finalPrice);
        setAlertMessage(`Final Price : $${billingResponse?.data?.finalPrice}`)
        setAlert(true)
      })
      .catch((error) => {
        // Handle billing error
        console.error("Billing error:", error);
      });
    }else{
      setAlertMessage("Please provide all details")
      setAlert(!alert)
    }
  };

  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
      <h1>Billing</h1>
      {/* <label>
        Username:
        <input type="text" name="username" value={billingData.username} onChange={handleInputChange} placeholder="Username" />
      </label> */}
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="flex gap-2 items-center">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            className="p-2 rounded-xl text-black"
            disabled={updateAppointment?.typeofservice !== "tattoo" ? true : false}
            value={billingData.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
        </div>

        {updateAppointment.typeofservice === "tattoo" &&
          <div className="flex gap-2 items-center">
          <label>
            Fix Price:
            </label>
            <select
              name="fix"
              value={billingData.fix}
              className="p-2 rounded-xl text-black font-semibold"
              onChange={handleInputChange}
            >
              <option value="yes" className="text-black font-semibold">Yes</option>
              <option value="no" className="text-black font-semibold">No</option>
            </select>
        </div>
}
      </div>

      {/* <div className='w-full flex gap-4 justify-center'> */}
      {updateAppointment?.typeofservice === "tattoo" &&<div className="flex flex-col md:flex-row gap-2 items-center">
        {/* Image upload for before */}
        <label>Before Image:</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
          ref={beforeRef}
          style={{ display: "none" }} // Hide the input element
          onChange={(e) => handleImageUpload(e.target.files[0], "before_image")}
        />
        <button
          className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
          onClick={handleBeforeButton}
        >
          Upload Before Image
        </button>

        {/* <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'before_image')} /> */}
        {uploadedImages.before_image && (
          <img
            src={beforeImage}
            alt="Before"
            className="w-20 h-20"
          />
        )}
      </div>}

      <SkinCondition onClick={handleUpdateSkin} />
      {/* </div> */}

      {/* Image upload for after */}
      

      {/* <input type="datetime-local" name="start_time" value={billingData.start_time} onChange={handleInputChange} /> */}
      <div>
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
        ) }
        {
          isRunning && !billingData.end_time &&
          (
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

{
   billingData.start_time && billingData.end_time &&
   <>
      <div className="flex flex-col gap-2 items-center">

      <label>
        After Image:
        </label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
          ref={afterRef}
          style={{ display: "none" }} // Hide the input element
          onChange={(e) => handleImageUpload(e.target.files[0], "after_image")}
          />
        <button
          className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
          onClick={handleAfterButton}
          >
          Upload After Image
        </button>
        {/* <input type="file" onChange={(e) => handleImageUpload(e.target.files[0], 'after_image')} /> */}
        {uploadedImages.after_image && (
          
          <img
          src={afterImage}
          alt="After"
          className="w-20 h-20"
          />
          )}
          </div>

      <button
        className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
        onClick={handleBillingSubmit}
        >
        Calculate
      </button>
</>
}

      {/* {finalPrice !== null && (
        <div
        style={{
          marginTop: "10px",
            backgroundColor: "#DFF2BF",
            padding: "10px",
            borderRadius: "4px",
          }}
          >
          <p>Final Price:</p>
          <strong>${finalPrice}</strong>
          </div>
        )} */}
    </div>
  );
};

export default BillingComponent;
