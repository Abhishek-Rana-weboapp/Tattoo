// GeneralLayout.js
import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';

export default function MedicalFormLayout({ children, title, about }) {
  const {setIsVisible } = useContext(UserContext)
  useEffect(()=>{
     setIsVisible(true)
  },[])

  return (
    <div className="w-full sm:w-3/4  rounded-md p-4 md:w-2/3 lg:w-1/2 xl:w-1/2  flex flex-col gap-3 " style={{height:"100dvh"}}>
      {about && <h1 className="text-2xl font-bold mb-4 text-yellow-500">{about}</h1>}
      <h1 className="font-bold text-xl  md:text-4xl text-yellow-500 underline uppercase text-center">{title}</h1>
      <div className="w-full  backdrop-blur bg-opacity-50 flex-1 p-2 rounded-md">{children}</div>

    </div>
  );
}
