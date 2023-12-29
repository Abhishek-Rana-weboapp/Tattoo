import React from 'react';
import { useTranslation } from 'react-i18next';
export default function Modal({ children }) {
  const { t } = useTranslation();
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg'>
        {children}
      </div>
    </div>
  );
}
