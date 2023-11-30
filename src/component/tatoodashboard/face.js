import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
function FaceDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    const handlefaceLocation = (faceLocation) => {
      setUser({ ...user, faceLocation });
      navigate(`/${faceLocation}`); 

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
        <h1> FACE</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlefaceLocation('forehead')}>
          <h5>Forehead</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('face-temple')}>
  
          <h5>Temple</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlefaceLocation('eyebrow')}>
  
          <h5>Eyebrow</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('eyelid')}>
  
          <h5>Eyelid</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlefaceLocation('nose')}>
  
         <h5>Nose</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('cheeks')}>
  
         <h5>Cheeks</h5>
          
        </div>
      </div>

      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlefaceLocation('lip')}>
  
         <h5>Lip</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('jaw')}>
  
         <h5>Jaw</h5>
          
        </div>
      </div>



      </div>
      <ProgressBar progress={progressValue} />
      </div>
  </div>
  
    );
  }
  
export default FaceDashboard