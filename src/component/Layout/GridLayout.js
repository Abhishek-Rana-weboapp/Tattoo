import React from "react";
import Title from "../../assets/Title.png"
import CustomButton from "../buttons/CustomButton";
import { useNavigate } from "react-router-dom";

export default function GridLayout({children , title, onChange,selected, otherFieldValue }) {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center">
      <img src={Title} className="w-2/5 mt-5 hover:cursor-pointer" onClick={()=>navigate("/dashboard")}></img>
      <h1 className='font-bold text-5xl text-white uppercase'>{title}</h1>
    <div className="md:w-4/6 lg:w-4/6 w-full h-2/3 flex flex-col items-center pt-5 gap-5">
      <div className="grid grid-cols-2 gap-x-10 gap-y-3 w-4/6 h-max overflow-auto">
        {children}
      </div>
    {selected === "other" && (
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white text-2 xl font-semibold flex gap-2 items-center">Explanation:
              <input
                type="text"
                value={otherFieldValue}
                onChange={(e)=>onChange(e)}
                className="p-2 rounded-lg text-black"
                />
                </label>
              {/* <CustomButton  onClick={()=> onClick(otherFieldValue)}>Submit</CustomButton> */}
            </div>
          )}
    </div>
    </div>
  );
}
