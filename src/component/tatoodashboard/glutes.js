import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';


function Glute() {

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
      if(user.bodyPart) setSelected(user.bodyPart)
  },[])

    const handlepartLocation = (bodyPart) => {
       setSelected(bodyPart)
      }

      const buttons = [
        {
          name: "left glute"
        },
        {
          name: "right glute"
        }
      ]

      const handleNext = ()=>{
        if(selected){
          setUser({ ...user, bodyPart : selected });
          navigate('/medical-form'); 
        }else{
          alert("Please select an option")
        }
      }
  
      const handlePrev = ()=>{
       navigate(-1)
      }

    return (
     <>
     <GridLayout title={"glute"}>
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
  
export default Glute

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
  <h1> Glutes</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlepartLocation('left glute')}>
    <h5>Left Glutes</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('right glute')}>

    <h5>Right Glutes</h5>
  
  </div>
 
  </div>



</div>

</div> */}
