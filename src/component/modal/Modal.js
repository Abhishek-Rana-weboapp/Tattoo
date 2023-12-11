import React from 'react';

export default function Modal({ children }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white flex flex-col items-center gap-2 p-4 rounded-lg'>
        {children}
      </div>
    </div>
  );
}
