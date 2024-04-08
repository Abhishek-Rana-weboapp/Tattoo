import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';


function ArmDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()
    const {t} = useTranslation

    useEffect(()=>{
     if(user.level3) setSelected(user.level3)
    },[])


    const handlepartLocation = (bodyPart) => {
      setSelected(bodyPart)
    }

    const partButtons = [
      {
        name:"shoulder"
      },
      {
        name:"armpit"
      },
      {
        name:"full sleeve"
      },
    ]

    const armButtons = [
      {
        name:"half sleeve"
      },
      {
        name:"upper arm",
      },
      {
        name:"elbow",
      },
      {
        name:"forearm"
      },
      {
        name:"wrist"
      }
    ]


    const buttons = [
      {
        name:"full sleeve"
      },
      {
        name:"half sleeve"
      },
      {
        name:"shoulder"
      },
      {
        name:"armpit"
      },
      {
        name:"upper arm",
      },
      {
        name:"elbow",
      },
      {
        name:"forearm"
      },
      {
        name:"wrist"
      }
    ]

    const handleNext = ()=>{
       if(selected){
        if(selected === "full sleeve" ||selected === "shoulder" || selected === "armpit"){
          if(user.level3 !== selected){
              setUser({ ...user, level3 : selected, level4:null});
              }else{
                setUser({ ...user, level3 : selected});
              }
              navigate('/description');
        }else{
          if(user.level3 !== selected){
                setUser({ ...user, level3 : selected, level4:null});
                }else{
                  setUser({ ...user, level3 : selected});
                }
              navigate('/arm-inside',{state:{name: selected}}); 
        }
        // if(partButtons.find(item=>item.name === selected)){
        //   if(user.level3 !== selected){
        //   setUser({ ...user, level3 : selected, level4:null});
        //   }else{
        //     setUser({ ...user, level3 : selected});
        //   }
        //   navigate('/description'); 
        // }
        // if(armButtons.find(item=>item.name === selected)){
        //   if(user.level3 !== selected){
        //     setUser({ ...user, level3 : selected, level4:null});
        //     }else{
        //       setUser({ ...user, level3 : selected});
        //     }
        //   navigate('/arm-inside',{state:{name: selected}}); 
        // }
       }else{
        setAlertMessage(t("Please select an option"))
        setAlert(!alert)
        return
       }
    }

    const handlePrev = ()=>{
      navigate(-1)
    }

    return (
      <>
      <GridLayout title={"arm"}>
        {/* {
          partButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        } */}
        {
          buttons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev}/>
      </>
      
    );
  }
  
export default ArmDashboard

