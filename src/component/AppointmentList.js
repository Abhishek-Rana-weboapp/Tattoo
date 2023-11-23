import React, { useState, useEffect } from 'react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [assignedArtist, setAssignedArtist] = useState('');
  const appointmentsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3000/artist/appointment_list');
        const data = await response.json();
        setAppointments(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAssignArtist = async () => {
    try {
      const response = await fetch('http://localhost:3000/artist/artist_assign', {
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
  };

  const handleUsernameClick = appointment => {
    setSelectedAppointment(appointment);
    // Open your popup/modal here
  };

  return (
    <div>
      <h2>Appointments</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Minor</th>
            <th style={cellStyle}>Type of Service</th>
            <th style={cellStyle}>Body Location</th>
            <th style={cellStyle}>Medical History</th>
            <th style={cellStyle}>Emergency Contact Number</th>
            <th style={cellStyle}>Doctor Information</th>
            <th style={cellStyle}>Waiver Release URL</th>
            <th style={cellStyle}>Hold Harmless Agreement URL</th>
            <th style={cellStyle}>ID URL</th>
            <th style={cellStyle}>Artist/Piercer Names</th>
            <th style={cellStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map(appointment => (
            <tr key={appointment.id}>
              <td style={cellStyle}>
                <button onClick={() => handleUsernameClick(appointment)}>
                  {appointment.username}
                </button>
              </td>
              <td style={cellStyle}>{appointment.minor}</td>
              <td style={cellStyle}>{appointment.typeofservice}</td>
              <td style={cellStyle}>{appointment.bodyloacation}</td>
              <td style={cellStyle}>{appointment.medicalhistory}</td>
              <td style={cellStyle}>{appointment.emergencycontectnumber}</td>
              <td style={cellStyle}>{appointment.doctor_information}</td>
              <td style={cellStyle}>{appointment.WaiverRelease_url}</td>
              <td style={cellStyle}>{appointment.HoldHarmlessAgreement_url}</td>
              <td style={cellStyle}>{appointment.id_url}</td>
              <td style={cellStyle}>{appointment.ArtistPiercerNames}</td>
              <td style={cellStyle}>{appointment.Date}</td>
            </tr>
          ))}
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
      <div>
        {Array.from({ length: Math.ceil(appointments.length / appointmentsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
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
