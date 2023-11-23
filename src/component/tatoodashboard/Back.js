import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button } from 'bootstrap';


function Back() {
  const navigate = useNavigate();
  const [showOtherField, setShowOtherField] = useState(false);
  const [otherFieldValue, setOtherFieldValue] = useState('');
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
        <h1> BACK</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Full Back Piece')}>
              <h5>Full Back Piece</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Right Shoulder')}>
              <h5>Right Shoulder</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Left Shoulder')}>
              <h5>Left Shoulder</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Spine')}>
              <h5>Spine</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Lower Back')}>
              <h5>Lower Back</h5>
            </div>
            <div className="inner-item" onClick={()=>setShowOtherField(true)}>
              <h5>Other </h5>
            </div>
          </div>
          {showOtherField && (
            <div>
              <label>Explanation:</label>
              <input
                type="text"
                value={otherFieldValue}
                onChange={(e) => setOtherFieldValue(e.target.value)}
              />
              <button onClick={()=> handlepartLocation(otherFieldValue)}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Back;
