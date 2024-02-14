import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';

function ChestInside() {
  const progressValue = 40;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.bodyPart) setSelected(user.bodyPart)
},[])

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
      setUser({ ...user, bodyPart:selected });
  navigate('/description');
    }else{
      setAlert(!alert)
      setAlertMessage(t("Please select an option"))
    }
  }

  const handlePrev = ()=>{
   navigate(-1)
  }

  const handlepartLocation = (bodyPart) => {
   setSelected(bodyPart)
  }
    return (
      <>
      <GridLayout title={"chest"}>
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
  
export default ChestInside


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
  <h1> CHEST</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlepartLocation('left')}>
    <h5>Left</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('right')}>

    <h5>Right</h5>
  
  </div>
 
  </div>



</div>

</div> */}

