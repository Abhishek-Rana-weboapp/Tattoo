import React, { useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';
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
      name:"Straight Bar Tongue 14g"
    },
    {
      name:"Snake Eye Tongue 16g"
    },
    {
      name:"Snake Bite Lip 16g"
    },
    {
      name:"Tongue Web 16g"
    },
    {
      name:"Smiley 16g"
    },
    {
      name:"Monroe 16g"
    },
    {
      name:"Medusa 16g"
    },
    {
      name:"Madonna 16g"
    },
    {
      name:"Dimples 14g"
    },
    {
      name:"Ashley 16g"
    },
    {
      name:"Angel Bites 16g"
    },
    {
      name:"Canine Bites 16g"
    },
    {
      name:"Cyber Bites 16g"
    },
    {
      name:"Dahlia 16g"
    },
    {
      name:"Dolphin Bites 16g"
    },
    {
      name:"Frowney 16g"
    },
    {
      name:"Gum 16g"
    },
    {
      name:"Horizontal Lip 16g"
    },
    {
      name:"Jestrum 16g"
    },
    {
      name:"Multi Tongue 16g"
    },
    {
      name:"Shark Bites 16g"
    },
    {
      name:"Spider Bites 16g"
    },
    {
      name:"Vampire 16g"
    },
    {
      name:"Venom 16g"
    },
    {
      name:"Vertical Labret 16g"
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

  console.log(window.location.pathname)


  return (

    <>
    <GridLayout title={"oral piercing"}>
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

export default OralPiercing;

