import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';


function LegInside({}) {
  const progressValue = 45;
    const { state } = useLocation();
    const navigate = useNavigate()
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] =useState()
    const {t} = useTranslation()

    useEffect(()=>{
      if(user.legLocation) setSelected(user.legLocation)
  },[])

    const handlepartLocation = (bodyPart) => {
       setSelected(bodyPart)
      }


      const halfButton = [
        {
          name : "upper"
        },
        {
          name:"lower"
        }
      ]

      const ankleButtons = [
        {
          name : "full"
        },
        {
          name:"inner"
        },
        {
          name:"outer"
        },
        {
          name:"front"
        },
        {
          name:"back"
        }
      ]

      const thighButton = [
        {
          name:"inner"
        },
        {
          name:"outer"
        },
        {
          name:"front"
        },
        {
          name:"back"
        }
      ]

      const kneeButtons = [
        {
          name:"front"
        },
        {
          name:"back"
        }
      ]

      const handleNext = ()=>{
        if(selected){
          setUser({ ...user, bodyPart:selected });
      navigate('/medical-form');
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
      {
        state.full === "ankle" && (<>
        <GridLayout title={"ankle"}>
               {
                ankleButtons.map((button , index)=>{
                  return <CustomButton key={index} onClick={handlepartLocation} selected={selected} >{button.name}</CustomButton>
                })
               }
        </GridLayout>
        </>)
      }
       {
        state.full === "half sleeve" && (<>
        <GridLayout title={"half sleeve"}>
               {
                halfButton.map((button , index)=>{
                  return <CustomButton key={index} onClick={handlepartLocation} selected={selected} >{button.name}</CustomButton>
                })
               }
        </GridLayout>
        </>)
      }
       {
        state.full === "thigh" || "lower leg"  && (<>
        <GridLayout title={state.full === "thigh" ? "thigh" : "Lower"}>
               {
                thighButton.map((button , index)=>{
                  return <CustomButton key={index} onClick={handlepartLocation} selected={selected} >{button.name}</CustomButton>
                })
               }
        </GridLayout>
        </>)
      }
       {
        state.full === "knee" && (<>
        <GridLayout title={"knee"}>
               {
                kneeButtons.map((button , index)=>{
                  return <CustomButton key={index} onClick={handlepartLocation} selected={selected} >{button.name}</CustomButton>
                })
               }
        </GridLayout>
        </>)
      }
       <Navigation next={handleNext} prev={handlePrev}/>
      </>
      
      
  
  
    );
  }
  
export default LegInside

{/* <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> Leg</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        {state?.full === 'Ankle' &&(
            <div className='inner-item'  >
            <h5>Full </h5>
            
        </div>
         )} 

          {state?.full === 'Half' &&(
            <div className='inner-item' onClick={()=>handlepartLocation('upper')}>
            <h5>Upper </h5>
            
        </div>
         )} 
         {state?.full === 'Half' &&(
            <div className='inner-item' onClick={()=>handlepartLocation('lower')}>
            <h5>Lower </h5>
            
        </div>
         )} 
    
    {state?.full === 'Ankle' || state?.full === 'Lower' || state?.full === 'Thigh' ?(
            <div className='inner-item' onClick={()=>handlepartLocation('inner')}>
            <h5>Inner </h5>
            
        </div>
         ):null} 
    
    {state?.full === 'Thigh' || state?.full === 'Lower' || state?.full === 'Ankle' ?(
            <div className='inner-item' onClick={()=>handlepartLocation('outer')}>
            <h5>Outer </h5>
            
        </div>
         ):null} 
    
    {state?.full === 'Ankle' || state?.full === 'Lower' || state?.full === 'Thigh' || state?.full === 'Knee' ?(
            <div className='inner-item' onClick={()=>handlepartLocation('front')}>
            <h5>Front </h5>
            
        </div>
         ):null}
    
    {state?.full === 'Ankle' || state?.full === 'Lower' || state?.full === 'Thigh' || state?.full === 'Knee'  ?(
            <div className='inner-item' onClick={()=>handlepartLocation('back')}>
            <h5>Back </h5>
            
        </div>
         ):null} 
        
        </div>
      
    
        <ProgressBar progress={progressValue} />
      </div>

      </div> */}