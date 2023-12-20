import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';

export default function ConsentFormLayout({ children, title, about }) {
  const {setIsVisible } = useContext(UserContext)
  useEffect(()=>{
     setIsVisible(true)
  },[])

  return (
    <div className="w-full h-full  flex flex-col items-center gap-1 p-2 md:p-8">
      {about && <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-yellow-500 text-center">{about}</h1>}
      <h1 className="font-bold text-md md:text-3xl text-yellow-500 underline uppercase text-center md:text-left">
        {title}
      </h1>
      <div className="w-full md:w-2/4 flex flex-col flex-1 bg-gray-800 rounded-md md:p-4 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
     
    </div>
  );
}
