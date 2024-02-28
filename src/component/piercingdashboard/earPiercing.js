import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';
function EarPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.level2) setSelected(user.level2)
     },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  const buttons = [
    {
      name: "Regular Earlobe",
    },
    {
      name: "Upper Earlobe",
    },
    {
      name: "helix",
    },
    {
      name: "Industrial",
    },
    {
      name: "Tragus",
    },
    {
      name: "Rook",
    },
    {
      name: "Conch",
    },
    {
      name: "Daith",
    },
    {
      name: "Snug",
    },
    {
      name: "Forward Helix",
    },
    {
      name: "Helix",
    },
    {
      name: "Anti Helix",
    },
    {
      name: "Anti Tragus",
    },
    {
      name: "Auricle",
    },
    {
      name: "External Auditory Meatus",
    },
    {
      name: "Transverse Lobe",
    }
  ];

  const handleNext = ()=>{
    if(selected){
      if(user.level2 !== selected){
        setUser({ ...user, level2: selected, level3:null, level4:null});
        }else{
          setUser({ ...user, level2: selected});
        }
    navigate('/medical-form'); 
    }else{
      setAlert(!alert)
      setAlertMessage(t("Please select an option"))
    }
  }

  const handlePrev = ()=>{
 navigate(-1)
  }

  return (
    <>
    <GridLayout title={"ear piercing"}>
    {buttons.map((button, index) => {
          return (
            <CustomButton key={index} onClick={handlepartLocation} selected={selected}>
              {button.name}
            </CustomButton>
          );
        })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev} />
    </>
    
  );
}

export default EarPiercing;
