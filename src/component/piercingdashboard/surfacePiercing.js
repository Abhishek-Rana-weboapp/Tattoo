import React, { useState } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function SurfacePiercing() {
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
        <h1>Surface Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Arm')}>
              <h5>Arm</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Back')}>
              <h5>Back</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Chest')}>
              <h5>Chest</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Face')}>
              <h5>Face</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Finger')}>
              <h5>Finger</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Foot')}>
              <h5>Foot </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Hand')}>
              <h5>Hand</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Hip')}>
              <h5>Hip</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Leg')}>
              <h5>Leg</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Neck')}>
              <h5>Neck</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Pelvic')}>
              <h5>Pelvic</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Ribs')}>
              <h5>Ribs</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Shoulder')}>
              <h5>Shoulder</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Stomach')}>
              <h5>Stomach</h5>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SurfacePiercing;
