import React, { useState, useEffect } from 'react';

const Timer = ({isRunning, setIsRunning}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount or when stopped
  }, [isRunning]); // Empty dependency array ensures the effect runs only once on mount

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <p className='text-2xl'>{formatTime(seconds)}</p>
    </div>
  );
};

export default Timer;
