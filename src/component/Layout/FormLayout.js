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
    <div className="w-full h-full  flex flex-col items-center gap-1 p-2 md:p-8">
      {about && <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-yellow-500 text-center">{about}</h1>}
      <h1 className="font-bold text-md md:text-3xl text-yellow-500 uppercase text-center md:text-left">
        {t(title)}
      </h1>
      <div className="w-full md:w-2/4 flex flex-col flex-1 bg-gray-800 rounded-md md:p-4 overflow-y-auto overflow-x-hidden backdrop-blur bg-opacity-50">
        {children}
      </div>
     
    </div>
  );
}
