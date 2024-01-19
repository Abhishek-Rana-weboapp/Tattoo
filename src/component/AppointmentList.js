import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';

const AppointmentList = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [assignedArtist, setAssignedArtist] = useState('');
  const appointmentsPerPage = 10;
  const [tableHeaders, setTableHeaders] = useState()
  const [filteredHeaders, setFilteredHeaders] = useState()
  const {setIsVisible} = useContext(UserContext)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${apiUrl}/artist/appointment_list`);
        const data = await response.json();
        setAppointments(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
    setIsVisible(true)
  }, []);

  useEffect(()=>{
       if(appointments.length !== 0){
         setTableHeaders(Object.keys(appointments[0]))
       }
  },[appointments])

  useEffect(()=>{
   displayHeaders()
  },[tableHeaders])

  console.log(tableHeaders)

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAssignArtist = async () => {
    try {
      const response = await fetch(`${apiUrl}/artist/artist_assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: selectedAppointment.username,
          ArtistPiercerNames: assignedArtist,
        }),
      });

      // Handle the response as needed
      const data = await response.json();
      console.log('Artist assigned successfully:', data);

      // You may want to update the state or take other actions based on the response
    } catch (error) {
      console.error('Error assigning artist:', error);
    }
    setSelectedAppointment(null)
  };

  const displayHeaders = ()=>{
    setFilteredHeaders(tableHeaders?.filter((header)=>{
      if(header === "username" || header ===  "typeofservice" || header === "Date"){
        return header
      }
    }))
  }

  const handleUsernameClick = appointment => {
    setSelectedAppointment(appointment);
    // Open your popup/modal here
  };

  return (
    <div className='w-full h-full overflow-hidden flex flex-col gap-2 items-center'>
      <h1 className='text-white font-bold'>Appointments</h1>
      <div className='w-full h-full flex justify-center overflow-y-scroll flex-1 scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded'>

      <table className='border-1 border-white '>
        <thead>
          <tr className='sticky top-0'>
            {
              filteredHeaders?.map((header, index)=>{
                return <th key={index} className='capitalize font-bold bg-yellow-400 text-xl  text-black text-center p-2'>{header}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
            {
              appointments?.map(appointment=>{
                return <tr className='border-b-1 border-white border-1 hover:scale-105 text-lg ease-in-out transition-all hover:bg-yellow-400'>
                  {
                  Object.keys(appointment)?.map(header=>{
                    if(filteredHeaders?.includes(header)){
                      return <td key={header} className='p-2 px-4 font-bold text-white'>{appointment[header]}</td>
                    }
                  })
              }
                </tr>
              })
            }
        </tbody>
      </table>
    </div>
</div>
  );
};

export default AppointmentList;
