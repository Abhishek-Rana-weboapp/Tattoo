import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';


function Nose() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()

  useEffect(()=>{
    if(user.bodyPart) setSelected(user.bodyPart)
  },[])

  const handlePartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  const buttons = [
    {
      name:"left"
    },
    {
      name:"right"
    }
  ]

  const handleNext = ()=>{
      if(selected){
        setUser({ ...user, bodyPart : selected });
        navigate("/medical-form")
      }else{
        setAlertMessage("Please select which ear.")
      }
  }

  const handlePrev = ()=>{
      navigate(-1)
  }
  
    return (
      <>
  <GridLayout title={"nose"}>
    {
      buttons.map((button, index)=>{
        return <CustomButton key={index} onClick={handlePartLocation} selected={selected} >{button.name}</CustomButton>
      })
    }
  </GridLayout>
  <Navigation next={handleNext}  prev={handlePrev} />
      </>
    );
  }
  
export default Nose

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
  <h1> Nose</h1>
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

</div>
 */}
