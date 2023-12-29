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
          name: "leftleg"
        },
        {
          name: "rightleg"
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

  
  <div className='inner-item' onClick={()=>handlelegLocation('left-leg')}>
    <h5>Left Leg</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlelegLocation('right-leg')}>

    <h5>Right Leg</h5>
  
  </div>
 
  </div>



</div>

</div> */}


