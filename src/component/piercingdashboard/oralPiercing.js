import React, { useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';
import CustomPiercingButton from '../buttons/CustomPiercingButton';
function OralPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, finalUser,count , setFinalUser, currentSelection, setCurrentSelection } = React.useContext(UserContext);
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
      name:"Straight Bar Tongue",
      value:"Straight Bar Tongue 14g"
    },
    {
      name:"Snake Eye Tongue",
      value:"Snake Eye Tongue 16g"
    },
    {
      name:"Snake Bite Lip",
      value:"Snake Bite Lip 16g",
    },
    {
      name:"Tongue Web",
      value:"Tongue Web 16g",
    },
    {
      name:"Smiley",
      value:"Smiley 16g",
    },
    {
      name:"Monroe",
      value:"Monroe 16g",
    },
    {
      name:"Medusa",
      value:"Medusa 16g",
    },
    {
      name:"Madonna",
      value:"Madonna 16g",
    },
    {
      name:"Dimples",
      value:"Dimples 14g",
    },
    {
      name:"Ashley",
      value:"Ashley 16g",
    },
    {
      name:"Angel Bites",
      value:"Angel Bites 16g"
    },
    {
      name:"Canine Bites",
      value:"Canine Bites 16g"
    },
    {
      name:"Cyber Bites",      
      value:"Cyber Bites 16g",
    },
    {
      name:"Dahlia",      
      value:"Dahlia 16g",
    },
    {
      name:"Dolphin Bites",      
      value:"Dolphin Bites 16g",
    },
    {
      name:"Frowney",      
      value:"Frowney 16g",
    },
    {
      name:"Gum",      
      value:"Gum 16g",
    },
    {
      name:"Horizontal Lip",      
      value:"Horizontal Lip 16g",
    },
    {
      name:"Jestrum",      
      value:"Jestrum 16g",
    },
    {
      name:"Multi Tongue",      
      value:"Multi Tongue 16g",
    },
    {
      name:"Shark Bites",      
      value:"Shark Bites 16g",
    },
    {
      name:"Spider Bites",      
      value:"Spider Bites 16g",
    },
    {
      name:"Vampire",      
      value:"Vampire 16g",
    },
    {
      name:"Venom",      
      value:"Venom 16g",
    },
    {
      name:"Vertical Labret",      
      value:"Vertical Labret 16g",
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
    <GridLayout title={"oral piercing"}>
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

export default OralPiercing;

