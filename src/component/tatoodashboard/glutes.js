import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function Glute() {
  const progressValue = 30;
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
      
        <ProgressBar progress={progressValue} />

      </div>

      </div>
      
  
  
    );
  }
  
export default Glute