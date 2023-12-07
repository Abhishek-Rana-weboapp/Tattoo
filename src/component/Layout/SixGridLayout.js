import React from 'react'
import Title from "../../assets/Title.png"

export default function SixGridLayout({children , title , heading}) {
  return (
    <div className="w-full h-full flex flex-col gap-1 items-center ">
    <img src={Title} className="w-3/5 mt-5"></img>
    <p className='font-bold text-5xl text-white uppercase'>{title}</p>
    {heading && <h2 className='text-white uppercase'>{heading}</h2>}
    <div className='grid grid-cols-6 gap-2 border border-yellow-700 rounded-xl'>
      {children}
    </div>
    </div>
  )
}
