import React from 'react'
import NavigationButton from '../buttons/NavigationButton'

export default function Navigation({next , prev}) {
  return (
    <div className="w-4/6 flex justify-between">
    <NavigationButton onClick={prev}>Back</NavigationButton>
    <NavigationButton onClick={next}>Next</NavigationButton>
   </div>
  )
}
