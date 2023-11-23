import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';

function Neck() {
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
        <h1> Neck</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlepartLocation('front')}>
          <h5>Front</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('back')}>
  
          <h5>Back</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('left')}>
  
          <h5>Left</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('right')}>
  
          <h5>Right</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlepartLocation('full')}>
  
         <h5>Full</h5> 
          
        </div>
       
      </div>

     



      </div>
      </div>
  </div>
  
    );
  }
  
export default Neck