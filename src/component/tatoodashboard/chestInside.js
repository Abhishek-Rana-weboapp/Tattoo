import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';

function ChestInside() {
  const progressValue = 40;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.level3) setSelected(user.level3)
},[])

  const collarboneButtons = [
    {
      name: "left"
    },
    {
      name: "right"
    },
    {
      name: "both"
    }
  ]

  const nippleButtons = [
    {
      name: "left"
    },
    {
      name: "right"
    },
    {
      name:"both"
    }
  ]

  const underButtons = [
    {
      name: "left"
    },
    {
      name: "right"
    },
    {
      name:"full"
    }
  ]

  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, level3:selected });
      navigate("/description");
    }else{
      setAlert(!alert)
      setAlertMessage(t("Please select an option"))
    }
  }

  const handlePrev = ()=>{
   navigate(-1)
  }

  const handlepartLocation = (bodyPart) => {
   setSelected(bodyPart)
  }
    return (
      <>
      <GridLayout title={"chest"}>
       {user.level2 === "collarbone" &&
           collarboneButtons.map((button, index)=>{
             return <CustomButton onClick={handlepartLocation} selected={selected} key={index}>{button.name}</CustomButton>
           })
         }
         {user.level2 === "nipple" &&
           nippleButtons.map((button, index)=>{
             return <CustomButton onClick={handlepartLocation} selected={selected} key={index}>{button.name}</CustomButton>
           })
         }
          {user.level2 === "under-chest" &&
           underButtons.map((button, index)=>{
             return <CustomButton onClick={handlepartLocation} selected={selected} key={index}>{button.name}</CustomButton>
           })
         }
      </GridLayout>
       <Navigation next={handleNext} prev={handlePrev} />
      </>
     
  
    );
  }
  
export default ChestInside


