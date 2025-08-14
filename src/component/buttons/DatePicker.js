import { useEffect, useState } from 'react'
import { Calendar } from 'react-date-range'
import { format } from 'date-fns'

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { IoCalendarNumberOutline } from "react-icons/io5";


const DatePicker = ({date, setDate}) => {

    const [open, setOpen]= useState(false)

    useEffect(()=>{
      if(date){
        setDate(format(date, "MM/dd/yyyy"))
      }
    },[])

    const onChange = (value)=>{
        setDate(format(value, "MM/dd/yyyy"))
        setOpen(false)
    }


  return (
    <div className='relative w-full'>
    <div className='flex gap-1 items-center w-full pr-2 bg-white rounded-md'>
      <input  value={date} readOnly className='px-2 py-1 w-full rounded-md text-black' />
      <IoCalendarNumberOutline size={20} onClick={()=>setOpen(!open)}  />
        </div>
      {open &&  <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20' onClick={()=>setOpen(false)}>
        <div onClick={e=>e.stopPropagation()}>
        <Calendar onChange={onChange} maxDate={new Date()}  className='z-50'/> 
        </div>
        </div>}
    </div>
  )
}

export default DatePicker
