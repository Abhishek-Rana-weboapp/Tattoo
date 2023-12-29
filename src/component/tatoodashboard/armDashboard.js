import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';


function ArmDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
     if(user.bodyPart) setSelected(user.bodyPart)
     if(user.armInside) setSelected(user.armInside)
    },[])


    const handlepartLocation = (bodyPart) => {
      setSelected(bodyPart)
    }

    const partButtons = [
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
      }
    ]

    const armButtons = [
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
        if(partButtons.find(item=>item.name === selected)){
          setUser({ ...user, bodyPart : selected});
          navigate('/medical-form'); 
        }
        if(armButtons.find(item=>item.name===selected)){
          setUser({ ...user, armInside : selected});
          navigate('/arm-inside',{state:{name: selected}}); 
        }
       }
    }

    const handlePrev = ()=>{
      navigate(-1)
    }

    return (
      <>
      <GridLayout title={"arm"}>
        {
          partButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
        {
          armButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev}/>
      </>
      
    );
  }
  
export default ArmDashboard

{/* <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> ARM</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlepartLocation('full sleeve')}>
          <h5>Full Sleeve</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('half sleeve')}>
  
          <h5>Half Sleeve</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('shoulder')}>
  
          <h5>Shoulder</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('armpit')}>
  
          <h5>Armpit</h5>
        
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlearmLocation('arm-inside')}>
  
          <h5>Upper Arm</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlearmLocation('elbow')}>
  
          <h5>Elbow </h5>
        
        </div>
      </div>     
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlearmLocation('forearm')}>
  
          <h5>Forearm</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlearmLocation('wrist')}>
  
          <h5>Wrist </h5>
        
        </div>
      </div>  
      </div>
      <ProgressBar progress={progressValue} />
      </div>
  </div>
   */}