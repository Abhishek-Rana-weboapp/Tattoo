import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ProgressBar from "../ProgressBar";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from 'react-i18next';
function PiercingDashboard() {
  const { t } = useTranslation();
  const progressValue = 20;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [partSelected, setPartSelected] = useState()
  const [selected, setSelected] = useState()

  const handlepartLocation = (bodyPart) => {
    setSelected()
    setPartSelected(bodyPart)
  };
  const handpiercingLocation = (piercingLocation) => {
    setPartSelected()
    setSelected(piercingLocation)
  };

  useEffect(()=>{
    if(user.bodyPart){
      setUser(prev=>({...prev , bodyPart: null}))
    }
  },[])


  const partButton = [
    {
      name: "Belly Piercing",
    },
    {
      name: "nipple-piercing",
    }
  ];

  const buttons = [
    {
      name: "ear-piercing",
    },
    {
      name: "facial-piercing",
    },
    {
      name: "jewellery-piercing",
    },
    {
      name: "nose-piercing",
    },
    {
      name: "oral-piercing",
    },
    {
      name: "surface-piercing",
    },
    {
      name: "vaginal-piercing",
    },
  ];


  const handleNext = ()=>{
     if(selected){
      setUser({ ...user, piercingLocation: selected });
      navigate(`/${selected}`);
     }if(partSelected){
      setUser({ ...user, bodyPart : partSelected});
      navigate("/medical-form");
     }if(!selected && !partSelected){
      setAlert(!alert)
      setAlertMessage(t("Please select an option"))
     }
  }

  const handlePrev = ()=>{
    navigate(-1)
  }
  return (
    <>
      <GridLayout title={"piercing"}>
        {partButton.map((button, index) => {
          return (
            <CustomButton key={button.name} onClick={handlepartLocation} selected={partSelected}>
              {button.name}
            </CustomButton>
          );
        })}
        {buttons.map((button, index) => {
          return (
            <CustomButton key={index} onClick={handpiercingLocation} selected={selected}>
              {button.name}
            </CustomButton>
          );
        })}
      </GridLayout>
      <Navigation next={handleNext}  prev={handlePrev} />
    </>
  );
}

export default PiercingDashboard;

{
  /* <div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
<div
  className="container h-100"
  style={{
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    width: '100%',
    border: '3px solid black',
  }}
>
  <h1> Piercing</h1>
  <div className="big-container">
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Belly Piercing')} >
        <h5>Belly Piercing</h5>
      </div>
      <div className="inner-item" onClick={()=>handpiercingLocation('ear-piercing')}>
        <h5>Ear Area Piercing</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handpiercingLocation('facial-piercing')} >
        <h5>Facial Area Piercing</h5>
      </div>
      <div className="inner-item" onClick={()=>handpiercingLocation('jwelry-piercing')}>
        <h5>Jewelry Swap Piercing</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('nipple-piercing')}>
        <h5>Nipple Piercing</h5>
      </div>
      <div className="inner-item" onClick={()=>handpiercingLocation('nose-piercing')}>
        <h5>Nose Area Piercing </h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handpiercingLocation('oral-piercing')}>
        <h5>Oral Area Piercing</h5>
      </div>
      <div className="inner-item" onClick={()=>handpiercingLocation('surface-piercing')}>
        <h5>Surface Piercing</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handpiercingLocation('vaginal-piercing')}>
        <h5>Vaginal Area Piercing</h5>
      </div>

    </div>         
    
  </div>
  <ProgressBar progress={progressValue} />
</div>
</div> */
}
