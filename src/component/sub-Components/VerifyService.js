import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../url'

const VerifyService = () => {
    const appointmentId = sessionStorage.getItem("appointmentID") || null
    const [appointment, setAppointment] = useState()
    const [placement, setPlacement] = useState()

    useEffect(()=>{
        const fetchAppointment = async()=>{
           await axios.get(`${apiUrl}/artist/appointment_list_id?id=${appointmentId}`)
           .then((res)=>{
            setAppointment(res?.data?.data[0])
            setPlacement(JSON.parse(res?.data?.data[0].body_location))
          })
           .catch(err=>console.log(err))
        }
        if(appointmentId !== null){
            fetchAppointment()
        }
    },[])

    const locations = {
       "tattooLocation" : {
           "head" :{

           },
           "chest" :{

           },
           "torso" :{

           },
           "back" :{

           },
           "arm" :{

           },
           "hand" :{

           },
           "hip" :{

           },
           "glutes" :{

           },
           "leg" :{

           },
           "foot" :{

           },
           "neck" :{

           },
           "pelvic" :{

           },
       }

    }

  


  
  return (
    <div className='text-white flex flex-col items-center'>
      <h2 className='font-bold'>Appointment Details</h2>

      {/* Service Section */}
      <h4 className='capitalize font-semibold'>{`Service : ${placement? placement?.selectedTattooType : ""}`}</h4>

       {/* Placement section cjanging based on the service*/}
       <div className='flex flex-col'>
          <h4>{`Placement`} </h4>
       </div>

       {/*Description Section */}
      <div>
        <h4>{`Description: ${appointment ? appointment.brief_description : ""}`}</h4>
      </div>
    </div>
  )
}

export default VerifyService
