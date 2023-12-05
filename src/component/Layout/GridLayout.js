import React from "react";
import Title from "../../assets/Title.png"
import CustomButton from "../buttons/CustomButton";

export default function GridLayout({children , title, onChange,selected, otherFieldValue }) {
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center">
      <img src={Title} className="w-3/5 mt-5"></img>
      <h1 className='font-bold text-5xl text-white uppercase'>{title}</h1>
    <div className="w-4/6 h-2/3 flex flex-col items-center pt-5 gap-5">
      <div className="grid grid-cols-2 gap-x-10 gap-y-3 w-4/6 h-max">
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
