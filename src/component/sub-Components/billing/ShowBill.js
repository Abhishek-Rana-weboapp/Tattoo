import {useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../config/axios";
import LoaderModal from "../../modal/LoaderModal";
import { formatSecondsToHHMMSS } from "../../../commonFunctions/timeFunctions";
import { useAppointmentContext } from "../../../context/AppointmentContext";
import toast from "react-hot-toast";

export default function ShowBill({ }) {
  const { appointment, setAppointment } = useAppointmentContext();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // --- Derived time values
  const totalSeconds = useMemo(() => {
    if (!appointment?.startTime || !appointment?.endTime) return 0;
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);
    return Math.floor((end - start) / 1000);
  }, [appointment]);

  const breakSeconds = (appointment?.breakTime || 0) * 60;

  const workingSeconds = useMemo(() => {
    return Math.max(0, totalSeconds - breakSeconds);
  }, [totalSeconds, breakSeconds]);

  const handleNext = async () => {
    setLoading(true);
    try {
      const updates = {
        adminProcessStep: 6,
      };

      const response = await axiosInstance.put(
        `/appointment/${appointment.id}`,
        updates
      );

      if (response.status === 200) {
        setAppointment(response.data.appointment);
        navigate(`/billing/${response.data.appointment.adminProcessStep}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = ()=>{
    navigate(`/billing/4`)
  }

  if (loading) return <LoaderModal />;

  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="font-bold text-white md:text-2xl text-lg">{t("Bill")}</h3>

      <label className="text-xl font-semibold">{t("Price calculation")}</label>

      <div className="flex gap-2">
        <label>{t("Bill by :")}</label>
        <label>{appointment?.billBy}</label>
      </div>

      <div className="flex gap-2">
        <label>{t("Total Time :")} </label>
        <label>{formatSecondsToHHMMSS(totalSeconds)}</label>
      </div>

      <div className="flex gap-2">
        <label>{t("Break-time")}</label>
        <label>{formatSecondsToHHMMSS(breakSeconds)}</label>
      </div>

      <div className="flex gap-2">
        <label>{t("Total Work Time :")}</label>
        <label>{formatSecondsToHHMMSS(workingSeconds)}</label>
      </div>

      <div className="flex gap-2">
        <label className="text-xl font-bold text-yellow-400">
          {t("Total Price :")}
        </label>
        <label className="text-xl font-bold">
          ${parseInt(appointment?.finalPrice) || 0}
        </label>
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
          onClick={handlePrev}
        >
          {t("Back")}
        </button>
        <button
          className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
          onClick={handleNext}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
}

