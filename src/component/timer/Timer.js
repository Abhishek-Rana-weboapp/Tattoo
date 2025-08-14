import { useEffect, useState, useRef, useMemo } from "react";
import { useAppointmentContext } from "../../context/AppointmentContext";
import {
  formatTimeDisplay,
  formatSecondsToHHMMSS,
} from "../../commonFunctions/timeFunctions";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import TranslationWrapper from "../Layout/TranslationWrapper";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../modal/LoaderModal";

const allBreakTimes = [
  { label: "00:00", value: 0 },
  { label: "00:15", value: 15 },
  { label: "00:30", value: 30 },
  { label: "00:45", value: 45 },
  { label: "01:00", value: 60 },
  { label: "01:15", value: 75 },
  { label: "01:30", value: 90 },
  { label: "01:45", value: 105 },
  { label: "02:00", value: 120 },
];

const Timer = () => {
  const navigate = useNavigate();
  const { appointment, setAppointment } = useAppointmentContext();

  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(0);

  const intervalRef = useRef(null);
  const startTimestampRef = useRef(null); // stores start time in ms

  useEffect(() => {
    if (appointment?.startTime && !appointment?.endTime) {
      startTimestampRef.current = new Date(appointment.startTime).getTime();
      updateElapsedTime();
      setIsRunning(true);
    }

    if (appointment?.startTime && appointment?.endTime) {
      const start = new Date(appointment.startTime);
      const end = new Date(appointment.endTime);
      const elapsed = Math.floor((end - start) / 1000);
      setDisplaySeconds(elapsed);
    }

    if (appointment?.breakTime) {
      setBreakTime(appointment.breakTime);
    }
  }, [appointment]);

  const updateElapsedTime = () => {
    if (!startTimestampRef.current) return;
    const now = Date.now();
    const elapsed = Math.floor((now - startTimestampRef.current) / 1000);
    setDisplaySeconds(elapsed);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateElapsedTime();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleStart = async () => {
    const nowUTC = new Date().toISOString();

    try {
      const response = await axiosInstance.put(
        `/appointment/${appointment.id}`,
        { startTime: nowUTC }
      );
      if (response.status === 200) {
        setAppointment(response.data.appointment);
        startTimestampRef.current = new Date(response.data.appointment.startTime).getTime();
        setIsRunning(true);
        setDisplaySeconds(0);
      }
    } catch (error) {
      toast.error("Error starting timer");
    }
  };

  const handleEnd = async () => {
    const nowUTC = new Date().toISOString();
    clearInterval(intervalRef.current);
    setIsRunning(false);
    try {
      const response = await axiosInstance.put(
        `/appointment/${appointment.id}`,
        { endTime: nowUTC }
      );
      if (response.status === 200) {
        setAppointment(response.data.appointment);
      }
    } catch (error) {
      toast.error("Error ending timer");
    }
  };

  const handleBreakSelect = async (value) => {
    setBreakTime(value);
    try {
      const response = await axiosInstance.put(
        `/appointment/${appointment.id}`,
        { breakTime: value }
      );
      if (response.status === 200) {
        setAppointment(response.data.appointment);
      }
    } catch (error) {
      toast.error("Error updating break time");
    }
  };

  const handleNext = async () => {
    if (!appointment.startTime || !appointment.endTime) {
      toast.error("You cannot proceed without the start and end time");
      return;
    }
    try {
      setLoading(true);
      const updates = {
        adminProcessStep: 5,
      };
      const response = await axiosInstance.put(
        `/appointment/${appointment.id}`,
        updates
      );
      if (response.status === 200) {
        setAppointment(response.data.appointment);
        navigate(`/billing/${response.data.appointment.adminProcessStep}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to proceed further");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    navigate(`/billing/3`);
  };

  const availableBreakOptions = useMemo(() => {
    const maxBreak = Math.floor(displaySeconds / 60);
    return allBreakTimes.filter((b) => b.value <= maxBreak);
  }, [displaySeconds]);

  const totalSeconds = displaySeconds - breakTime * 60;
  const adjustedSeconds = totalSeconds > 0 ? totalSeconds : 0;

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 text-white">
      <h2 className="text-3xl font-bold">Timer</h2>

      {appointment?.startTime && !appointment?.endTime && (
        <div className="text-xl text-yellow-400">
          Start Time: {formatTimeDisplay(appointment.startTime)}
        </div>
      )}

      {appointment?.endTime && (
        <div className="text-xl text-yellow-400">
          Start: {formatTimeDisplay(appointment.startTime)} <br />
          End: {formatTimeDisplay(appointment.endTime)}
        </div>
      )}

      <div className="text-5xl font-mono">
        {formatSecondsToHHMMSS(displaySeconds)}
      </div>

      {!appointment?.startTime && (
        <button
          onClick={handleStart}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg"
        >
          Start Timer
        </button>
      )}

      {isRunning && (
        <button
          onClick={handleEnd}
          className="bg-red-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          End Timer
        </button>
      )}

      {appointment?.endTime && (
        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          <label className="text-lg font-semibold">Break Time</label>
          <select
            className="w-full p-2 text-black rounded-lg"
            value={breakTime}
            onChange={(e) => handleBreakSelect(Number(e.target.value))}
          >
            {availableBreakOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>

          <div className="text-xl text-green-400 font-bold">
            Total Time: {formatSecondsToHHMMSS(adjustedSeconds)}
          </div>

          <div className="flex gap-5 items-center">
            <button
              className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
              onClick={handlePrev}
            >
              <TranslationWrapper text={"Back"} />
            </button>
            <button
              className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
              onClick={handleNext}
            >
              <TranslationWrapper text={"Next"} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;


// import { useState, useEffect, useRef, useContext } from "react";
// import { useTranslation } from "react-i18next";
// import UserContext from "../../context/UserContext";
// import { apiUrl } from "../../url";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import LoaderModal from "../modal/LoaderModal";
// import { AUTHHEADERS } from "../../commonFunctions/Headers";
// import { formatCurrentTime } from "../../commonFunctions/timeFunctions";

// const Timer = ({
//   updateAppointment,
//   setUpdateAppointment,
//   setBill,
//   handlePrev,
// }) => {
//   const navigate = useNavigate();
//   const [seconds, setSeconds] = useState(0);
//   const { alert, setAlert, setAlertMessage } = useContext(UserContext);
//   const { t } = useTranslation();
//   const [totalTime, setTotalTime] = useState();
//   const [selectedBreakTime, setSelectedBreakTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const artistName = sessionStorage.getItem("fullname");
//   const [tabFocused, setTabFocused] = useState(true);
//   const intervalIdRef = useRef();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       setTabFocused(document.visibilityState === "visible");
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (
//       tabFocused &&
//       updateAppointment?.startTime &&
//       !updateAppointment?.endTime
//     ) {
//       const startTime = new Date(updateAppointment.startTime);
//       const currentTime = new Date();
//       const elapsed = Math.floor((currentTime - startTime) / 1000);
//       setSeconds(elapsed);
//       setStartTime(formatCurrentTime(startTime));
//     }
//   }, [tabFocused, updateAppointment]);

//   useEffect(() => {
//     if (updateAppointment.startTime && updateAppointment.endTime) {
//       const startTime = new Date(updateAppointment.startTime);
//       const endTime = new Date(updateAppointment.endTime);
//       setStartTime(formatCurrentTime(startTime));
//       setEndTime(formatCurrentTime(endTime));
//       const elapsed = Math.floor((endTime - startTime) / 1000);
//       setSeconds(elapsed);
//     }
//   }, []);

//   useEffect(() => {
//     if (updateAppointment?.startTime && !updateAppointment?.endTime) {
//       const startTime = new Date(updateAppointment.startTime);
//       const currentTime = new Date();
//       const elapsed = Math.floor((currentTime - startTime) / 1000);
//       setSeconds(elapsed);
//       setStartTime(formatCurrentTime(startTime));
//     }
//   }, [updateAppointment]);

//   useEffect(() => {
//     if (startTime && isRunning) {
//       intervalIdRef.current = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds + 1);
//       }, 1000);

//       return () => clearInterval(intervalIdRef.current);
//     }
//   }, [startTime]);

//   useEffect(() => {
//     if (updateAppointment?.breakTime === null) {
//       updateBreakTime();
//     }
//     if (updateAppointment.startTime && !updateAppointment.endTime) {
//       setIsRunning(true);
//     }
//     if (updateAppointment.startTime && updateAppointment.endTime) {
//       setIsRunning(false);
//     }
//   }, [updateAppointment]);

//   const updateBreakTime = async () => {
//     setLoading(true);
//     const data = {
//       updates: [
//         {
//           id: updateAppointment?.id,
//           updateField: "breakTime",
//           updateValue: selectedBreakTime,
//         },
//       ],
//     };
//     await axios
//       .post(`${apiUrl}artist/post_new`, data, {headers:AUTHHEADERS()})
//       .then((res) => {
//         setUpdateAppointment(res.data.updatedtable);
//         setLoading(false)
//       })
//       .catch((err) => {
//         setLoading(false);
//         setAlert(!alert);
//         setAlertMessage(t("Something went wrong"));
//         return;
//       });
//   };

//   useEffect(() => {
//     if (selectedBreakTime !== 0) {
//       if (selectedBreakTime * 60 > seconds) {
//         setSelectedBreakTime(0);
//         setAlertMessage("The Break Time cannot exceed total time");
//         setAlert(!alert);
//       } else {
//         updateBreakTime();
//       }
//       const totalSeconds = seconds - selectedBreakTime * 60;
//       if (totalSeconds <= 0) {
//         setTotalTime(0);
//       } else {
//         setTotalTime(
//           `${String(Math.floor(totalSeconds / 3600)).padStart(
//             2,
//             "0"
//           )} : ${String(Math.floor((totalSeconds % 3600) / 60)).padStart(
//             2,
//             "0"
//           )}`
//         );
//       }
//     } else {
//       setTotalTime(
//         `${String(Math.floor(seconds / 3600)).padStart(2, "0")} : ${String(
//           Math.floor((seconds % 3600) / 60)
//         ).padStart(2, "0")}`
//       );
//     }
//   }, [selectedBreakTime, seconds]);

//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const remainingSeconds = time % 60;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}:${String(remainingSeconds).padStart(2, "0")}`;
//   };

//   const breakTimes = [
//     { label: "00:00", value: 0 },
//     { label: "00:15", value: 15 },
//     { label: "00:30", value: 30 },
//     { label: "00:45", value: 45 },
//     { label: "01:00", value: 60 },
//     { label: "01:15", value: 75 },
//     { label: "01:30", value: 90 },
//     { label: "01:45", value: 105 },
//     { label: "02:00", value: 120 },
//   ];

//   const handleTime = async (key) => {
//     const now = new Date();
//     if (key === "startTime") {
//       setSeconds(0);
//       setStartTime(formatCurrentTime(now));
//       setIsRunning(true);
//     }
//     if (key === "endTime") {
//       setEndTime(formatCurrentTime(now));
//       setIsRunning(false);
//       clearInterval(intervalIdRef.current);
//     }
//     // const options = {
//     //   year: "numeric",
//     //   month: "numeric",
//     //   day: "numeric",
//     //   hour: "2-digit",
//     //   minute: "2-digit",
//     //   second: "2-digit",
//     //   hour12: true,
//     // };
//     // const formattedDateTime = now.toLocaleString(undefined, options);
//     const data = {
//       updates: [
//         {
//           id: updateAppointment?.id,
//           updateField: key,
//           updateValue: now,
//         },
//       ],
//     };
//     await axios
//       .post(`${apiUrl}artist/post_new`, data, {headers:AUTHHEADERS()})
//       .then((res) => {
//         setUpdateAppointment(res.data.updatedtable);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleBillingSubmit = async () => {
//     if (updateAppointment?.startTime && updateAppointment?.endTime) {
//       setLoading(true);
//       const data = {
//         appointment_id: updateAppointment?.id,
//       };
//       await axios
//         .post(`${apiUrl}artist/calculate-billing`, data, {headers:AUTHHEADERS()})
//         .then((res) => {
//           setBill(res.data.updatedBillingData);
//           const data = {
//             updates: [
//               {
//                 id: updateAppointment?.id,
//                 updateField: "process_step",
//                 updateValue: 5,
//               },
//               {
//                 id: updateAppointment?.id,
//                 updateField: "bill_by",
//                 updateValue: artistName,
//               },
//             ],
//           };
//           axios
//             .post(`${apiUrl}artist/post_new`, data,{headers:AUTHHEADERS()})
//             .then((res) => {
//               setUpdateAppointment(res.data.updatedtable);
//               setLoading(false)
//               navigate(`/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`);
//             })
//             .catch((err) => {
//               setLoading(false);
//               setAlert(!alert);
//               setAlertMessage(t("Something went wrong"));
//             });
//         })
//         .catch((err) => console.error(err));
//     }
//   };

//   if (loading) {
//     return <LoaderModal />;
//   }

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <div className="flex flex-col gap-3">
//         <label className="md:text-4xl font-bold text-white uppercase text-center">
//           {t("time calculation")}
//         </label>
//         <p className="text-xl text-yellow-400 font-bold text-center">
//           {t("Start Time:")} {startTime ? startTime : ""}
//         </p>
//         <p className="text-xl text-yellow-400 font-bold text-center">
//           {t("End Time:")} {endTime.toString()}
//         </p>
//         <div className="flex flex-col items-center">
//           <label>{t("Timer Calculated")}</label>
//           <span
//             className={`${
//               endTime
//                 ? "bg-yellow-400 rounded-lg  w-full flex justify-center p-1 font-bold text-black items-center text-3xl"
//                 : "text-5xl"
//             }`}
//           >
//             {!endTime
//               ? formatTime(seconds)
//               : `${String(Math.floor(seconds / 3600)).padStart(
//                   2,
//                   "0"
//                 )} : ${String(Math.floor((seconds % 3600) / 60)).padStart(
//                   2,
//                   "0"
//                 )}`}
//           </span>
//         </div>
//         {endTime && (
//           <div className="flex flex-col gap-2 items-center">
//             <label>{t("Break-time")}</label>
//             <select
//               className="p-2 text-black font-bold text-center text-xl w-full rounded-lg"
//               value={selectedBreakTime}
//               onChange={(e) => setSelectedBreakTime(e.target.value)}
//             >
//               {breakTimes.map((item, index) => (
//                 <option className="font-bold" key={index} value={item.value}>
//                   {item.label}
//                 </option>
//               ))}
//             </select>
//             <div className="flex flex-col gap-2 items-center w-full">
//               <label>{t(`Total Time :`)}</label>
//               <span className="w-full bg-yellow-400 text-2xl text-black font-bold flex justify-center p-2 rounded-lg">
//                 {" "}
//                 {totalTime ? totalTime : "00:00"}
//               </span>
//             </div>
//           </div>
//         )}

//         {!isRunning && !updateAppointment?.startTime && (
//           <button
//             name="startTime"
//             className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
//             onClick={() => handleTime("startTime")}
//           >
//             {t("Start")}
//           </button>
//         )}
//         {isRunning && !updateAppointment.endTime && (
//           <button
//             className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
//             name="endTime"
//             onClick={() => handleTime("endTime")}
//           >
//             {t("End")}
//           </button>
//         )}
//         {updateAppointment.endTime && updateAppointment.startTime && (
//           <div className="flex justify-center gap-4">
//             <button
//               className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
//               onClick={handlePrev}
//             >
//               {t("Back")}
//             </button>
//             <button
//               className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
//               onClick={handleBillingSubmit}
//             >
//               {t("Next")}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Timer;
