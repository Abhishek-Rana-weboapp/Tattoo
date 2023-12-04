// ProgressBar.js
import React, { useEffect } from 'react';

const ProgressBar = ({ progress }) => {
  useEffect(() => {
    // You can use the 'progress' value here as needed
    console.log('Progress value:', progress);
  }, [progress]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50px',width: "100%" }}>
    <div style={{ width: '50%', height: '12px', border: '1px solid #fff', borderRadius: '6px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#FFA500',
          transition: 'width 1s ease-in-out',
          borderRadius: '5px', // Adjusted border radius to fit inside the container border
        }}
      ></div>
    </div>
  </div>
  );
};

export default ProgressBar;
