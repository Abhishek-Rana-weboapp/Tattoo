import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';


function Glute() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
      if(user.bodyPart) setSelected(user.bodyPart)
  },[])

    const handlepartLocation = (bodyPart) => {
       setSelected(bodyPart)
      }

      const buttons = [
        {
          name: "left"
        },
        {
          name: "right"
        }
      ]

      const handleNext = ()=>{
        if(selected){
          setUser({ ...user, bodyPart : selected });
          navigate('/description'); 
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
     <GridLayout title={"glutes"}>
     {
          buttons.map((button, index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index}>{button.name}</CustomButton>
          })
        }
     </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
     </>
    );
  }
  
export default Glute
