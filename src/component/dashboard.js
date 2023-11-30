
import Tattoo from '../assets/tattoo.png'
import microblading from '../assets/microblading.png'
import piercings from '../assets/piercings.png'
import removal from '../assets/removal.png'
import smp from '../assets/smp.png'
import tooth from '../assets/tooth.png'
import { useNavigate ,Link} from "react-router-dom";
import UserContext from '../context/UserContext';
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
function Dashboard() {
  
  const progressValue = 10;

  const navigate = useNavigate();
  const {user,setUser} = React.useContext(UserContext)
  const userObject = user || {};
  

  const handleTattooTypeSelect = (selectedType) => {
    
    setUser({ ...userObject,selectedTattooType: selectedType });
    navigate(`/${selectedType}`); 
  };

  return (
    <div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
      <div
        className="container h-100"
        style={{
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          border: '3px solid black',
        }}
      >
        <h1> FAME TATTOOS</h1>
        <div className="big-container">
          <div className="item1">
            <Link
              to="/tattoo"
              className={`item ${user.selectedTattooType === 'tattoo' ? 'selected' : ''}`}
              onClick={() => handleTattooTypeSelect('tattoo')}
            >
              <img src={Tattoo} alt="tattoo-image" />
              <h2>tattoos</h2>
            </Link>
            <Link
              to="/piercing"
              className={`item ${user.selectedTattooType === 'piercing' ? 'selected' : ''}`}
              onClick={() => handleTattooTypeSelect('piercing')}
            >
              <img src={piercings} alt="piercing image" />
              <h2>piercings</h2>
            </Link>
          </div>
          <div className="item1">
            <Link
              to="/tooth-gems"
              className={`item ${user.selectedTattooType === 'tooth-gems' ? 'selected' : ''}`}
              onClick={() => handleTattooTypeSelect('tooth-gems')}
            >
              <img src={tooth} alt="tooth-gem-image" />
              <h2>tooth gems</h2>
            </Link>
            <Link
              to="/tattoo"
              className={`item ${user.selectedTattooType === 'removal' ? 'selected' : ''}`}
              onClick={() => handleTattooTypeSelect('removal')}
            >
              <img src={removal} alt="removal" />
              <h2>removal</h2>
            </Link>
          </div>
          <div className="item1">
            <Link
              to="/permanent-makeup"
              className={`item ${user.selectedTattooType === 'permanent-makeup' ? 'selected' : ''}`}
              onClick={() => handleTattooTypeSelect('permanent-makeup')}
            >
              <img src={microblading} alt="microblading-image" />
              <h2>microblading</h2>
            </Link>
            <Link
              to="/smp"
              className={`item ${user.selectedTattooType === 'smp' ? 'selected' : ''}`}
              onClick={() => handleTattooTypeSelect('smp')}
            >
              <img src={smp} alt="smp" />
              <h2>smp</h2>
            </Link>
          </div>
        </div>

        <ProgressBar progress={progressValue} />

      </div>
     
    </div>
  );
}

export default Dashboard;