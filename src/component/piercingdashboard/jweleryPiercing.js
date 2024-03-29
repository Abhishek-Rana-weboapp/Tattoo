import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import { useTranslation } from 'react-i18next';

function JewelleryPiercing() {
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
      name:"Nose area"
    },
    {
      name:"Ear area"
    },
    {
      name:"Belly"
    },
    {
      name:"Oral area"
    },
    {
      name:"Facial area"
    },
    {
      name:"Nipple"
    },
    {
      name:"Surface"
    },
    {
      name:"Vaginal Area"
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
    <GridLayout title={"jewellery piercing"}>
      {buttons.map((button, index)=>{
        return <CustomButton key={index} onClick={handlepartLocation} selected={selected}>{button.name}</CustomButton>
      })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev}  />
    </>
    
  );
}

export default JewelleryPiercing;


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
        <h1>Jewelry Swap Piercing</h1>
        <div className="big-container">
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Nose area')}>
              <h5>Nose area</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Ear area')}>
              <h5>Ear Area</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Belly')}>
              <h5>Belly</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Oral area')}>
              <h5>Oral Area</h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Facial area')}>
              <h5>Facial Area</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Nipple')}>
              <h5>Nipple </h5>
            </div>
          </div>
          <div className="outer-item">
            <div className="inner-item" onClick={()=>handlepartLocation('Surface')}>
              <h5>Surface</h5>
            </div>
            <div className="inner-item" onClick={()=>handlepartLocation('Vaginal Area')}>
              <h5>Vaginal Area</h5>
            </div>
          </div>         
          
        </div>
      </div>
    </div> */}
