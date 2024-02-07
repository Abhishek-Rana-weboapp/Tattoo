import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../url";
import UserContext from "../../../context/UserContext";
import { useTranslation } from "react-i18next";
import LoaderModal from "../../modal/LoaderModal";

export default function ShowBill({
  resultantMinutes,
  updateAppointment,
  setUpdateAppointment,
  handlePrev,
}) {
  const [totalWorkingTime, setTotalWorkingTime] = useState();
  const [loading, setLoading] = useState(false);
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (updateAppointment.start_time && updateAppointment.end_time) {
      if (updateAppointment.break_time === 0) {
        setTotalWorkingTime(resultantMinutes);
      } else {
        const withoutBreak =
          resultantMinutes - updateAppointment.break_time * 60;
        setTotalWorkingTime(withoutBreak);
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleNext = async () => {
    setLoading(true);
    const data = {
      updates: [
        {
          id: updateAppointment?.id,
          updateField: "process_step",
          updateValue: 6,
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
  };

  if(loading){
    return <LoaderModal/>
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="font-bold text-white">Bill</h3>
      <label className="text-xl font-semibold">Price calculation</label>
      <div className="flex gap-2 ">
        <label>Bill by : </label>
        <label>{updateAppointment?.bill_by}</label>
      </div>
      <div className="flex gap-2 ">
        <label>Total Time : </label>
        <label>
          {resultantMinutes
            ? `${String(Math.floor(resultantMinutes / 3600)).padStart(
                2,
                "0"
              )} : ${String(
                Math.floor((resultantMinutes % 3600) / 60)
              ).padStart(2, "0")}`
            : "00:00"}
        </label>
      </div>
      <div className="flex gap-2 ">
        <label>Break Time : </label>
        <label>
          {String(Math.floor(updateAppointment?.break_time / 60)).padStart(
            2,
            "0"
          )}{" "}
          :{" "}
          {String(Math.floor(updateAppointment?.break_time % 60)).padStart(
            2,
            "0"
          )}
        </label>
      </div>
      <div className="flex gap-2 ">
        <label>Total Work Time : </label>
        <label>{`${String(Math.floor(totalWorkingTime / 3600)).padStart(
          2,
          "0"
        )} : ${String(Math.floor((totalWorkingTime % 3600) / 60)).padStart(
          2,
          "0"
        )}`}</label>
      </div>

      <div className="flex gap-2 ">
        <label className="text-xl font-bold text-yellow-400">
          Total Price :{" "}
        </label>
        <label className="text-xl font-bold">
          ${parseInt(updateAppointment?.final_price)}
        </label>
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="text-black yellowButton rounded-xl py-2 px-4 font-bold"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
