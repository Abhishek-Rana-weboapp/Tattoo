import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../config/axios";
import LoaderModal from "../../modal/LoaderModal";
import { formatSecondsToHHMMSS } from "../../../commonFunctions/timeFunctions";
import { useAppointmentContext } from "../../../context/AppointmentContext";

export default function ShowBill({ }) {
  const { appointment, setAppointment } = useAppointmentContext();
  const [loading, setLoading] = useState(false);
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
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
      setAlert(!alert);
      setAlertMessage(t("Something went wrong"));
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


// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiUrl } from "../../../url";
// import UserContext from "../../../context/UserContext";
// import { useTranslation } from "react-i18next";
// import LoaderModal from "../../modal/LoaderModal";
// import { AUTHHEADERS } from "../../../commonFunctions/Headers";

// export default function ShowBill({
//   resultantMinutes,
//   updateAppointment,
//   setUpdateAppointment,
//   handlePrev,
// }) {
//   const [totalWorkingTime, setTotalWorkingTime] = useState();
//   const [loading, setLoading] = useState(false);
//   const { alert, setAlert, setAlertMessage } = useContext(UserContext);
//   const { t } = useTranslation();

//   useEffect(() => {
//     if (updateAppointment.start_time && updateAppointment.end_time) {
//       if (updateAppointment.break_time === 0) {
//         setTotalWorkingTime(resultantMinutes);
//       } else {
//         const withoutBreak =
//           resultantMinutes - updateAppointment.break_time * 60;
//         setTotalWorkingTime(withoutBreak);
//       }
//     }
//   }, []);

//   const navigate = useNavigate();

//   const handleNext = async () => {
//     setLoading(true);
//     const data = {
//       updates: [
//         {
//           id: updateAppointment?.id,
//           updateField: "process_step",
//           updateValue: 6,
//         },
//       ],
//     };
//     await axios
//       .post(`${apiUrl}artist/post_new`, data, {headers:AUTHHEADERS()})
//       .then((res) => {
//         setUpdateAppointment(res.data.updatedtable);
//         setLoading(false)
//         navigate(`/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`);
//       })
//       .catch((err) => {
//         setLoading(false);
//         setAlert(!alert);
//         setAlertMessage(t("Something went wrong"));
//       });
//   };

//   if(loading){
//     return <LoaderModal/>
//   }

//   return (
//     <div className="flex flex-col gap-2 items-center">
//       <h3 className="font-bold text-white">{t("Bill")}</h3>
//       <label className="text-xl font-semibold">{t("Price calculation")}</label>
//       <div className="flex gap-2 ">
//         <label>{t("Bill by :")}</label>
//         <label>{updateAppointment?.bill_by}</label>
//       </div>
//       <div className="flex gap-2 ">
//         <label>{t("Total Time :")} </label>
//         <label>
//           {resultantMinutes
//             ? `${String(Math.floor(resultantMinutes / 3600)).padStart(
//                 2,
//                 "0"
//               )} : ${String(
//                 Math.floor((resultantMinutes % 3600) / 60)
//               ).padStart(2, "0")}`
//             : "00:00"}
//         </label>
//       </div>
//       <div className="flex gap-2 ">
//         <label>{t("Break-time")}</label>
//         <label>
//           {String(Math.floor(updateAppointment?.break_time / 60)).padStart(
//             2,
//             "0"
//           )}{" "}
//           :{" "}
//           {String(Math.floor(updateAppointment?.break_time % 60)).padStart(
//             2,
//             "0"
//           )}
//         </label>
//       </div>
//       <div className="flex gap-2 ">
//         <label>{t("Total Work Time :")}</label>
//         <label>{`${String(Math.floor(totalWorkingTime / 3600)).padStart(
//           2,
//           "0"
//         )} : ${String(Math.floor((totalWorkingTime % 3600) / 60)).padStart(
//           2,
//           "0"
//         )}`}</label>
//       </div>

//       <div className="flex gap-2 ">
//         <label className="text-xl font-bold text-yellow-400">
//           {t("Total Price :")}{" "}
//         </label>
//         <label className="text-xl font-bold">
//           ${parseInt(updateAppointment?.final_price)}
//         </label>
//       </div>

//       <div className="flex justify-center gap-4">
//         <button
//           className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
//           onClick={handlePrev}
//         >
//           {t("Back")}
//         </button>
//         <button
//           className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
//           onClick={handleNext}
//         >
//           {t("Next")}
//         </button>
//       </div>
//     </div>
//   );
// }
