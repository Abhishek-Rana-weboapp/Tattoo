import React, { useEffect, useState } from 'react';

const ProgressBar = ({ progress, count }) => {
  const totalSteps = count; // Set your static total steps here
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const generateMarkers = () => {
      const newMarkers = [];
      for (let i = 1; i <= totalSteps; i++) {
        newMarkers.push(
          <>
            <div
              key={i}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: i <= progress ? '#FFA500' : '#ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 5px',
                color: i <= progress ? '#fff' : '#000',
                fontWeight: 'bold',
                border: '2px solid #ccc',
              }}
            >
              {i}
            </div>
            {i < totalSteps && i < progress && (
              <div
                key={`line-${i}`}
                style={{
                  width: '30px',
                  height: '2px',
                  backgroundColor: '#FFA500',
                  margin: '0 0 0 5px', // Adjusted margin to make the line touch the circle
                }}
              ></div>
            )}
          </>
        );
      }
      setMarkers(newMarkers);
    };

    generateMarkers();
  }, [progress, totalSteps]);

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px', width: '100%' }}>
    <div className='flex justify-center items-center p-2 flex-wrap max-w-full'>
      {markers}
    </div>
  );
};

export default ProgressBar;
