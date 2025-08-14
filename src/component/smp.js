import { useState } from "react";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";
import four from "../assets/4.png";
import five from "../assets/5.png";
import six from "../assets/6.png";
import seven from "../assets/7.png";
import eight from "../assets/8.png";
import nine from "../assets/9.png";
import ten from "../assets/10.png";
import eleven from "../assets/11.png";
import twelve from "../assets/12.png";
import thrteen from "../assets/13.png";
import fourteen from "../assets/14.png";
import fifteen from "../assets/15.png";
import sixteen from "../assets/16.png";
import { useNavigate } from "react-router-dom";

import SmpCard from "./card/SmpCard";
import SixGridLayout from "./Layout/SixGridLayout";
import Navigation from "./navigation/Navigation";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios";
import { useAppointmentContext } from "../context/AppointmentContext";
import LoaderModal from "./modal/LoaderModal";

const HairLossPatternSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
 const {appointmentData, setAppointmentData} = useAppointmentContext()
  const [selected, setSelected] = useState();
  const [loading, setLoading]= useState(false)

  const images = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thrteen,
    fourteen,
    fifteen,
    sixteen,
  ];

  const handlePatternSelection = (image) => {
    setSelected(image);
  };

  const handleNext = async() => {
    if(!selected){
      toast.error("Please select an option");
      return
    }

    try {
      setLoading(true)
      const res = await fetch(selected);
    const blob = await res.blob();
    const file = new File([blob], "pattern.png", { type: blob.type });
      const formData = new FormData();
      formData.append("profiles", file)
      const response = await axiosInstance.post("upload",formData )
      if(response.status === 200){
         setAppointmentData(prev=>({
          ...prev , bodyLocation : JSON.stringify({
            1 :{
               level1: response.data.profile_urls[0]
            }
          })
         }))
         navigate("/medical-form")
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
      console.log(error)
    }finally{
      setLoading(false)
    }

  };

  const handlePrev = () => {
    navigate(-1);
  };

  if(loading){
    return <LoaderModal />
  }

  return (
    <>
      <SixGridLayout
        title={"smp"}
        heading={t(
          "Which image most closely resembles your hair loss pattern?"
        )}
      >
        {images.map((image, index) => (
          <SmpCard
            key={index}
            image={image}
            onClick={handlePatternSelection}
            selected={selected}
          />
        ))}
      </SixGridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
    </>
  );
};

export default HairLossPatternSelection;
