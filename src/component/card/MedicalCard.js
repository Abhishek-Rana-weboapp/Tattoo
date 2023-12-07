import React from 'react'

export default function MedicalCard({heading , type}) {


  return (
    <div className='w-2/3 flex flex-col items-center '>
      <h1>{heading}</h1>
      <h3>{question}</h3>
      <div>
        <input className='text-white uppercase ' type='radio'>Yes</input>
        <input className='text-white uppercase ' type='radio'>No</input>
        {
            type === "optionField" && <div>
                <input className='uppercase' type='checkbox'>Pregnant</input>
                <input className='uppercase' type='checkbox'>Nursing</input>
            </div>
        }
        {
            type === "inputField"  && <div className='flex flex-col gap-2'>
                <p className='text-white'>IF YES , PLEASE EXPLAIN </p>
                <textarea className='w-2/4 h-32'></textarea>
            </div>
        }
      </div>
    </div>
  )
}
