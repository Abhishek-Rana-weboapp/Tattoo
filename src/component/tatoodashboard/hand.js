import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function Hand() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    const handlehandLocation = (handLocation) => {
      setUser({ ...user, handLocation });
      navigate('/hand-inside'); 

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
        <h1> Hand</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        
        <div className='inner-item' onClick={()=>handlehandLocation('left hand')}>
          <h5>Left Hand</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlehandLocation('right hand')}>
  
          <h5>Right Hand</h5>
        
        </div>
       
        </div>
      
        <ProgressBar progress={progressValue} />

      </div>

      </div>
      
  
  
    );
  }
  
export default Hand