import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';

function JewelleryPiercing() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [selected , setSelected] = useState()

  useEffect(()=>{
 if(user.bodyPart) setSelected(user.bodyPart)
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
      setUser({ ...user, bodyPart : selected });
    navigate('/medical-form'); 
    }else{
      alert("Please select an option")
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
