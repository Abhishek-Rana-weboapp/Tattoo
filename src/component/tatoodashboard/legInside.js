import React from 'react'
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useNavigate } from "react-router-dom";


function LegInside({}) {

    const { state } = useLocation();
    const navigate = useNavigate()
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
        <h1> Leg</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        {state?.full === 'Ankle' &&(
            <div className='inner-item'  >
            <h5>Full </h5>
            
        </div>
         )} 

          {state?.full === 'Half' &&(
            <div className='inner-item' onClick={()=>handlepartLocation('upper')}>
            <h5>Upper </h5>
            
        </div>
         )} 
         {state?.full === 'Half' &&(
            <div className='inner-item' onClick={()=>handlepartLocation('lower')}>
            <h5>Lower </h5>
            
        </div>
         )} 
    
    {state?.full === 'Ankle' || state?.full === 'Lower' || state?.full === 'Thigh' ?(
            <div className='inner-item' onClick={()=>handlepartLocation('inner')}>
            <h5>Inner </h5>
            
        </div>
         ):null} 
    
    {state?.full === 'Thigh' || state?.full === 'Lower' || state?.full === 'Ankle' ?(
            <div className='inner-item' onClick={()=>handlepartLocation('outer')}>
            <h5>Outer </h5>
            
        </div>
         ):null} 
    
    {state?.full === 'Ankle' || state?.full === 'Lower' || state?.full === 'Thigh' || state?.full === 'Knee' ?(
            <div className='inner-item' onClick={()=>handlepartLocation('front')}>
            <h5>Front </h5>
            
        </div>
         ):null}
    
    {state?.full === 'Ankle' || state?.full === 'Lower' || state?.full === 'Thigh' || state?.full === 'Knee'  ?(
            <div className='inner-item' onClick={()=>handlepartLocation('back')}>
            <h5>Back </h5>
            
        </div>
         ):null} 
        
        </div>
      
    

      </div>

      </div>
      
  
  
    );
  }
  
export default LegInside