import React from 'react';
import ProgressBar from '../ProgressBar';
import Title from '../../assets/Title.png';
import { useNavigate } from "react-router-dom";

export default function ConsentFormLayout({ children, title, progressValue, progressValue_, progressValue_count_, about }) {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-3 p-4 md:p-8">
      <img src={Title} className="w-full max-w-full md:max-w-2/5 lg:max-w-1/3 xl:max-w-1/4 mt-5 object-cover" onClick={() => navigate("/dashboard")} alt="Logo" />

      {about && <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 text-yellow-500 text-center">{about}</h1>}
      <h1 className="font-bold text-md md:text-3xl text-white mb-4 uppercase text-center md:text-left">
        {title}
      </h1>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-gray-800 rounded-md p-4 md:p-6">
        {children}
      </div>
      <div className="w-full h-10 mt-2 md:mt-4">
        <ProgressBar progress={progressValue_} count={progressValue_count_} />
      </div>
    </div>
  );
}
