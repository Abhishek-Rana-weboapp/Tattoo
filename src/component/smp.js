import React, { useState } from 'react';
import one from '../assets/1.png'
import two from '../assets/2.png'
import three from '../assets/3.png'
import four from '../assets/4.png'
import five from '../assets/5.png'
import six from '../assets/6.png'
import seven from '../assets/7.png'
import eight from '../assets/8.png'
import nine from '../assets/9.png'
import ten from '../assets/10.png'
import eleven from '../assets/11.png'
import twelve from '../assets/12.png'
import thrteen from '../assets/13.png'
import fourteen from '../assets/14.png'
import fifteen from '../assets/15.png'
import sixteen from '../assets/16.png'
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

import ProgressBar from './ProgressBar';


const HairLossPatternSelection = () => {
  const progressValue = 30;

  const navigate = useNavigate();
  const { selectedPattern, setSelectedPattern } = React.useContext(UserContext);

  const images = [
    one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thrteen,fourteen,fifteen,sixteen
  ];


  const handlePatternSelection = (image) => {
    console.log(image)
    setSelectedPattern(image);
  };

  return (
    <div>
      <h1>Which image most closely resembles your hair loss pattern?</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="image-item" style={{
            border:image==selectedPattern?"1px solid blue":""
          }}>
            <img src={image} alt={`Hair Loss Pattern ${index + 1}`} onClick={() => handlePatternSelection(image)} />
            <p>Select</p>
          </div>
        ))}
        <ProgressBar progress={progressValue} />
      </div>
      <button className='smp-btn' onClick={()=>navigate('/medical-form')}>Submit</button>
    </div>
  );
};

export default HairLossPatternSelection;
