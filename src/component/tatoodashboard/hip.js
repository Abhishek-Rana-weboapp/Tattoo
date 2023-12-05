import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import CustomButton from '../buttons/CustomButton';
import GridLayout from '../Layout/GridLayout';


function Hip() {
  const progressValue = 30;
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
          name: "left hip"
        },
        {
          name: "right hip"
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
      <GridLayout title={"hip"}>
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
  
export default Hip

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
  <h1> Hip</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlepartLocation('left hip')}>
    <h5>Left Hip</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('right hip')}>

    <h5>Right Hip</h5>
  
  </div>
 
  </div>



</div>

</div> */}
