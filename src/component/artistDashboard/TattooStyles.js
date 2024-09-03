import React, { useContext, useEffect, useState } from "react";
import {
  colorStyles,
  pmuStyles,
  pmuTypes,
  tattooStyles,
  tattooTypes,
} from "../../data/tattooStyles";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AUTHHEADERS } from "../../commonFunctions/Headers";
import { apiUrl } from "../../url";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const TattooStyles = ({
  updateAppointment,
  setUpdateAppointment,
  handlePrev,
}) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [styles, setStyles] = useState(
    updateAppointment.typeofservice === "tattoo" ? tattooStyles : pmuStyles
  );
  const [types, setTypes] = useState(
    updateAppointment.typeofservice === "tattoo" ? tattooTypes : pmuTypes
  );
  const [colors, setColors] = useState(
    updateAppointment.typeofservice === "tattoo" ? colorStyles : []
  );
  const [selectedOptions, setSelectedOptions] = useState({
    style:
      updateAppointment.typeofservice === "tattoo"
        ? tattooStyles[0]
        : pmuStyles[0],
    type:
      updateAppointment.typeofservice === "tattoo"
        ? tattooTypes[0]
        : pmuTypes[0],
    color: updateAppointment.typeofservice === "tattoo" ? colorStyles[0] : null,
  });
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);

  const handleNext = async () => {
    console.log(updateAppointment.typeofservice);
    setLoading(true);
    const data =
      updateAppointment.typeofservice === "tattoo"
        ? {
            updates: [
              {
                id: updateAppointment?.id,
                updateField: "tattoo_style",
                updateValue: selectedOptions.style,
              },
              {
                id: updateAppointment?.id,
                updateField: "tattoo_type",
                updateValue: selectedOptions.type,
              },
              {
                id: updateAppointment?.id,
                updateField: "color_style",
                updateValue: selectedOptions.color,
              },
              {
                id: updateAppointment?.id,
                updateField: "process_step",
                updateValue: 8,
              },
            ],
          }
        : {
            updates: [
              {
                id: updateAppointment?.id,
                updateField: "tattoo_style",
                updateValue: selectedOptions.style,
              },
              {
                id: updateAppointment?.id,
                updateField: "tattoo_type",
                updateValue: selectedOptions.type,
              },
              {
                id: updateAppointment?.id,
                updateField: "process_step",
                updateValue: 8,
              },
            ],
          };
    if (data) {
      console.log(data);
      await axios
        .post(`${apiUrl}/artist/post_new`, data, { headers: AUTHHEADERS() })
        .then((response) => {
          axios
            .get(
              `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`,
              { headers: AUTHHEADERS() }
            )
            .then((res) => {
              setUpdateAppointment(res.data.data[0]);
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
    } else {
      setLoading(false);
    }
  };
  const handleSelect = (e, key) => {
    setSelectedOptions((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  };


  useEffect(()=>{
   if(updateAppointment.typeofservice === "tattoo" && (updateAppointment.tattoo_style !== null || updateAppointment.tattoo_type !== null || updateAppointment.color_style !== null) ){
    setSelectedOptions({style:updateAppointment.tattoo_style, type:updateAppointment.tattoo_type, color:updateAppointment.color_style })
   }else if(updateAppointment.typeofservice === "permanent-makeup" && (updateAppointment.tattoo_style !== null || updateAppointment.tattoo_type !== null)){
    setSelectedOptions({...selectedOptions ,style:updateAppointment.tattoo_style, type:updateAppointment.tattoo_type})
   }
  },[])

  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="md:text-4xl text-2xl font-bold">Tattoo Styles</h2>
      <label className="flex flex-col">
        Tattoo Type
        <select
          className="text-black p-2 rounded-lg min-w-[300px]"
          value={selectedOptions.type}
          onChange={(e) => handleSelect(e, "type")}
        >
          {types.map((style, index) => {
            return (
              <option value={style} key={index}>
                {style}
              </option>
            );
          })}
        </select>
      </label>

      {updateAppointment.typeofservice === "tattoo" && (
        <label className="flex flex-col">
          Color Style
          <select
            className="text-black p-2 rounded-lg min-w-[300px]"
            value={selectedOptions.color}
            onChange={(e) => handleSelect(e, "color")}
          >
            {colors.map((style, index) => {
              return (
                <option value={style} key={index}>
                  {style}
                </option>
              );
            })}
          </select>
        </label>
      )}

      <label className="flex flex-col">
        Tattoo Style
        <select
          className="text-black p-2 rounded-lg min-w-[300px]"
          value={selectedOptions.style}
          onChange={(e) => handleSelect(e, "style")}
        >
          {styles.map((style, index) => {
            return (
              <option value={style} key={index}>
                {style}
              </option>
            );
          })}
        </select>
      </label>

      <div className=" w-full flex justify-between">
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2 text-black"
          onClick={handlePrev}
        >
          {t("Prev")}
        </button>
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2 text-black"
          onClick={handleNext}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default TattooStyles;
