import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import Navigation from '../navigation/Navigation';
import CustomButton from '../buttons/CustomButton';


function Cheeks() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState()

  const handlePartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  useEffect(()=>{
    if(user.level4) setSelected(user.level4)
  },[])

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
      setUser({ ...user, level4 : selected});
    navigate("/count")
  }else{
    setAlertMessage("Please select a location for the cheek.")
  }
  }

  const handlePrev = ()=>{
    navigate(-1)
  }



  
    return (
      <>
      <GridLayout title={"cheeks"}>
    {
      buttons.map((button, index)=>{
        return <CustomButton onClick={handlePartLocation} selected={selected} >{button.name}</CustomButton>
      })
    }
  </GridLayout>
  <Navigation next={handleNext}  prev={handlePrev} />
    
    </>
  
    );
  }
  
export default Cheeks

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
  <h1> Cheeks</h1>
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
