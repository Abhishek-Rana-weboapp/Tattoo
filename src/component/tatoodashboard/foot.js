import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';


function Foot() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
      if(user.footLocation) setSelected(user.footLocation)
  },[])

    const handlefootLocation = (footLocation) => {
     setSelected(footLocation)
    }

    const buttons = [
      {
        name: "left foot"
      },
      {
        name: "right foot"
      }
    ]

    const handleNext = ()=>{
      if(selected){
        setUser({ ...user, footLocation:selected });
    navigate('/foot-dashboard');
      }else{
        alert("Please select an option")
      }
    }

    const handlePrev = ()=>{
     navigate(-1)
    }

    return (
      <>
      <GridLayout title={"foot"}>
      {
           buttons.map((button, index)=>{
             return <CustomButton onClick={handlefootLocation} selected={selected} key={index}>{button.name}</CustomButton>
           })
         }
      </GridLayout>
       <Navigation next={handleNext} prev={handlePrev} />
      </>
     
  
    );
  }
  
export default Foot

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
  <h1> Foot</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlefootLocation('left foot')}>
    <h5>Left Foot</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlefootLocation('right foot')}>

    <h5>Right Foot</h5>
  
  </div>
 
  </div>



</div>

</div> */}

