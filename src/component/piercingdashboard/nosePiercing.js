import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';
import CustomPiercingButton from '../buttons/CustomPiercingButton';
function NosePiercing() {
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
      name:"Nostril",     
      value:"Nostril 19g",
    },
    {
      name:"Septum",      
      value:"Septum 16g",
    },
    {
      name:"Austin Bar",      
      value:"Austin Bar 16g",
    },
    {
      name:"Erl",      
      value:"Erl 16g",
    },
    {
      name:"High Nostril",      
      value:"High Nostril 19g",
    },
    {
      name:"Nostril Nasallang",      
      value:"Nostril Nasallang 16g",
    },
    {
      name:"Rhino",      
      value:"Rhino 16g",
    },
    {
      name:"Septril",      
      value:"Septril 16g",
    },
    {
      name:"Third Eye",      
      value:"Third Eye",
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
    <GridLayout title={"nose piercing"}>
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

export default NosePiercing;


