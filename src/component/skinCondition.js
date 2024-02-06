import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { apiUrl } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SkinCondition({
  onClick,
  handlePrev,
  updateAppointment,
  setUpdateAppointment,
}) {
  const navigate = useNavigate()
  const [condition, setCondition] = useState(updateAppointment?.skin_conditions === "good" ? "good" :updateAppointment?.skin_conditions === "bad" ? "bad" : "");
  const [explanation, setExplanation] = useState(updateAppointment?.skin_conditions !== "good" ? updateAppointment?.skin_conditions : "");
  const { setIsVisible } = useContext(UserContext);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleUpdateSkin = async () => {
    if(condition){
      const data = {
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
      await axios
      .post(`${apiUrl}/artist/post_new`, data)
      .then((res) => {
        axios
        .get(
          `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
          )
          .then((res) => {
            setUpdateAppointment(res.data.data[0]);
            navigate(
              `/billing/${updateAppointment?.id}/${res.data.data[0].process_step}`
              );
            })
            .catch((err) => {
              console.error(err);
            });
          })
          .catch((err) => {
            console.error(err);
          });
        }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full ">
      <div className="w-full flex flex-col gap-3 items-center">
        <h3>Please Select Skin Condition</h3>
        <select
          className="p-2 rounded-lg md:w-2/4 w-full text-black font-semibold"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value={""}>Select</option>
          <option value={"good"}>Good</option>
          <option value={"bad"}>Bad</option>
        </select>
        {condition === "bad" && (
          <>
            <h5 className="text-white">Explain the skin condition :</h5>
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
            Prev
          </button>
          <button
            className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
            onClick={handleUpdateSkin}
          >
            Update Skin Condition
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkinCondition;
