import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function HandInside() {
  const progressValue = 40;
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
        <h1> Hand</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        
        <div className='inner-item' onClick={()=>handlepartLocation('top')}>
          <h5>Top</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('palm')}>
  
          <h5>Palm</h5>
        
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('side')}>
  
  <h5>Side</h5>

</div>
<div className='inner-item' onClick={()=>handlepartLocation('fingers')}>
  
  <h5>Fingers</h5>

</div>

        </div>
      
        <ProgressBar progress={progressValue} />

      </div>

      </div>
      
  
  
    );
  }
  
export default HandInside