import React, { useEffect, useRef } from 'react'
import PinInput from '../buttons/PinInput'

export default function VerifyPin({handleSubmit , pin , setPin , spanMessage}) {

    const inputRef = useRef()

    useEffect(()=>{
        inputRef?.current?.focus()
    },[])

    const handleInput = (value)=>{
      setPin(value)
    }

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center  overflow-auto p-8 text-white">
        <label className='text-center font-bold text-2xl'> Please handover the phone to our representative at the frontdesk</label>
        <label className='text-lg'>Enter Pin</label>
        <PinInput ref={inputRef} className='p-2 md:w-1/3 w-full text-black rounded-xl' onChange={handleInput}/>
       { spanMessage && <span>{spanMessage}</span>}
       <button className='yellowButton py-2 px-5 rounded-xl font-bold text-black' onClick={handleSubmit}>Submit</button>
      
    </div>
  )
}
