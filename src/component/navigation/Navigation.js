import React from 'react'
import NavigationButton from '../buttons/NavigationButton'
import { GrFormNextLink } from "react-icons/gr";

export default function Navigation({next , prev}) {
  return (
    <div className=" w-full md:w-3/6 flex justify-between">
    <NavigationButton onClick={prev}><GrFormNextLink className='rotate-180' />Back</NavigationButton>
    <NavigationButton onClick={next}>Next<GrFormNextLink /></NavigationButton>
   </div>
  )
}
