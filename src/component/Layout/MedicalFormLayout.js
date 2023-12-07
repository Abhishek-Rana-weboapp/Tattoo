// GeneralLayout.js
import React from 'react';
import ProgressBar from '../ProgressBar';
import Title from '../../assets/Title.png';
import { useNavigate } from "react-router-dom";

export default function MedicalFormLayout({ children, title, progressValue, progressValue_,progressValue_count_,about }) {

    const navigate = useNavigate()
  return (
    <div className="w-1/2 h-full flex flex-col items-center gap-3">
      <img src={Title} className="w-3/5 mt-5 hover:cursor-pointer" onClick={()=>navigate("/dashboard")} alt="Logo" />
      {about && <h1 className="text-3xl font-bold mb-4 text-yellow-500">{about}</h1>}
      <h1 className="font-bold text-3xl text-white mb-4 uppercase">{title}</h1>
      <div className="w-full bg-gray-800 rounded-md p-6">
        {children}
      </div>
  
        <ProgressBar progress={progressValue_} count={progressValue_count_} />
        {/* <ProgressBar progress={progressValue} count={8}/> */}
     
    </div>
  );
}