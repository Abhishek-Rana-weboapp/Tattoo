import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';

function PiercingDashboard() {
  const progressValue = 20;
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  const handlepartLocation = (bodyPart) => {
      setUser({ ...user, bodyPart });
      navigate('/medical-form'); 

    }
    const handpiercingLocation = (piercingLocation) => {
      setUser({ ...user, piercingLocation });
      navigate(`/${piercingLocation}`); 

    }
  return (
    <div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
      <div
        className="container h-100"
        style={{
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          width: '100%',
          border: '3px solid black',
        }}
      >
        <h1> Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Belly Piercing')} >
              <h5>Belly Piercing</h5>
            </div>
            <div className="inner-item" onClick={()=>handpiercingLocation('ear-piercing')}>
              <h5>Ear Area Piercing</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handpiercingLocation('facial-piercing')} >
              <h5>Facial Area Piercing</h5>
            </div>
            <div className="inner-item" onClick={()=>handpiercingLocation('jwelry-piercing')}>
              <h5>Jewelry Swap Piercing</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('nipple-piercing')}>
              <h5>Nipple Piercing</h5>
            </div>
            <div className="inner-item" onClick={()=>handpiercingLocation('nose-piercing')}>
              <h5>Nose Area Piercing </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handpiercingLocation('oral-piercing')}>
              <h5>Oral Area Piercing</h5>
            </div>
            <div className="inner-item" onClick={()=>handpiercingLocation('surface-piercing')}>
              <h5>Surface Piercing</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handpiercingLocation('vaginal-piercing')}>
              <h5>Vaginal Area Piercing</h5>
            </div>
     
          </div>         
          
        </div>
        <ProgressBar progress={progressValue} />
      </div>
    </div>
  );
}

export default PiercingDashboard;
