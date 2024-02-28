import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';
function NosePiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()

  useEffect(()=>{
    if(user.level2) setSelected(user.level2)
     },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  const buttons = [
    {
      name:"Nostril"
    },
    {
      name:"Septum"
    },
    {
      name:"Austin Bar"
    },
    {
      name:"Erl"
    },
    {
      name:"High Nostril"
    },
    {
      name:"Nostril Nasallang"
    },
    {
      name:"Rhino"
    },
    {
      name:"Septril"
    },
    {
      name:"Third Eye"
    }
  ]

  const handleNext = ()=>{
    if(selected){
      if(user.level2 !== selected){
        setUser({ ...user, level2: selected, level3:null, level4:null});
        }else{
          setUser({ ...user, level2: selected});
        }
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
    <GridLayout title={"nose piercing"}>
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

export default NosePiercing;


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
        <h1> Nose Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Nostril')}>
              <h5>Nostril</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Septum')}>
              <h5>Septum</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Austin Bar')}>
              <h5>Austin Bar</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Erl')}>
              <h5>Erl</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('High Nostril')}>
              <h5>High Nostril</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Nostril Nasallang')}>
              <h5>Nostril Nasallang </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Rhino')}>
              <h5>Rhino</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Septril')}>
              <h5>Septril </h5>
            </div>
          </div>        
            <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Third Eye')}>
              <h5>Third Eye</h5>
            </div>
      
          </div>
        </div>
        <ProgressBar progress={progressValue} />
      </div>
    </div> */}
