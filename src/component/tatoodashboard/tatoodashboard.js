import React from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function TattooDashboard() {
  const progressValue = 20;
  console.log("progerssvalue===",progressValue)
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);

    const handletattooLocation = (tattooLocation) => {
      setUser({ ...user, tattooLocation });
      navigate(`/${tattooLocation}`); 

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
        <h1> FAME TATTOOS</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handletattooLocation('head')}>
          <h5>head</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('chest')}>
  
          <h5>chest</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('torso')}>
  
          <h5>torso</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('back')}>
  
          <h5>back</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('arm')}>
  
         <h5>arm</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('hand')}>
  
         <h5>hand</h5>
          
        </div>
      </div>

      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('hip')}>
  
         <h5>hip</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('glute')}>
  
         <h5>glute</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('leg')}>
  
         <h5>leg</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('foot')}>
  
         <h5>foot</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('neck')}
      >
  
         <h5>Neck</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('pelvic')}>
  
  <h5>pelvic</h5>
   
 </div>
      </div>

      </div>
      <ProgressBar progress={progressValue} />
      </div>
  </div>
  
    );
  }
  
export default TattooDashboard