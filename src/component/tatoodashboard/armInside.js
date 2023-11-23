import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import { useLocation } from 'react-router-dom';


function ArmInside() {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const { state } = useLocation();
    console.log(state.name)

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
        <h1> Arm</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
      <div>
      {state.name === 'arm-inside' && (
        <>
         <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
         <h5>Inner</h5>
         
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>
 
         <h5>Outer</h5>
       
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Front')}>
           <h5>Front</h5>
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Back')}>
           <h5>Back</h5>
       </div>    
       </>   
      )}
      {state.name === 'elbow' && (
        <>
         <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
         <h5>Inner</h5>
         
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>
 
         <h5>Outer</h5>
       
       </div>
       </>
      )}
       {state.name === 'elbow' && (
        <>
         <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
         <h5>Inner</h5>
         
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>
 
         <h5>Outer</h5>
       
       </div>
       </>
      )}

      {state.name === 'forearm' && (
        <>
         <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
         <h5>Inner</h5>
         
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>
 
         <h5>Outer</h5>
       
       </div>
              <div className='inner-item' onClick={()=>handlepartLocation('Side')}>
              <h5>Side</h5>
          </div>  
          </>
      )}


{state.name === 'wrist' && (
  <>
         <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
         <h5>Inner</h5>
         
       </div>
       <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>
 
         <h5>Outer</h5>
       
       </div>
              <div className='inner-item' onClick={()=>handlepartLocation('Side')}>
              <h5>Side</h5>
          </div>  
          </>
      )}
    

      </div>

      </div>
      </div>
      </div>
  
  
    );
  }
export default ArmInside