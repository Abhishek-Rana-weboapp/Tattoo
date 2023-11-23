import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const containerStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '20px',
  margin: '10px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '5px',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const canvasStyle = {
  border: '1px solid #ccc',
  backgroundColor: 'white',
};

function SkinCondition() {
  const [skinCondition, setSkinCondition] = useState('good');
  const [explanation, setExplanation] = useState('');
  const [signature, setSignature] = useState(null);

  const sigCanvas = React.createRef();

  const handleSkinConditionChange = (e) => {
    setSkinCondition(e.target.value);
    if (e.target.value === 'good') {
      setExplanation('');
    }
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  return (
    <div style={containerStyle}>
      <h2>Skin Condition:</h2>
      <label style={labelStyle}>
        <input
          type="radio"
          value="good"
          checked={skinCondition === 'good'}
          onChange={handleSkinConditionChange}
        /> Good
      </label>
      <label style={labelStyle}>
        <input
          type="radio"
          value="bad"
          checked={skinCondition === 'bad'}
          onChange={handleSkinConditionChange}
        /> Bad: Please explain
      </label>

      {skinCondition === 'bad' && (
        <div>
          <label style={labelStyle}>Explanation:</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            style={{ ...inputStyle, height: '100px' }}
          />
          <div>
            <label style={labelStyle}>Signature:</label>
            <div>
              <div style={canvasStyle}>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{ width: 2000, height: 200, className: 'sigCanvas' }}
                  onEnd={() => setSignature(sigCanvas.current.toDataURL())}
                />
              </div>
              <button onClick={clearSignature}>Clear Signature</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkinCondition;
