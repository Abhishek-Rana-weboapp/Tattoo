import React from 'react'

export default function Modal({children}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-1/4 h-max bg-white flex flex-col items-center gap-2 p-4 rounded-lg'>
        {children}
        </div>
    </div>
  )
}
