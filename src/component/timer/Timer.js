import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = ({ isRunning, setIsRunning, startTime, endTime, billingData, setBillingData }) => {
  const [seconds, setSeconds] = useState(0);
  const { t } = useTranslation();
  const [totalTime, setTotalTime] = useState();
  const [selectedBreakTime, setSelectedBreakTime] = useState('');
  const requestRef = useRef();
  const startTimeRef = useRef();

  const animate = () => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = performance.now();
    }

    const elapsed = performance.now() - startTimeRef.current;
    const newSeconds = Math.floor(elapsed / 1000);

    if (isRunning) {
      setSeconds(newSeconds);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    if (selectedBreakTime) {
      setBillingData({ ...billingData, break_time: selectedBreakTime });
      const totalSeconds = seconds - selectedBreakTime * 60;
      if (totalSeconds <= 0) {
        setTotalTime(0);
      } else {
        setTotalTime(
          `${String(Math.floor(totalSeconds / 3600)).padStart(2, '0')} : ${String(
            Math.floor((totalSeconds % 3600) / 60)
          ).padStart(2, '0')}`
        );
      }
    } else {
      setTotalTime(
        `${String(Math.floor(seconds / 3600)).padStart(2, '0')} : ${String(
          Math.floor((seconds % 3600) / 60)
        ).padStart(2, '0')}`
      );
    }
  }, [selectedBreakTime, seconds]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  const breakTimes = [
    { label: '00:15', value: 15 },
    { label: '00:30', value: 30 },
    { label: '00:45', value: 45 },
    { label: '01:00', value: 60 },
    { label: '01:15', value: 75 },
    { label: '01:30', value: 90 },
    { label: '01:45', value: 105 },
    { label: '02:00', value: 120 },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-3">
        <label className="md:text-4xl font-bold text-white uppercase">{t('time calculation')}</label>
        <p className="text-xl text-yellow-400 font-bold text-center">Start Time: {startTime}</p>
        <p className="text-xl text-yellow-400 font-bold text-center">End Time: {endTime}</p>
        <div className="flex flex-col items-center">
          <label>Timer Calculated</label>
          <span
            className={`${
              endTime
                ? 'bg-yellow-400 rounded-lg  w-full flex justify-center p-1 font-bold text-black items-center text-3xl'
                : 'text-5xl'
            }`}
          >
            {!endTime ? formatTime(seconds) : `${String(Math.floor(seconds / 3600)).padStart(2, '0')} : ${String(
                Math.floor((seconds % 3600) / 60)
              ).padStart(2, '0')}`}
          </span>
        </div>
        {endTime && (
          <div className="flex flex-col gap-2 items-center">
            <label>Break-time</label>
            <select
              className="p-2 text-black font-bold text-center text-xl w-full rounded-lg"
              value={selectedBreakTime}
              onChange={(e) => setSelectedBreakTime(e.target.value)}
            >
              <option className="font-bold" value={''}>
                Select
              </option>
              {breakTimes.map((item, index) => (
                <option className="font-bold" key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <div className="flex flex-col gap-2 items-center w-full">
              <label>{`Total Time :`}</label>
              <span className="w-full bg-yellow-400 text-2xl text-black font-bold flex justify-center p-2 rounded-lg">
                {' '}
                {totalTime ? totalTime : '00:00'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;



// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

// const Timer = ({ isRunning, setIsRunning,startTime, endTime, billingData, setBillingData }) => {
//   const [seconds, setSeconds] = useState(0);
//   const { t } = useTranslation();
//   const [totalTime , setTotalTime] = useState()
//   const [selectedBreakTime, setSelectedBreakTime] = useState("")

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds + 1);
//       }, 1000);
//     }
//     return () => clearInterval(intervalId); // Cleanup on component unmount or when stopped
//   }, [isRunning]); // Empty dependency array ensures the effect runs only once on mount

//   useEffect(()=>{
//     if(selectedBreakTime){
//       setBillingData({...billingData, break_time : selectedBreakTime})
//       const totalSeconds = seconds - selectedBreakTime * 60 
//       if(totalSeconds <= 0){
//         setTotalTime(0)
//       }else{
//         setTotalTime(`${String(Math.floor(totalSeconds / 3600)).padStart(2, '0')} : ${String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')}`)
//       }
//     }else{
//       setTotalTime(`${String(Math.floor(seconds / 3600)).padStart(2, '0')} : ${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}`)
//     }
//   },[selectedBreakTime])

//   const formatTime = (time) => {
//     console.log(time)
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const remainingSeconds = time % 60;
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
//   };

//   const breakTimes = [
//     { label: "00:15", value: 15 },
//     { label: "00:30", value: 30 },
//     { label: "00:45", value: 45 },
//     { label: "01:00", value: 60 },
//     { label: "01:15", value: 75 },
//     { label: "01:30", value: 90 },
//     { label: "01:45", value: 105 },
//     { label: "02:00", value: 120 },
//   ]

//   return (
//     <div className='flex flex-col items-center gap-2'>
//       <div className='flex flex-col gap-3'>
//       <label className='md:text-4xl font-bold text-white uppercase'>{t('time calculation')}</label>
//       <p className='text-xl text-yellow-400 font-bold text-center'>Start Time: {startTime}</p>
//       <p className='text-xl text-yellow-400 font-bold text-center'>End Time: {endTime}</p>
//       <div className='flex flex-col items-center'>
//         <label>Timer Calculated</label>
//       <span className={`${endTime ? "bg-yellow-400 rounded-lg  w-full flex justify-center p-1 font-bold text-black items-center text-3xl" : "text-5xl"}`}>
//       {!endTime ? formatTime(seconds) : `${String(Math.floor(seconds / 3600)).padStart(2, '0')} : ${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}` }
//       </span>
//       </div>
//       {
//         endTime && <div className='flex flex-col gap-2 items-center'>
//           <label>Break-time</label>
//           <select className='p-2 text-black font-bold text-center text-xl w-full rounded-lg' value={selectedBreakTime} onChange={(e)=>setSelectedBreakTime(e.target.value)}>
//             <option className='font-bold' value={""}>Select</option>
//             {
//               breakTimes.map((item, index) => {
//                 return <option className='font-bold' key={index} value={item.value}>{item.label}</option>
//               })
//             }
//           </select>
        
//         <div className='flex flex-col gap-2 items-center w-full'>
//         <label>{`Total Time :`}</label>
//         <span className='w-full bg-yellow-400 text-2xl text-black font-bold flex justify-center p-2 rounded-lg'> {totalTime ? totalTime : "00:00"}</span>
//         </div>
//         </div>
//       }
//       </div>
//     </div>
//   );
// };

// export default Timer;
