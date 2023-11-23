import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';


function FacialPiercing() {
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
        <h1>Facial Area Piercing</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        
        <div className='inner-item' onClick={()=>handlepartLocation('Check')}>
          <h5>Check</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Eyebrow')}>
          <h5>Eyebrow</h5>
          
        </div>       
         <div className='inner-item' onClick={()=>handlepartLocation('sideburn')}>
          <h5>Sideburn</h5>
          
        </div>
       
        </div>
      
    

      </div>

      </div>
      
  
  
    );
  }
  
export default FacialPiercing