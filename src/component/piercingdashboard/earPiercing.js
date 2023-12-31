import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';
function EarPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.bodyPart) setSelected(user.bodyPart)
     },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  const buttons = [
    {
      name: "Regular Earlobe",
    },
    {
      name: "Upper Earlobe",
    },
    {
      name: "helix",
    },
    {
      name: "Industrial",
    },
    {
      name: "Tragus",
    },
    {
      name: "Rook",
    },
    {
      name: "Conch",
    },
    {
      name: "Daith",
    },
    {
      name: "Snug",
    },
    {
      name: "Forward Helix",
    },
    {
      name: "Helix",
    },
    {
      name: "Anti Helix",
    },
    {
      name: "Anti Tragus",
    },
    {
      name: "Auricle",
    },
    {
      name: "External Auditory Meatus",
    },
    {
      name: "Transverse Lobe",
    }
  ];

  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, bodyPart : selected});
    navigate('/medical-form'); 
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
    <GridLayout title={"ear piercing"}>
    {buttons.map((button, index) => {
          return (
            <CustomButton key={index} onClick={handlepartLocation} selected={selected}>
              {button.name}
            </CustomButton>
          );
        })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev} />
    </>
    
  );
}

export default EarPiercing;


{/* <div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
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
        <h1>Ear Area Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Regular Earlobe')} >
              <h5>Regular Earlobe</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Upper Earlobe')} >
              <h5>Upper Earlobe</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('helix')} >
              <h5>Helix</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Industrial')} >
              <h5>Industrial</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Tragus')} >
              <h5>Tragus</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Rook')} >
              <h5>Rook </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Conch')} >
              <h5>Conch</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Daith')}  >
              <h5>Daith</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Snug')} >
              <h5>Snug</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Forward Helix')} >
              <h5>Forward Helix</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Helix')} >
              <h5>Helix</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Anti Helix')} >
              <h5>Anti Helix</h5>
            </div>
          </div>         
           <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Anti Tragus')} >
              <h5>Anti Tragus</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Auricle')} >
              <h5>Auricle</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('External Auditory Meatus')} >
              <h5>External Auditory Meatus</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Transverse Lobe')}>
              <h5>Transverse Lobe</h5>
            </div>
          </div>
        </div>
        <ProgressBar progress={progressValue} />
      </div>
    </div> */}
