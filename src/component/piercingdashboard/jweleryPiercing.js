import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';

function JewelleryPiercing() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, finalUser,count, setFinalUser, currentSelection,setCurrentSelection } = React.useContext(UserContext);
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
      name:"Nose area"
    },
    {
      name:"Ear area"
    },
    {
      name:"Belly"
    },
    {
      name:"Oral area"
    },
    {
      name:"Facial area"
    },
    {
      name:"Nipple"
    },
    {
      name:"Surface"
    },
    {
      name:"Vaginal Area"
    }
  ]

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
    <GridLayout title={"jewellery piercing"}>
      {buttons.map((button, index)=>{
        return <CustomButton key={index} onClick={handlepartLocation} selected={selected}>{button.name}</CustomButton>
      })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev}  />
    </>
    
  );
}

export default JewelleryPiercing;


