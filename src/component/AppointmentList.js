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
      <div className='w-full h-full flex justify-center overflow-y-scroll flex-1'>

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

      {/* Popup/Modal for Artist Assignment */}
      {selectedAppointment && (
        <div style={popupStyle}>
          <h3>Assign Artist to Client</h3>
          <p>Client: {selectedAppointment.username}</p>
          <label>
            Select Artist:
            <select
              value={assignedArtist}
              onChange={e => setAssignedArtist(e.target.value)}
            >
              <option value="">Select an Artist</option>
              <option value="Adonay Llerena">Adonay Llerena</option>
              <option value="Barbie Gonzalez">Barbie Gonzalez</option>
              <option value="Cheppy Sotelo">Cheppy Sotelo</option>
              {/* Add the rest of the artists here */}
            </select>
          </label>
          <button onClick={handleAssignArtist}>Assign Artist</button>
          <button onClick={() => setSelectedAppointment(null)}>Close</button>
        </div>
      )}

      {/* Pagination */}
      {/* <div>
        {Array.from({ length: Math.ceil(appointments.length / appointmentsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
</div>
  );
};

const cellStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  background: '#ffffff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  zIndex: '9999',
};

export default AppointmentList;
