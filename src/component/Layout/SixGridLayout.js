import React from 'react'

export default function SixGridLayout({children , title , heading}) {
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center overflow-y-hidden">
    {/* <img src={Title} className="w-3/5 md:w-2/6 mt-5"></img> */}
    <p className='font-bold text-2xl md:text-5xl text-yellow-500 underline uppercase'>{title}</p>
    {heading && <label className='text-white sm:text-lg md:text-2xl uppercase'>{heading}</label>}
    <div className='grid grid-cols-[repeat(auto-fit,minmax(100px,_1fr))] w-full md:w-3/4 gap-5 border  border-yellow-700 rounded-xl p-4 overflow-y-scroll scrollbar-none'>
      {children}
    </div>
    </div>
  )
}
