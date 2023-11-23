import React, { useState } from 'react';

const containerStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '20px',
  margin: '140px 330px',
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

function PriceServices() {
  const [selectedOption, setSelectedOption] = useState('hourly');
  const [hourlyRate, setHourlyRate] = useState('');
  const [setPrice, setSetPrice] = useState('');
  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div style={containerStyle}>
      <h2>PRICE FOR SERVICE:</h2>
      <label style={labelStyle}>
        <input
          type="radio"
          value="hourly"
          checked={selectedOption === 'hourly'}
          onChange={handleOptionChange}
        /> Hourly Rate
      </label>
      <label style={labelStyle}>
        <input
          type="radio"
          value="setPrice"
          checked={selectedOption === 'setPrice'}
          onChange={handleOptionChange}
        /> Set Price
      </label>
      {selectedOption === 'hourly' && (
          <div>
          <label style={labelStyle}>Hourly Rate Amount: $</label>
          <input
            type="text"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            style={inputStyle}
            />
        </div>
      )}

      {selectedOption === 'setPrice' && (
          <div>
          <label style={labelStyle}>Final Set Price: $</label>
          <input
            type="text"
            value={setPrice}
            onChange={(e) => setSetPrice(e.target.value)}
            style={inputStyle}
            />
        </div>
      )}
      <button>Submit</button>
    </div>
  );
}

export default PriceServices;
