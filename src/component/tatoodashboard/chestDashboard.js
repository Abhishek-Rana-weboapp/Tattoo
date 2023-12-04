import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function ChestDeshboard() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);


    const handlepartLocation = (bodyPart) => {
      setUser({ ...user, bodyPart });
      navigate('/medical-form'); 

    }
    const handlchestLocation = (chestLocation) => {
      setUser({ ...user, chestLocation });
      navigate('/under-chest'); 

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
        <h1> CHEST</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlepartLocation('full chest')}>
          <h5>Full Chest</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('left side')}>
  
          <h5>Left Side</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('right side')}>
  
          <h5>Right Side</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('center')}>
  
          <h5>Center</h5>
        
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('collar bone')}>
  
          <h5>Collar bone</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlchestLocation('nipple')}>
  
          <h5>Nipple </h5>
        
        </div>
      </div>    
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlchestLocation('under-chest')}>
  
          <h5>Under Chest</h5>
          
        </div>
       
      </div>     

      </div>
      <ProgressBar progress={progressValue} />
      </div>
  </div>
  
    );
  }
  
export default ChestDeshboard