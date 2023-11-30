import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
function NosePiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  const handlepartLocation = (bodyPart) => {
    setUser({ ...user, bodyPart });
    navigate('/medical-form'); 

  }
  return (
    <div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
      <div
        className="container h-100"
        style={{
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          border: '3px solid black',
        }}
      >
        <h1> Nose Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Nostril')}>
              <h5>Nostril</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Septum')}>
              <h5>Septum</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Austin Bar')}>
              <h5>Austin Bar</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Erl')}>
              <h5>Erl</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('High Nostril')}>
              <h5>High Nostril</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Nostril Nasallang')}>
              <h5>Nostril Nasallang </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Rhino')}>
              <h5>Rhino</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Septril')}>
              <h5>Septril </h5>
            </div>
          </div>        
            <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Third Eye')}>
              <h5>Third Eye</h5>
            </div>
      
          </div>
        </div>
        <ProgressBar progress={progressValue} />
      </div>
    </div>
  );
}

export default NosePiercing;
