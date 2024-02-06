import React, { useEffect, useRef } from 'react'

export default function VerifyPin({handleSubmit , pin , setPin , spanMessage}) {

    const inputRef = useRef()

    useEffect(()=>{
        inputRef?.current?.focus()
    },[])

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white">
        <h1 className='text-center'> Please handover the phone to our representative at the frontdesk</h1>
        <h3>Enter Pin</h3>
       <input ref={inputRef} className='p-2 md:w-1/3 w-full text-black font-semibold text-lg rounded-xl' type='number' onChange={(e)=>setPin(e.target.value)}/>
       { spanMessage && <span>{spanMessage}</span>}
       <button className='yellowButton py-2 px-5 rounded-xl font-bold text-black' onClick={handleSubmit}>Submit</button>
      
    </div>
  )
}
