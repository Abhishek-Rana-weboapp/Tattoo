import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const isLoggedIn = sessionStorage.getItem("token") ? true : false
  return (
    isLoggedIn ? <Outlet/> : <Navigate to={"/"} />
  )
}

export default PrivateRoutes
