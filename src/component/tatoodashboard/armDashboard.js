import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';


function ArmDashboard() {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);


    const handlepartLocation = (bodyPart) => {
      setUser({ ...user, bodyPart });
      navigate('/medical-form'); 
    }
    const handlearmLocation = (armInside) => {
      setUser({ ...user, armInside });
      navigate('/arm-inside',{state:{name: armInside}}); 

    }

    return (
      <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> ARM</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlepartLocation('full sleeve')}>
          <h5>Full Sleeve</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('half sleeve')}>
  
          <h5>Half Sleeve</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('shoulder')}>
  
          <h5>Shoulder</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('armpit')}>
  
          <h5>Armpit</h5>
        
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlearmLocation('arm-inside')}>
  
          <h5>Upper Arm</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlearmLocation('elbow')}>
  
          <h5>Elbow </h5>
        
        </div>
      </div>     
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlearmLocation('forearm')}>
  
          <h5>Forearm</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlearmLocation('wrist')}>
  
          <h5>Wrist </h5>
        
        </div>
      </div>  
      </div>
      </div>
  </div>
  
    );
  }
  
export default ArmDashboard