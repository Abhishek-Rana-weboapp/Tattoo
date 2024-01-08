import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const userType = sessionStorage.getItem("userType") 
    const isAdmin = userType === "admin" ? true : false
  return (
    isAdmin ? <Outlet/> : <Navigate to={"/dashboard"}/>
  )
}

export default AdminRoutes