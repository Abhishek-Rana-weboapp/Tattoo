import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/UserContext";
import { apiUrl } from "../../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../modal/LoaderModal";

const Timer = ({
  updateAppointment,
  setUpdateAppointment,
  bill,
  setBill,
  handlePrev,
}) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const { t } = useTranslation();
  const [totalTime, setTotalTime] = useState();
  const [selectedBreakTime, setSelectedBreakTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const artistName = sessionStorage.getItem("fullname");
  const [tabFocused, setTabFocused] = useState(true);
  const intervalIdRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabFocused(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (
      tabFocused &&
      updateAppointment?.start_time &&
      !updateAppointment?.end_time
    ) {
      const startTime = new Date(updateAppointment.start_time);
      const currentTime = new Date();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      setSeconds(elapsed);
      setStartTime(formatCurrentTime(startTime));
    }
  }, [tabFocused, updateAppointment]);

  useEffect(() => {
    if (updateAppointment.start_time && updateAppointment.end_time) {
      const startTime = new Date(updateAppointment.start_time);
      const endTime = new Date(updateAppointment.end_time);
      setStartTime(formatCurrentTime(startTime));
      setEndTime(formatCurrentTime(endTime));
      const elapsed = Math.floor((endTime - startTime) / 1000);
      setSeconds(elapsed);
    }
  }, []);

  const fetchBill = async () => {
    await axios
      .get(`${apiUrl}/artist/billing_list_id?id`)
      .then((res) => {
        const getBill = res.data.data.filter(
          (bill) =>
            parseInt(bill.appointment_id) === parseInt(updateAppointment.id)
        );
        if (getBill.length > 0) {
          setBill(getBill[0]);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBill();
  }, []);

  useEffect(() => {
    if (updateAppointment?.start_time && !updateAppointment?.end_time) {
      const startTime = new Date(updateAppointment.start_time);
      const currentTime = new Date();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      setSeconds(elapsed);
      setStartTime(formatCurrentTime(startTime));
    }
  }, [updateAppointment]);

  useEffect(() => {
    if (startTime && isRunning) {
      intervalIdRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      return () => clearInterval(intervalIdRef.current);
    }
  }, [startTime]);

  useEffect(() => {
    if (updateAppointment?.break_time === null) {
      updateBreakTime();
    }
    if (updateAppointment.start_time && !updateAppointment.end_time) {
      setIsRunning(true);
    }
    if (updateAppointment.start_time && updateAppointment.end_time) {
      setIsRunning(false);
    }
  }, [updateAppointment]);

  const formatCurrentTime = (time) => {
    const startTime = new Date(time);
    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    const seconds = startTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${String(hours % 24).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")} ${ampm}`;
  };

  const updateBreakTime = async () => {
    setLoading(true);
    const data = {
      updates: [
        {
          id: updateAppointment?.id,
          updateField: "break_time",
          updateValue: selectedBreakTime,
        },
      ],
    };
    await axios
      .post(`${apiUrl}/artist/post_new`, data)
      .then((res) => {
        axios
          .get(
            `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
          )
          .then((res) => {
            setUpdateAppointment(res.data.data[0]);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setAlert(!alert);
            setAlertMessage(t("Something went wrong"));
            return;
          });
      })
      .catch((err) => {
        setLoading(false);
        setAlert(!alert);
        setAlertMessage(t("Something went wrong"));
        return;
      });
  };

  useEffect(() => {
    if (selectedBreakTime !== 0) {
      if (selectedBreakTime * 60 > seconds) {
        setSelectedBreakTime(0);
        setAlertMessage("The Break Time cannot exceed total time");
        setAlert(!alert);
      } else {
        updateBreakTime();
      }
      const totalSeconds = seconds - selectedBreakTime * 60;
      if (totalSeconds <= 0) {
        setTotalTime(0);
      } else {
        setTotalTime(
          `${String(Math.floor(totalSeconds / 3600)).padStart(
            2,
            "0"
          )} : ${String(Math.floor((totalSeconds % 3600) / 60)).padStart(
            2,
            "0"
          )}`
        );
      }
    } else {
      setTotalTime(
        `${String(Math.floor(seconds / 3600)).padStart(2, "0")} : ${String(
          Math.floor((seconds % 3600) / 60)
        ).padStart(2, "0")}`
      );
    }
  }, [selectedBreakTime, seconds]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const breakTimes = [
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

  const handleTime = async (key) => {
    const now = new Date();
    if (key === "start_time") {
      setSeconds(0);
      setStartTime(formatCurrentTime(now));
      setIsRunning(true);
    }
    if (key === "end_time") {
      setEndTime(formatCurrentTime(now));
      setIsRunning(false);
      clearInterval(intervalIdRef.current);
    }
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const formattedDateTime = now.toLocaleString(undefined, options);
    const data = {
      updates: [
        {
          id: updateAppointment?.id,
          updateField: key,
          updateValue: formattedDateTime,
        },
      ],
    };
    await axios
      .post(`${apiUrl}/artist/post_new`, data)
      .then((res) => {
        axios
          .get(
            `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
          )
          .then((res) => {
            setUpdateAppointment(res.data.data[0]);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleBillingSubmit = async () => {
    if (updateAppointment?.start_time && updateAppointment?.end_time) {
      setLoading(true);
      const data = {
        appointment_id: updateAppointment?.id,
      };
      await axios
        .post(`${apiUrl}/artist/calculate-billing`, data)
        .then((res) => {
          setBill(res.data.updatedBillingData);
          const data = {
            updates: [
              {
                id: updateAppointment?.id,
                updateField: "process_step",
                updateValue: 5,
              },
              {
                id: updateAppointment?.id,
                updateField: "bill_by",
                updateValue: artistName,
              },
            ],
          };
          axios
            .post(`${apiUrl}/artist/post_new`, data)
            .then((res) => {
              axios
                .get(
                  `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
                )
                .then((res) => {
                  setUpdateAppointment(res.data.data[0]);
                  setLoading(false);
                  navigate(
                    `/billing/${updateAppointment?.id}/${res.data.data[0].process_step}`
                  );
                })
                .catch((err) => {
                  setLoading(false);
                  setAlert(!alert);
                  setAlertMessage(t("Something went wrong"));
                });
            })
            .catch((err) => {
              setLoading(false);
              setAlert(!alert);
              setAlertMessage(t("Something went wrong"));
            });
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-3">
        <label className="md:text-4xl font-bold text-white uppercase text-center">
          {t("time calculation")}
        </label>
        <p className="text-xl text-yellow-400 font-bold text-center">
          Start Time: {startTime ? startTime : ""}
        </p>
        <p className="text-xl text-yellow-400 font-bold text-center">
          End Time: {endTime.toString()}
        </p>
        <div className="flex flex-col items-center">
          <label>Timer Calculated</label>
          <span
            className={`${
              endTime
                ? "bg-yellow-400 rounded-lg  w-full flex justify-center p-1 font-bold text-black items-center text-3xl"
                : "text-5xl"
            }`}
          >
            {!endTime
              ? formatTime(seconds)
              : `${String(Math.floor(seconds / 3600)).padStart(
                  2,
                  "0"
                )} : ${String(Math.floor((seconds % 3600) / 60)).padStart(
                  2,
                  "0"
                )}`}
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
              {breakTimes.map((item, index) => (
                <option className="font-bold" key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <div className="flex flex-col gap-2 items-center w-full">
              <label>{`Total Time :`}</label>
              <span className="w-full bg-yellow-400 text-2xl text-black font-bold flex justify-center p-2 rounded-lg">
                {" "}
                {totalTime ? totalTime : "00:00"}
              </span>
            </div>
          </div>
        )}

        {!isRunning && !updateAppointment?.start_time && (
          <button
            name="start_time"
            className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
            onClick={() => handleTime("start_time")}
          >
            Start
          </button>
        )}
        {isRunning && !updateAppointment.end_time && (
          <button
            className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
            name="end_time"
            onClick={() => handleTime("end_time")}
          >
            End
          </button>
        )}
        {updateAppointment.end_time && updateAppointment.start_time && (
          <div className="flex justify-center gap-4">
            <button
              className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
              onClick={handlePrev}
            >
              Prev
            </button>
            <button
              className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
              onClick={handleBillingSubmit}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
