import React from 'react'
import { useLocation } from 'react-router-dom'
import Title from "../../assets/Title.png"

const LogoWrapper = () => {

    const location = useLocation()
    console.log(location)
    const shouldDisplay = !["/login" , "/sign-up"].includes(location.pathname)

  return (
      <div className={`flex justify-center`}>
        <img src={Title} className='w-4/5 md:w-2/5'></img>
          </div>
  )
}

export default LogoWrapper
