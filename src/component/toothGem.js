import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import ToothGem from "../assets/tooth-gen.png";
import Gem from "../assets/Gem.png";
import { AUTHHEADERS } from "../commonFunctions/Headers";

const ToothGems = () => {
  const { t } = useTranslation();
  const { setUser, selectedTeeth, setSelectedTeeth, setFinalUser,setAlert, alert, setAlertMessage } =
    React.useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    redrawCanvas();
  }, [selectedTeeth]);

  const handleUndo = () => {
    const updatedSelectedTeeth = [...selectedTeeth];
    updatedSelectedTeeth.pop(); // Remove the last selected tooth
    setSelectedTeeth(updatedSelectedTeeth);
  };

  const handleToothClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width * 0.005;
    const y = e.clientY - rect.top;
  
    // Define the parameters for the tooth areas
    const toothArea = {
      centerX: canvas.width * 0.5 - canvas.width * 0.005 + canvas.width * 0.005,
      centerY: canvas.height * 0.55 + canvas.height * 0.005,
      outerRadiusX: canvas.width * 0.2691 + canvas.width * 0.005,
      outerRadiusY: canvas.height * 0.2,
    };
  
    // Check if the click is within the defined curves
    const isInsideDefinedCurves =
      (x - toothArea.centerX) ** 2 / toothArea.outerRadiusX ** 2 +
      (y - toothArea.centerY) ** 2 / toothArea.outerRadiusY ** 2 <=
      1;
  
    if (isInsideDefinedCurves) {
      if (e.ctrlKey) {
        handleUndo();
      } else {
        const selectedTooth = "Upper Tooth";
        const maxSize = isMobile ? 30 : 70;
        const minSize = isMobile ? 10 : 20;
        const centerX = toothArea.centerX;
        const sizeDelta = maxSize - minSize;
  
        // Calculate the size based on the distance from the center
        const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - toothArea.centerY, 2));
        const size = Math.max(
          minSize,
          maxSize - sizeDelta * (distanceFromCenter / toothArea.outerRadiusX)
        );
  
        setSelectedTeeth([
          ...selectedTeeth,
          { coordinates: { x, y }, label: selectedTooth, size: Math.floor(size) },
        ]);
      }
    }
  };
  

  const handleImageUpload = async () => {
    const canvas = canvasRef.current;
    const imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 1)
    );

    const formData = new FormData();
    formData.append("profile", imageBlob);
 if(selectedTeeth.length > 0){

   try {
     const response = await fetch(`${apiUrl}/upload`, {
       method: "POST",
       body: formData,
       headers : AUTHHEADERS()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser((prev) => ({ ...prev, level1: data.profile_url }));
        setFinalUser((prev) => ({ ...prev, level1: data.profile_url, level2:null, levl3:null , level4:null }));
        navigate("/medical-form");
      } else {
        console.error(
          "Failed to upload image. Server returned:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }else{
    setAlert(!alert)
    setAlertMessage(t('Please select at least one tooth'))
  }
  };
  
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = ToothGem;
    image.onload = () => {
      context.drawImage(image, -25, 0, isMobile ? canvas.width+70 : canvas.width+90, canvas.height);
      selectedTeeth.forEach((tooth) => {
        const { x, y } = tooth.coordinates;
        const newImage = new Image();
        newImage.src = Gem;
        newImage.onload = () => {
          const gemSize = tooth.size;
          context.drawImage(
            newImage,
            x - gemSize / 2,
            y - gemSize / 2,
            gemSize,
            gemSize
          );
        };
      });
    };
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <label className="text-yellow-500 md:text-4xl font-bold uppercase">
        {t("Tooth gem")}
      </label>
      <label className="text-yellow-500 md:text-3xl font-bold uppercase">
        {t("Select a Tooth")}
      </label>
      <canvas
        ref={canvasRef}
        width={isMobile ? 300 : 900}
        height={isMobile ? 200 : 500}
        onClick={handleToothClick}
        style={{ border: "1px solid #000", backgroundColor: "transparent" }}
      ></canvas>

      <button
        className={`yellowButton py-2 px-${
          isMobile ? "3" : "5"
        } rounded-3xl font-bold mb-2 mr-2`}
        onClick={handleUndo}
      >
        {t("Undo")}
      </button>
      <div className="flex justify-between w-full">
        <button
          className={`yellowButton py-2 px-${
            isMobile ? "3" : "5"
          } rounded-3xl font-bold mb-2 mr-2 flex gap-1 items-center`}
          onClick={handlePrev}
        >
          <IoMdArrowRoundBack />
          {t("Back")}
        </button>
        <button
          className={`yellowButton py-2 px-${
            isMobile ? "3" : "5"
          } rounded-3xl font-bold mb-2 mr-2`}
          onClick={handleImageUpload}
        >
          {t("Upload")}
        </button>
      </div>
    </div>
  );
};

export default ToothGems;
