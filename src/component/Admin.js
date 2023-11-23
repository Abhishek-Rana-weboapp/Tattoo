import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [userData, setUserData] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  const artistNames = [
    'Adonay Llerena',
    'Barbie Gonzalez',
    'Cheppy Sotelo',
    'Daniel Proano',
    'Eduanis Rama',
    'Ernie Jorge',
    'Frank Gonzalez',
    'Gil Benjamin',
    'Jill Llerena',
    'Jose Gonzalez',
    'Keyla Valdes',
    'Konstantin Alexeyev',
    'Omar Gonzalez',
    'Omar Fame Gonzalez',
    'Osnely Garcia',
    'Yosmany Dorta',
  ];

  useEffect(() => {
    fetchDataForDashboard();
  }, []);
  const apiUrl = 'http://192.168.1.22:3000/artist/appointment_list';

  const fetchDataForDashboard = () => {
  
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log('response', response);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const initialUserData = data.data.map((user) => ({
          ...user,
          
        }));
        setUserData(initialUserData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  
  function simplifyMedicalHistory(medicalHistoryObject) {
    // Check if "yes" is true, if yes, return "yes"; otherwise, return "no"
    if (medicalHistoryObject && medicalHistoryObject.yes) {
      return "yes";
    } else {
      return "no";
    }
  }


  const assignArtist = () => {
    if (selectedUser && selectedArtists) {
      setSelectedArtists({
     selectedArtists
      });
  
      const apiUrl = 'http://192.168.1.22:3000/artist/artist_assign';
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: selectedUser.username,
          ArtistPiercerNames: selectedArtists.artistName,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log('response', response);
            throw new Error('Network response was not ok');
          }
          fetchDataForDashboard();
        })
        .catch((error) => {
          console.error('Error assigning artist:', error);
        });
    }
  };
  
  const handleArtistChange = (userId, artistName) => {
    setSelectedArtists({
      ...selectedArtists,
      artistName,
    });
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={titleStyle}>Tattoo Admin Dashboard</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Username</th>
            <th style={headerCellStyle}>Minor</th>
            <th style={headerCellStyle}>Type of Service</th>
            <th style={headerCellStyle}>Body Location</th>
            <th style={headerCellStyle}>Medical History</th>
            <th style={headerCellStyle}>Select an Artist</th>
          </tr>
        </thead>
        <tbody>
  {userData.map((user, index) => (
    <tr key={index} onClick={() => handleRowClick(user)}>
      <td style={cellStyle}>{user.username}</td>
      <td style={cellStyle}>{user.ArtistPiercerNames.ArtistPiercerNames}</td>
      <td style={cellStyle}>{user.minor}</td>
      <td style={cellStyle}>{user.typeofservice}</td>
      <td style={cellStyle}>{user.bodyloacation}</td>
      <td style={cellStyle}>{simplifyMedicalHistory(user.medicalhistory)}</td>

      <td style={cellStyle}>
        {user.artist ? (
          user.artist
        ) : (
          <div>
     <select
  id={`artistDropdown-${user.username}`}
  onChange={(e) => handleArtistChange(user.username, e.target.value)}
  value={selectedArtists[user.username] || ''}
>
              <option value="">Select an artist</option>
              {artistNames.map((artist, index) => (
                <option key={index} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
            <button onClick={assignArtist}>Assign Artist</button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
  );
}

export default AdminDashboard;
