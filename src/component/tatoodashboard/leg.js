import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';


function Leg() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
      if(user.legLocation) setSelected(user.legLocation)
  },[])


      const buttons = [
        {
          name: "left leg"
        },
        {
          name: "right leg"
        }
      ]

      const handleNext = ()=>{
        if(selected){
          setUser({ ...user, legLocation:selected });
      navigate('/leg-dashboard');
        }else{
          setAlert(!alert)
          setAlertMessage(t("Please select an option"))
        }
      }
  
      const handlePrev = ()=>{
       navigate(-1)
      }

    const handlelegLocation = (legLocation) => {
      setSelected(legLocation)
       

    }
    return (
      <>
      <GridLayout title={"leg"}>
      {
           buttons.map((button, index)=>{
             return <CustomButton onClick={handlelegLocation} selected={selected} key={index}>{button.name}</CustomButton>
           })
         }
      </GridLayout>
       <Navigation next={handleNext} prev={handlePrev} />
      </>
     
    );
  }
  
export default Leg

