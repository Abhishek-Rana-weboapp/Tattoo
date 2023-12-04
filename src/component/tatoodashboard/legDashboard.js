import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function LegDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    const handlepartLocation = (bodyPart) => {
      setUser({ ...user, bodyPart });
      navigate('/medical-form'); 

    }

    const handleContentSelection = (legInside) => {
      setUser({ ...user, legInside });

        navigate('/leginside',
        {
          state: {
            full: legInside
          }
        })
      };
    return (
      <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#setSelectedContentf5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> Leg</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        
        <div className='inner-item' onClick={()=>handlepartLocation('full')}>
          <h5>Full Sleeve </h5>
          
        </div>
        <div className='inner-item' onClick={()=>handleContentSelection('Half')}>
  
          <h5>Half Sleeve</h5>
        
        </div>
        <div className='inner-item' onClick={()=>handleContentSelection('Thigh')}>
  
            <h5>Thigh</h5>

            </div>
            <div className='inner-item' onClick={()=>handleContentSelection('Knee')}>
          <h5>Knee </h5>
          
        </div>     <div className='inner-item' onClick={()=>handleContentSelection('Lower')}>
          <h5>Lower Leg </h5>
          
        </div>     <div className='inner-item' onClick={()=>handleContentSelection('Ankle')}>
          <h5>Ankle </h5>
          
        </div>
        </div>
      
    
        <ProgressBar progress={progressValue} />
      </div>

      </div>
      
  
  
    );
  }
  
export default LegDashboard