import React, { useState } from 'react';

const containerStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '20px',
  margin: '100px',
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

function TattooSection() {
  const [tattooType, setTattooType] = useState('coverup');
  const [requiresBeforePicture, setRequiresBeforePicture] = useState(false);

  const handleTattooTypeChange = (e) => {
    setTattooType(e.target.value);
  };

  return (
    <div style={containerStyle}>
      <h2>For Tattoos:</h2>
      <label style={labelStyle}>
        Is this a coverup or fix-up?
        <select
          value={tattooType}
          onChange={handleTattooTypeChange}
          style={inputStyle}
        >
          <option value="coverup">Coverup</option>
          <option value="fixup">Fix-up</option>
        </select>
      </label>

      {tattooType === 'coverup' && (
        <div>
          <label style={labelStyle}>Before Picture is required</label>
        </div>
      )}
    </div>
  );
}

function TattooRemovalSection() {
  const containerStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    margin: '100px',
  };

  return (
    <div style={containerStyle}>
      <h2>For Tattoo Removal:</h2>
      <label style={labelStyle}>Before Picture is always required</label>
    </div>
  );
}

function TattooComponent() {
  return (
    <div>
      <TattooSection />
      <TattooRemovalSection />
    </div>
  );
}

export default TattooComponent;
