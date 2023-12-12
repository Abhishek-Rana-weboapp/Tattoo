import React from 'react'
import Title from "../../assets/Title.png"

export default function SixGridLayout({children , title , heading}) {
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center mb-3 ">
    <img src={Title} className="w-3/5 md:w-2/6 mt-5"></img>
    <p className='font-bold text-2xl md:text-5xl text-white uppercase'>{title}</p>
    {heading && <label className='text-white text-xl md:text-3xl uppercase'>{heading}</label>}
    <div className='grid grid-cols-6 gap-2 border border-yellow-700 rounded-xl'>
      {children}
    </div>
    </div>
  )
}
