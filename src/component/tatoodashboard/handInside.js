import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';


function HandInside() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser,alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected , setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
      if(user.level3) setSelected(user.level3)
    },[])

    console.log(user)
  
    const buttons = [
      {
        name:"top"
      },
      {
        name:"palm"
      },
      {
        name:"side"
      },
      {
        name:"fingers"
      }
    ]

    console.log(selected)

    
    const handleNext = ()=>{
        if(selected){
          setUser({ ...user, level3 : selected });
          navigate('/description')
        }else{
          setAlertMessage(t("Please select an option"))
          setAlert(!alert)
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
      <GridLayout title={"hand"}>
        {
          buttons.map((button, index)=>{
            return <CustomButton key={index} onClick={handlepartLocation} selected={selected} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext}  prev={handlePrev} />
          </>
    );
  }
  
export default HandInside
