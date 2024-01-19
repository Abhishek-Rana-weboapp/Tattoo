import React, { useState } from 'react'
import AppointmentList from '../AppointmentList'
import ArtistList from '../ArtistList'

export default function SuperAdminDashboard() {

    const [activeTab, setActiveTab] = useState("appointmentList")

    const handleNavClick = (button)=>{
        setActiveTab(button)
    }

  return (
    <div className='text-white w-full h-full flex flex-col overflow-hidden'>
        <div>
            <button className={`bg-none font-bold text-lg hover:bg-yellow-400 rounded-lg p-2 ${activeTab === "appointmentList" ? "bg-yellow-400 text-black" : ""}`} onClick={()=>handleNavClick("appointmentList")}>Appointment List</button>
            <button className={`bg-none font-bold text-lg hover:bg-yellow-400 rounded-lg p-2 ${activeTab === "artistlist" ? "bg-yellow-400 text-black" : ""}`} onClick={()=>handleNavClick("artistlist")}>Artist List</button>
        </div>
        {
            activeTab === "appointmentList" && <AppointmentList/>
        }
        {
            activeTab === "artistlist" && <ArtistList/>
        }
    </div>
  )
}
