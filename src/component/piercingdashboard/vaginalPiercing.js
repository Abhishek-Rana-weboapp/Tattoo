import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function VaginalPiercing() {
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
        <h1>Vaginal Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Christina')}>
              <h5>Christina</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Vertical Hood')}>
              <h5>Vertical Hood</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Horizontal Hood')}>
              <h5>Horizontal Hood</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Inner Labia')}>
              <h5>Inner Labia</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Outer Labia')}>
              <h5>Outer Labia</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Fourchette')}>
              <h5>Fourchette </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Hymen')}>
              <h5>Hymen</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Isabella')}>
              <h5>Isabella</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Princess Albertina')}>
              <h5>Princess Albertina</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Triangle')}>
              <h5>Triangle</h5>
            </div>
          </div>         
               
        </div>
      </div>
    </div>
  );
}

export default VaginalPiercing;
