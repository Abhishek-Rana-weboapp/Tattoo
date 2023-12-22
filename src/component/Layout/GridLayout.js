import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useTranslation } from 'react-i18next';
export default function GridLayout({children , title, onChange,selected, otherFieldValue }) {
  const { t } = useTranslation();
  const {setIsVisible } = useContext(UserContext)
  useEffect(()=>{
     setIsVisible(true)
  },[])
  return (
    <div className="w-full h-full flex flex-col  gap-4 items-center">
      <label className='font-bold text-md md:text-5xl text-yellow-500  uppercase'>{t(title)}</label>
    <div className="md:w-4/6 lg:w-4/6 w-full h-full flex flex-col items-center gap-5">
      <div className="grid grid-cols-2 w-full gap-x-10 gap-y-3  p-2 overflow-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-gray-800  ">
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
            </div>
          )}
    </div>
    </div>
  );
}
