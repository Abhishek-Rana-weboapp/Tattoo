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
      if(user.level2) setSelected(user.level2)
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
          if(user.level2 !== selected){
            setUser({ ...user, level2 : selected, level3:null , level4:null });
          }else{
            setUser({ ...user, level2 : selected });
          }
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

