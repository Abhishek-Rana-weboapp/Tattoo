import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { apiUrl } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AUTHHEADERS } from "../commonFunctions/Headers";

function SkinCondition({
  handlePrev,
  updateAppointment,
  setUpdateAppointment,
}) {
  const navigate = useNavigate()
  const [condition, setCondition] = useState(updateAppointment?.skin_conditions === "good" ? "good" :updateAppointment?.skin_conditions === "bad" ? "bad" : "");
  const [explanation, setExplanation] = useState(updateAppointment?.skin_conditions !== "good" ? updateAppointment?.skin_conditions : "");
  const {t} = useTranslation()
  const {alert, setAlert, setAlertMessage} = useContext(UserContext)
 

  const handleUpdateSkin = async () => {
    let data
    if(condition){
      if(condition === "bad" && !explanation){
        setAlert(!alert)
        setAlertMessage(t("Please enter an explanation"))
        return
      }
      if(updateAppointment.typeofservice === "tattoo" || updateAppointment.typeofservice === "removal"){
        data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: "skin_conditions",
              updateValue: condition === "good" ? condition : explanation,
            },
            {
              id: updateAppointment?.id,
              updateField: "process_step",
              updateValue: 3,
            },
          ],
        };
      }else{
        data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: "skin_conditions",
              updateValue: condition === "good" ? condition : explanation,
            },
            {
              id: updateAppointment?.id,
              updateField: "process_step",
              updateValue: 4,
            },
          ],
        };
      }
      await axios
      .post(`${apiUrl}/artist/post_new`, data, {headers:AUTHHEADERS()})
      .then((res) => {
            setUpdateAppointment(res.data.updatedtable);
            navigate(`/billing/${updateAppointment?.id}/${res.data.updatedtable.process_step}`);
          })
          .catch((err) => {
            console.error(err);
          });
        }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full ">
      <div className="w-full flex flex-col gap-3 items-center">
        <h3>{t("Please Select Skin Condition")}</h3>
        <select
          className="p-2 rounded-lg md:w-2/4 w-full text-black font-semibold"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value={""}>Select</option>
          <option value={"good"}>{t("Good")}</option>
          <option value={"bad"}>{t("Bad")}</option>
        </select>
        {condition === "bad" && (
          <>
            <h5 className="text-white">{t("Explain the skin condition :")}</h5>
            <textarea
              className="w-full h-28 md:w-2/4 rounded-xl p-2 text-black"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </>
        )}
        <div className="flex gap-5 items-center">
          <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={handlePrev}
          >
            {t("Back")}
          </button>
          <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={handleUpdateSkin}
          >
            {t("Update Skin Condition")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkinCondition;
