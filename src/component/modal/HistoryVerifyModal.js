import React from 'react'

export default function HistoryVerifyModal({children}) {

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
    <div className='w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg overflow-hidden'>
        {children}
    </div>
    </div>
  )
}
