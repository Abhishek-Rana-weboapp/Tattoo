import React, { useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';

function SurfacePiercing() {
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
      name:"Arm"
    },
    {
      name:"Back"
    },
    {
      name:"Chest"
    },
    {
      name:"Face"
    },
    {
      name:"Finger"
    },
    {
      name:"Foot"
    },
    {
      name:"Hand"
    },
    {
      name:"Hip"
    },
    {
      name:"Leg"
    },
    {
      name:"Neck"
    },
    {
      name:"Pelvic"
    },
    {
      name:"Ribs"
    },
    {
      name:"Shoulder"
    },
    {
      name:"Stomach"
    }
  ]

  const handleNext = ()=>{
    if(selected){
      if(user.level2 !== selected){
        setUser({ ...user, level2: selected, level3:null, level4:null});
        }else{
          setUser({ ...user, level2: selected});
        }
    navigate('/count'); 
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
    <GridLayout title={"surface piercing"}>
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

export default SurfacePiercing;


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
  <h1>Surface Piercing</h1>
  <div className="big-container">
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Arm')}>
        <h5>Arm</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Back')}>
        <h5>Back</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Chest')}>
        <h5>Chest</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Face')}>
        <h5>Face</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Finger')}>
        <h5>Finger</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Foot')}>
        <h5>Foot </h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Hand')}>
        <h5>Hand</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Hip')}>
        <h5>Hip</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Leg')}>
        <h5>Leg</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Neck')}>
        <h5>Neck</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Pelvic')}>
        <h5>Pelvic</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Ribs')}>
        <h5>Ribs</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Shoulder')}>
        <h5>Shoulder</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Stomach')}>
        <h5>Stomach</h5>
      </div>
    </div>
    
  </div>
</div>
</div> */}
