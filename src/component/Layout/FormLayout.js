import React from 'react';
import ProgressBar from '../ProgressBar';
import Title from '../../assets/Title.png';
import { useNavigate } from "react-router-dom";

export default function ConsentFormLayout({ children, title, progressValue, progressValue_, progressValue_count_, about }) {
  const navigate = useNavigate();

  return (
    <div className="w-full  flex flex-col items-center gap-1 p-4 md:p-8">
      {/* <img src={Title} className=" md:w-2/6  w-4/5 mt-5 object-cover" onClick={() => navigate("/dashboard")} alt="Logo" /> */}

      {about && <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-yellow-500 text-center">{about}</h1>}
      <h1 className="font-bold text-md md:text-3xl text-white  uppercase text-center md:text-left">
        {title}
      </h1>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-gray-800 rounded-md p-4 md:p-6">
        {children}
      </div>
      <div className="w-full h-10 ">
        <ProgressBar progress={progressValue_} count={progressValue_count_} />
      </div>
    </div>
  );
}
