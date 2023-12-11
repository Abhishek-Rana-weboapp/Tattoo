// GeneralLayout.js
import React from 'react';
import ProgressBar from '../ProgressBar';
import Title from '../../assets/Title.png';
import { useNavigate } from 'react-router-dom';

export default function MedicalFormLayout({ children, title, progressValue_, progressValue_count_, about }) {
  const navigate = useNavigate();

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 mx-auto mt-5">
      <img
        src={Title}
        className="w-full max-w-md mx-auto mb-4 hover:cursor-pointer"
        onClick={() => navigate('/dashboard')}
        alt="Logo"
      />
      {about && <h1 className="text-2xl font-bold mb-4 text-yellow-500">{about}</h1>}
      <h1 className="font-bold text-2xl text-white mb-4 uppercase">{title}</h1>
      <div className="w-full bg-gray-800 rounded-md p-4">{children}</div>

      <ProgressBar progress={progressValue_} count={progressValue_count_} />
    </div>
  );
}
