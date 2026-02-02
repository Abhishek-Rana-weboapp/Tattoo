import { useEffect, useState } from "react";
import {
  colors,
  styles,
  types,
} from "../../data/tattooStyles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppointmentContext } from "../../context/AppointmentContext";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios";
import LoaderModal from "../modal/LoaderModal";

const TattooStyles = ({}) => {
  const { appointment, setAppointment } = useAppointmentContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);
  console.log({selectedOptions})


 const handleNext = async () => {
  const { tattooStyle, colorStyle, tattooType } = selectedOptions || {};

  if (appointment.typeofservice === "tattoo") {
    if (!tattooStyle && !colorStyle && !tattooType) {
      toast.error("Please select at least one option.");
      return;
    }
  } else if (appointment.typeofservice === "permanent-makeup") {
    if (!tattooStyle && !tattooType) {
      toast.error("Please select at least one option.");
      return;
    }
  }

  const updates = { ...selectedOptions, adminProcessStep: 9 };

  try {
    setLoading(true);
    const res = await axiosInstance.put(
      `/appointment/${appointment.id}`,
      updates
    );
    if (res.status === 200) {
      setAppointment(res.data.appointment);
      navigate(`/billing/${res.data.appointment.adminProcessStep}`);
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  const handlePrev = ()=>{
     navigate("/billing/7")
  }


  const handleSelect = (e, key) => {
    setSelectedOptions((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  };

  useEffect(() => {
    if(appointment){
       if(appointment.tattooStyle || appointment.colorStyle || appointment.tattooType ){
        setSelectedOptions({
          tattooStyle: appointment.tattooStyle,
          tattooType: appointment.tattooType,
          colorStyle: appointment.colorStyle
        })
       }
    }
  }, [appointment]);


  if(loading ){
    return <LoaderModal />
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="md:text-4xl text-2xl font-bold">Tattoo Styles</h2>
      <label className="flex flex-col">
        Tattoo Type
        <select
          className="text-black p-2 rounded-lg min-w-[300px]"
          value={selectedOptions?.tattooType ? selectedOptions.tattooType : ""}
          onChange={(e) => handleSelect(e, "tattooType")}
        >
          <option value={""}>Select Tattoo Type</option>
          {types[appointment?.typeofservice].map((type, index) => {
            return (
              <option value={type} key={index}>
                {type}
              </option>
            );
          })}
        </select>
      </label>

      {appointment.typeofservice === "tattoo" && (
        <label className="flex flex-col">
          Color Style
          <select
            className="text-black p-2 rounded-lg min-w-[300px]"
            value={selectedOptions?.colorStyle ? selectedOptions.colorStyle : ""}
            onChange={(e) => handleSelect(e, "colorStyle")}
          >
            <option value={""}>Select Color Style</option>
            {colors.map((color, index) => {
              return (
                <option value={color} key={index}>
                  {color}
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
          value={selectedOptions?.tattooStyle ? selectedOptions.tattooStyle : "" }
          onChange={(e) => handleSelect(e, "tattooStyle")}
        >
          <option value={""}>Select Tattoo Style</option>
          {styles[appointment.typeofservice].map((style, index) => {
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
