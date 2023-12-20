import React from 'react'
import Title from "../../assets/Title.png"

export default function SixGridLayout({children , title , heading}) {
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center  ">
    {/* <img src={Title} className="w-3/5 md:w-2/6 mt-5"></img> */}
    <p className='font-bold text-2xl md:text-5xl text-yellow-500 underline uppercase'>{title}</p>
    {heading && <label className='text-white text-md md:text-3xl uppercase'>{heading}</label>}
    <div className='grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2 border h-3/5 border-yellow-700 rounded-xl overflow-auto'>
      {children}
    </div>
    </div>
  )
}
