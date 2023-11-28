import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function OralPiercing() {
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
        <h1>Oral Area Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Straight Bar Tongue')}>
              <h5>Straight Bar Tongue</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Snake Eye Tongue')}>
              <h5>Snake Eye Tongue</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Snake Bite Lip')}>
              <h5>Snake Bite Lip</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Tongue Web')}>
              <h5>Tongue Web</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Smiley')}>
              <h5>Smiley</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Monroe')}>
              <h5>Monroe </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Medusa')}>
              <h5>Medusa</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Madonna')}>
              <h5>Madonna</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Dimples')}>
              <h5>Dimples</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Ahley')}>
              <h5>Ahley</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Angel Bites')}>
              <h5>Angel Bites</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Canine Bites')}>
              <h5>Canine Bites</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Cyber Bites')}>
              <h5>Cyber Bites</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Dahlia')}>
              <h5>Dahlia</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Dolphin Bites')}>
              <h5>Dolphin Bites</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Frowney')}>
              <h5>Frowney</h5>
            </div>
          </div>

          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Gum')}>
              <h5>Gum</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Horizontal Lip')}>
              <h5>Horizontal Lip</h5>
            </div>
          </div>      
            <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Jestrum')}>
              <h5>Jestrum</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Multi Tongue')}>
              <h5>Multi Tongue</h5>
            </div>
          </div>          
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Shark Bites')}>
              <h5>Shark Bites</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Spider Bites')}>
              <h5>Spider Bites</h5>
            </div>
          </div>          
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Vampire')}>
              <h5>Vampire</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Venom')} >
              <h5>Venom</h5>
            </div>
          </div>          
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Vertical Labret')}>
              <h5>Vertical Labret</h5>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default OralPiercing;