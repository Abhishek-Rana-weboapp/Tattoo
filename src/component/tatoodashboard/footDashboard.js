import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';


function FootDashboard() {

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected , setSelected] = useState()

    useEffect(()=>{
      if(user.bodyPart) setSelected(user.bodyPart)
    },[])
  
    const handlePartLocation = (bodyPart) => {
      setSelected(bodyPart)
    }
  
    const buttons = [
      {
        name:"top"
      },
      {
        name:"side"
      },
      {
        name:"toes"
      }
    ]
  
    const handleNext = ()=>{
        if(selected){
          setUser({ ...user, bodyPart : selected });
          navigate("/medical-form")
        }else{
          alert("Please select which ear.")
        }
    }
  
    const handlePrev = ()=>{
        navigate(-1)
    }

    const handlepartLocation = (bodyPart) => {
        setUser({ ...user, bodyPart });
        navigate('/medical-form'); 
  
      }
    return (

      <>
      <GridLayout title={"foot"}>
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
  
export default FootDashboard

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
  
        
        <div className='inner-item' onClick={()=>handlepartLocation('top')} >
          <h5>Top</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('side')}>
  
          <h5>Side</h5>
        
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('toes')}>
  
  <h5>Toes</h5>

</div>
        </div>
      
    

      </div>

      </div>
      
  
   */}