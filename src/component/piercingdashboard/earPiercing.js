import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';
import CustomPiercingButton from '../buttons/CustomPiercingButton';
function EarPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, finalUser,count,  setFinalUser, currentSelection, setCurrentSelection } = React.useContext(UserContext);
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
      value: "Regular Earlobe 20g",
    },
    {
      name: "Upper Earlobe",
      value: "Upper Earlobe 20g",
    },
    {
      name: "Industrial",
      value: "Industrial 16g",
    },
    {
      name: "Tragus",
      value: "Tragus 16g",
    },
    {
      name: "Rook",
      value: "Rook 16g",
    },
    {
      name: "Conch",
      value: "Conch 16g",
    },
    {
      name: "Daith",
      value: "Daith 16g",
    },
    {
      name: "Snug",
      value: "Snug 16g",
    },
    {
      name: "Forward Helix",
      value: "Forward Helix 16g",
    },
    {
      name: "Helix",
      value: "Helix 16g",
    },
    {
      name: "Anti Helix",
      value: "Anti Helix 16g",
    },
    {
      name: "Anti Tragus",
      value: "Anti Tragus 16g",
    },
    {
      name: "Auricle",
      value: "Auricle 16g",
    },
    {
      name: "External Auditory Meatus",
      value: "External Auditory Meatus 16g",
    },
    {
      name: "Transverse Lobe",
      value: "Transverse Lobe 16g",
    }
  ];

  const handleNext = ()=>{
    if(selected){
      if(user.level2 !== selected){
        setUser({ ...user, level2: selected, level3:null, level4:null});
        setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user.level1 , level2: selected, level3: null, level4: null }}))
        if(currentSelection < count){
          setCurrentSelection(currentSelection + 1)
        }
        }else{
          setUser({ ...user, level2: selected});
          setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user.level1 , level2: selected, level3: null, level4: null }}))
          if(currentSelection < count){
            setCurrentSelection(currentSelection + 1)
          }
        }
      if(count > 1 && currentSelection < count){
          navigate("/piercing")
      }else{
          navigate("/medical-form")
      }
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
            <CustomPiercingButton key={index} onClick={()=>handlepartLocation(button.value)} selected={selected} value={button.value}>
              {button.name}
            </CustomPiercingButton>
          );
        })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev} />
    </>
    
  );
}

export default EarPiercing;
