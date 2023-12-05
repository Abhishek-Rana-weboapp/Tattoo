import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import NavigationButton from '../buttons/NavigationButton';
import Navigation from '../navigation/Navigation';


function Arm() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
        if(user.armLocation) setSelected(user.armLocation)
    },[])

    const handleArmLocation = (armLocation) => {
      setSelected(armLocation)
    }

    const buttons = [
      {
        name: "left arm"
      },
      {
        name: "right arm"
      }
    ]

    const handleNext = ()=>{
      if(selected){
        setUser({ ...user, armLocation : selected });
        navigate('/arm-dashboard'); 
      }else{
        alert("Please select an option")
      }
    }

    const handlePrev = ()=>{
     navigate(-1)
    }

    return (
<>
      <GridLayout title={"arm"}>
        {
          buttons.map((button, index)=>{
            return <CustomButton onClick={handleArmLocation} selected={selected} key={index}>{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
        </>
      
    );
  }
  
export default Arm

// <div className='outer container' style={{
//         border: '1px solid #d8d6d6'
      
//       }}>
//       <div className='container h-100' style={{
//         backgroundColor: '#f5f5f5',
      
//         alignItems: 'center',
//         minHeight: '100vh',
//         width:'100%',
//         border: '3px solid black',
  
  
//       }}>
//         <h1> Arm</h1>
//         <div className='outer-container' style={{
//             display:'flex',
//             justifyContent:'center',
//             flexDirection:'column',
//             alignItems:'center',
//             gap:'30px',
//             marginTop:'55px'
//         }}>
  
        
//         <div className='inner-item' onClick={()=>handlarmLocation('left arm')}>
//           <h5>Left Arm</h5>
          
//         </div>
//         <div className='inner-item' onClick={()=>handlarmLocation('right arm')}>
  
//           <h5>Right Arm</h5>
        
//         </div>
       
//         </div>
      
    

//       </div>

//       </div>
      
  
  