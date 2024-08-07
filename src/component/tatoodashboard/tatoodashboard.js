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
  const { user, setUser , alert , setAlert , setAlertMessage,currentSelection} = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.level1){
      setSelected(user.level1)
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
      name: "neck",
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
      name: "glutes"
    },
    {
      name: "pelvic",
    },
    {
      name: "leg",
    },
    {
      name: "foot",
    },
  ];
  
  const handleNext = ()=>{
    if(selected){
      if(user.level1 !== selected){
      setUser({ ...user, level1 : selected, level2:null, level3:null, level4:null});
      }else{
        setUser({ ...user, level1 : selected});
      }
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
    <GridLayout title={"Tattoo"} subTitle={`Please Select location for tattoo ${currentSelection}`}>
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
