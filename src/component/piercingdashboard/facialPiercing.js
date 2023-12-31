import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';

function FacialPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
 if(user.bodyPart) setSelected(user.bodyPart)
  },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  const buttons = [
    {
      name:"Check"
    },
    {
      name:"Eyebrow"
    },
    {
      name:"sideburn"
    },
  ]

  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, bodyPart : selected });
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
      <GridLayout title={"facial piercing"}>
        {buttons.map((button, index)=>{
          return <CustomButton key={index} onClick={handlepartLocation} selected={selected}>{button.name}</CustomButton>
        })}
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev}  />
      </>
     
      
  
  
    );
  }
  
export default FacialPiercing

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
  <h1>Facial Area Piercing</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlepartLocation('Check')}>
    <h5>Check</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('Eyebrow')}>
    <h5>Eyebrow</h5>
    
  </div>       
   <div className='inner-item' onClick={()=>handlepartLocation('sideburn')}>
    <h5>Sideburn</h5>
    
  </div>
 
  </div>

  <ProgressBar progress={progressValue} />

</div>

</div> */}