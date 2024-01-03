import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import GridLayout from "../Layout/GridLayout";
import AlertModal from "../modal/AlertModal";
import { useTranslation } from "react-i18next";

function TattooDashboard() {
  const navigate = useNavigate();
  const { user, setUser , alert , setAlert , setAlertMessage} = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.tattooLocation){
      setSelected(user.tattooLocation)
    }
    if(user.bodyPart){
      setUser(prev=>({
        ...prev , bodyPart : null
      }))
    }
  },[])

  const handletattooLocation = (tattooLocation) => {
    setSelected(tattooLocation)
  };

 
  const buttons = [
    {
      name: "head",
    },
    {
      name: "chest",
    },
    {
      name: "torso",
    },
    {
      name: "back",
    },
    {
      name: "arm",
    },
    {
      name: "hand"
    },
    {
      name: "hip"
    },
    {
      name: "glute"
    },
    {
      name: "leg",
    },
    {
      name: "foot",
    },
    {
      name: "neck",
    },
    {
      name: "pelvic",
    },
  ];
  
  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, tattooLocation : selected});
      navigate(`/${selected}`)
    }
    else{
      setAlertMessage(t("Please select your tattoo location"))
      setAlert(!alert)
    }
  }

  const handlePrev = ()=>{
      navigate(-1)
  }

  return (
    <>
    <GridLayout title={"Tattoo"}>
        { buttons.map((button, index) => {
          return (
              <CustomButton
              key={index}
                onClick={handletattooLocation}
                selected={selected}
                >
                {button.name}
              </CustomButton>
          );
        }) 
      }
     </GridLayout>
     <Navigation next={handleNext}  prev={handlePrev} />
      </>
  );
}

export default TattooDashboard;
