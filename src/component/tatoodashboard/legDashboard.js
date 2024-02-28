import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';


function LegDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
     if(user.level3) setSelected(user.level3)
    },[])

    const handlepartLocation = (bodyPart) => {
      setSelected(bodyPart)
    }

    // const handleContentSelection = (legInside) => {
    //   setUser({ ...user, legInside });

    //     navigate('/leginside',
    //     {
    //       state: {
    //         full: legInside
    //       }
    //     })
    //   };

      const partButtons = [
        {
          name: 'full'
        }
      ]

      const contentButtons = [
        {
          name:"half sleeve"
        },
        {
          name:"thigh"
        },
        {
          name:"knee"
        },
        {
          name:"lower leg"
        },
        {
          name:"ankle"
        },
      ]

      const handleNext = ()=>{
        if(selected){
         if(partButtons.find(item=>item.name === selected)){
          if(user.level3 !== selected){
            setUser({ ...user, level3 : selected, level4:null });
          }else{
            setUser({ ...user, level3 : selected });
          }
           navigate('/description'); 
         }
         if(contentButtons.find(item=>item.name===selected)){
          if(user.level3 !== selected){
            setUser({ ...user, level3 : selected, level4:null });
          }else{
            setUser({ ...user, level3 : selected });
          }
           navigate('/leginside',{state:{full: selected}}); 
         }
        }
     }
 
     const handlePrev = ()=>{
       navigate(-1)
     }

    return (

      <>
      <GridLayout title={"leg"}>
        {
          partButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
        {
          contentButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev}/>
      </>
     
  
  
    );
  }
  
export default LegDashboard
