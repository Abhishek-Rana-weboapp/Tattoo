import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';


function Torso() {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    const handlepartLocation = (bodyPart) => {
        setUser({ ...user, bodyPart });
        navigate('/medical-form'); 
  
      }
    return (
      <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> TORSO</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlepartLocation('Full Torso')}>
          <h5>Full Torso</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Left Ribs')}>
  
          <h5>Left Ribs</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('Right Ribs')}>
  
          <h5>Right Ribs</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Stomach')}>
  
          <h5>Stomach</h5>
        
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('Belly Button')}>
  
          <h5>Belly Button</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Tummy Tuck')}>
  
          <h5>Tummy Tuck </h5>
        
        </div>
      </div>     

      </div>
      </div>
  </div>
  
    );
  }
  
export default Torso