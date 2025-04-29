import React from 'react'

export default function SmpCard({index ,image , onClick , selected}) {
  return (
    <div className={`w-full h-full flex flex-col justify-center items-center p-2 hover:cursor-pointer rounded-md hover:bg-yellow-500 ${selected === image ? "bg-yellow-500" : ""}`} onClick={()=>onClick(image)}>
            <img src={image} className='w-full rounded-xl flex-1 object-cover' alt={`Hair Loss Pattern ${index + 1}`} />
            {/* <p className='text-white uppercase font-semibold select-none'>Select</p>    */}
    </div>
  )
}
