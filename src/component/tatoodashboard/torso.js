import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";

function Torso() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()

  useEffect(()=>{
    if(user.level2) setSelected(user.level2)
  },[])

  const handlePartLocation = (bodyPart) => {
    setSelected(bodyPart)
  };

  const buttons = [
    {
      name: "full torso",
    },
    {
      name: "left ribs",
    },
    {
      name: "right ribs",
    },
    {
      name: "stomach"
    },
    {
      name: "Belly Button",
    },
    {
      name: "Tummy tuck",
    }
  ];

  const handleNext = ()=>{
   if(selected){
    if(user.level2 !== selected){
      setUser({ ...user, level2 : selected, level3:null, level4:null});
    }else{
      setUser({ ...user, level2 : selected});
    }
    navigate("/count");
   }else{
    setAlert(!alert)
    setAlertMessage("Please select a part")
   }
  }

  const handlePrev = ()=>{
     navigate(-1)
  }

  return (
    <>
      <GridLayout title={"torso"}>
        {
          buttons.map((button , index)=>{
            return <CustomButton key={index} onClick={handlePartLocation} selected={selected} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext}  prev={handlePrev}/>
    </>
  );
}

export default Torso;

