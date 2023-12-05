// GeneralLayout.js
import React from 'react';
import ProgressBar from '../ProgressBar';
import Title from '../../assets/Title.png';

export default function GeneralLayout({ children, title, progressValue, progressValue_, about }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={Title} className="w-3/5 mb-8" alt="Logo" />
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">{about}</h1>
      <h1 className="font-bold text-3xl text-white mb-4">{title}</h1>
      <div className="w-3/4 bg-gray-800 rounded-md p-6">
        {children}
      </div>
      <div className="w-full h-10 mt-4">
        <ProgressBar progress={progressValue_} />
        <ProgressBar progress={progressValue} />
      </div>
    </div>
  );
}
