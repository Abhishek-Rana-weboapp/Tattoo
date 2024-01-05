import React from 'react'

export default function EmployeePrompt({handleClick}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
    <div className='w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg overflow-hidden'>
      <h2>Please handover your phone to fameTattoo representative</h2>
      <button className='yellowButton p-2' onClick={handleClick} >Proceed</button>
    </div>
    </div>
  )
}
