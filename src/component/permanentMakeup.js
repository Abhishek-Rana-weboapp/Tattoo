import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProgressBar from "./ProgressBar";
import GridLayout from "./Layout/GridLayout";
import CustomButton from "./buttons/CustomButton";
import Navigation from "./navigation/Navigation";
import { useTranslation } from "react-i18next";

function PermanentMakeup() {
  const progressValue = 20;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, setFinalUser } =
    React.useContext(UserContext);
  const [selected, setSelected] = useState();
  const { t } = useTranslation();

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart);
  };

  const buttons = [
    {
      name: "Eyebrows",
      value: "Eyebrows",
    },
    {
      name: "Eyeliner",
      value: "Eyeliner",
    },
    {
      name: "Lips",
      value: "Lips",
    },
  ];

  const handleNext = () => {
    if (selected) {
      setUser({ ...user, level1: selected });
      setFinalUser({
        1: { level1: selected, level2: null, level3: null, level4: null },
      });
      navigate("/medical-form");
    } else {
      setAlert(!alert);
      setAlertMessage(t("Please select an option"));
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <>
      <GridLayout title={"permanent makeup"}>
        {buttons.map((button, index) => {
          return (
            <CustomButton
              key={index}
              onClick={handlepartLocation}
              selected={selected}
              value={button.value}
            >
              {button.name}
            </CustomButton>
          );
        })}
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
    </>
  );
}

export default PermanentMakeup;

{
  /* <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
   
        
        <div className='inner-item' onClick={()=>handlepartLocation('Eyebrows')}>
          <h5>Eyebrows</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Eyeliner')}>
          <h5>Eyeliner</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Lips')}>
          <h5>Lips</h5>
          
        </div>
        </div>
      
        <ProgressBar progress={progressValue} />

      </div>

      </div>
      }}>
        <h1>Permanent Makeup</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
 
       */
}
