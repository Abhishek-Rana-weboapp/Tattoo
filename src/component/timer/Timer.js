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

      <div className="sm:text-5xl text-3xl font-mono">
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

