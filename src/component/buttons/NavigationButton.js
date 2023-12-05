import React from 'react'

export default function NavigationButton({children , onClick}) {
  return (
    <button
    className={`bg-[#e8e2e3] w-max py-2 px-2 uppercase md:text-2xl text-md 
  font-bold rounded-lg hover:bg-gradient-to-b from-white  to-yellow-400  to-10% `}
    onClick={onClick}
  >
    {children}
  </button>
  )
}
