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

    const handleNext = ()=>{
       if(selected){
        if(partButtons.find(item=>item.name === selected)){
          if(user.level3 !== selected){
          setUser({ ...user, level3 : selected, level4:null});
          }else{
            setUser({ ...user, level3 : selected});
          }
          navigate('/count'); 
        }
        if(armButtons.find(item=>item.name === selected)){
          if(user.level3 !== selected){
            setUser({ ...user, level3 : selected, level4:null});
            }else{
              setUser({ ...user, level3 : selected});
            }
          navigate('/arm-inside',{state:{name: selected}}); 
        }
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