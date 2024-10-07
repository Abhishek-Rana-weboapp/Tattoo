import React, { useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';

function SurfacePiercing() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, finalUser, setFinalUser,count, currentSelection, setCurrentSelection } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user[2]) setSelected(user[2])
     },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }


  const buttons = [
    {
      name:"Arm",      
      value:"Arm 16g",
    },
    {
      name:"Back",      
      value:"Back 16g",
    },
    {
      name:"Chest",      
      value:"Chest 16g",
    },
    {
      name:"Face",      
      value:"Face 16g",
    },
    {
      name:"Finger",      
      value:"Finger 16g",
    },
    {
      name:"Foot",      
      value:"Foot 16g",
    },
    {
      name:"Hand",      
      value:"Hand 16g",
    },
    {
      name:"Hip",      
      value:"Hip 16g",
    },
    {
      name:"Leg",      
      value:"Leg 16g",
    },
    {
      name:"Neck",      
      value:"Neck 16g",
    },
    {
      name:"Pelvic",      
      value:"Pelvic 16g",
    },
    {
      name:"Ribs",      
      value:"Ribs 16g",
    },
    {
      name:"Shoulder",      
      value:"Shoulder 16g",
    },
    {
      name:"Stomach",      
      value:"Stomach 16g",
    }
  ]

  const handleNext = ()=>{
    if(selected){
      if(user[2] !== selected){
        setUser({ ...user, 2: selected, 3:null, 4:null});
        setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user[1] , level2: selected, level3: null, level4: null }}))
        if(currentSelection < count){
          setCurrentSelection(currentSelection + 1)
        }
        }else{
          setUser({ ...user, 2: selected});
          setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user[1] , level2: selected, level3: null, level4: null }}))
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
    <GridLayout title={"surface piercing"}>
    {buttons.map((button, index) => {
          return (
            <CustomButton key={index} onClick={()=>handlepartLocation(button.value)} selected={selected}>
              {button.name}
            </CustomButton>
          );
        })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev} />
    </>
   
  );
}

export default SurfacePiercing;



