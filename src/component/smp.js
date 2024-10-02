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

import SmpCard from './card/SmpCard';
import SixGridLayout from './Layout/SixGridLayout';
import Navigation from './navigation/Navigation';
import { useTranslation } from 'react-i18next';

const HairLossPatternSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedPattern, setSelectedPattern , alert, setAlert, setAlertMessage,user,setUser,setFinalUser } = React.useContext(UserContext);
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
      setUser({...user,level1:selected})
      setFinalUser({...user,level1:selected , level2 : null, level3 : null, level4 : null})
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
   
    <>
    <SixGridLayout title={"smp"} heading={t("Which image most closely resembles your hair loss pattern?")}>

        {images.map((image, index) => (
          <SmpCard key={index} image={image} onClick={handlePatternSelection} selected={selected}/>
            ))}
            </SixGridLayout>
            <Navigation next={handleNext}  prev={handlePrev} />
            </>
  );
};

export default HairLossPatternSelection;
