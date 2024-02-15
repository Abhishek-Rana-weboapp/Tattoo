import React from 'react'

export default function NavigationButton({children , onClick}) {
  return (
    <button
    // className={` bg-transparent text-yellow-400 w-max py-2 px-2 uppercase md:text-2xl text-md flex gap-1 justify-center items-center 
    //            font-bold rounded-lg hover:bg-gradient-to-b from-white  to-yellow-400  to-10%  hover:text-white`}
    className='yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2'
    onClick={onClick}
  >
    {children}
  </button>
  )
}
