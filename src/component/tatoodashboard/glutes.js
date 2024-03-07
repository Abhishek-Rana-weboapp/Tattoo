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
      if(user.level2) setSelected(user.level2)
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
          if(user.level2 !== selected){
            setUser({ ...user, level2 : selected, level3:null , level4:null });
          }else{
            setUser({ ...user, level2 : selected });
          }
          navigate("/count"); 
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
