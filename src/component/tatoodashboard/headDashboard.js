import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';


function HeadTattoo() {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    const handleheadLocation = (headLocation) =>{
      setUser({ ...user, headLocation });
      navigate(`/${headLocation}`); 
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
        <h1> Head</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handleheadLocation('face')}>
          <h5>Face</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handleheadLocation('scalp')}>
  
          <h5>Scalp</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handleheadLocation('ear')}>
  
          <h5>Ear</h5>
          
        </div>

      </div>
   

      </div>
      </div>
  </div>
  
    );
  }
  
export default HeadTattoo