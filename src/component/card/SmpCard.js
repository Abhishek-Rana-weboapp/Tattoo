import React from 'react'

export default function SmpCard({index ,image , onClick , selected}) {
  return (
    <div className={`w-full h-full flex justify-center items-center p-0 hover:cursor-pointer rounded-md hover:bg-yellow-500 ${selected === image ? "bg-yellow-500" : ""}`}>
    <div className='w-1/2 h-3/4 flex flex-col gap-2 items-center '>
            <img src={image} className='w-full rounded-xl' alt={`Hair Loss Pattern ${index + 1}`} onClick={()=>onClick(image)}/>
            <p className='text-white uppercase font-semibold'>Select</p>
  </div>
    </div>
  )
}
