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
import SmpCard from './card/SmpCard';
import GridLayout from './Layout/GridLayout';
import SixGridLayout from './Layout/SixGridLayout';
import Navigation from './navigation/Navigation';
import { useTranslation } from 'react-i18next';

const HairLossPatternSelection = () => {
  const progressValue = 30;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedPattern, setSelectedPattern , alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState()

  const images = [
    one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thrteen,fourteen,fifteen,sixteen
  ];


  const handlePatternSelection = (image) => {
    setSelected(image)
  };
  
  const handleNext = ()=>{
    if(selected){
      setSelectedPattern(selected);
      navigate("/medical-form")
    }else{
      setAlert(!alert)
      setAlertMessage(t("Please select an option"))
    }
  }

  const handlePrev = ()=>{
    navigate(-1)
  }



  return (
    // <div>
    //   <h1>Which image most closely resembles your hair loss pattern?</h1>
    //   <div className="image-container">
    <>
    <SixGridLayout title={"smp"} heading={t("Which image most closely resembles your hair loss pattern?")}>

        {images.map((image, index) => (
          <SmpCard key={index} image={image} onClick={handlePatternSelection} selected={selected}/>
          // <div key={index} className="image-item" style={{
            //   border:image==selectedPattern?"1px solid blue":""
            // }}> 
            //   <img src={image} alt={`Hair Loss Pattern ${index + 1}`} onClick={() => handlePatternSelection(image)} />
            //   <p>Select</p>
            // </div>
            ))}
            </SixGridLayout>
            <Navigation next={handleNext}  prev={handlePrev} />
            </>
    //     <ProgressBar progress={progressValue} />
    //   </div>
    //   <button className='smp-btn' onClick={()=>navigate('/medical-form')}>Submit</button>
    // </div>
  );
};

export default HairLossPatternSelection;
