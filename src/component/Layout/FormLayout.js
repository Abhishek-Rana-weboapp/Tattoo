import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

export default function ConsentFormLayout({ children, title, about }) {
  const {setIsVisible } = useContext(UserContext)
  useEffect(()=>{
     setIsVisible(true)
  },[])

  const {t} = useTranslation()

  return (
    <div className="w-full h-full  flex flex-col items-center gap-1 p-2 md:p-8 overflow-hidden">
      {about && <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-yellow-500 text-center">{about}</h1>}
      <label className="font-bold text-xl  md:text-4xl text-white  uppercase text-center ">
        {t(title)}
      </label>
      <div className="w-full h-full md:w-2/4 flex flex-col justify-between gap-2 flex-1 rounded-md md:p-4 overflow-hidden backdrop-blur bg-opacity-50">
        {children}
      </div>
     
    </div>
  );
}
