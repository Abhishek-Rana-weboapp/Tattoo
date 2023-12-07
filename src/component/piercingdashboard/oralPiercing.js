import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ProgressBar from '../ProgressBar';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
function OralPiercing() {
  const progressValue = 30;
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
      name:"Straight Bar Tongue"
    },
    {
      name:"Snake Eye Tongue"
    },
    {
      name:"Snake Bite Lip"
    },
    {
      name:"Tongue Web"
    },
    {
      name:"Smiley"
    },
    {
      name:"Monroe"
    },
    {
      name:"Medusa"
    },
    {
      name:"Madonna"
    },
    {
      name:"Dimples"
    },
    {
      name:"Ahley"
    },
    {
      name:"Angel Bites"
    },
    {
      name:"Canine Bites"
    },
    {
      name:"Cyber Bites"
    },
    {
      name:"Dahlia"
    },
    {
      name:"Dolphin Bites"
    },
    {
      name:"Frowney"
    },
    {
      name:"Gum"
    },
    {
      name:"Horizontal Lip"
    },
    {
      name:"Jestrum"
    },
    {
      name:"Multi Tongue"
    },
    {
      name:"Shark Bites"
    },
    {
      name:"Spider Bites"
    },
    {
      name:"Vampire"
    },
    {
      name:"Venom"
    },
    {
      name:"Vertical Labret"
    }
  ]

  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, bodyPart : selected});
    navigate('/medical-form'); 
    }else{
      alert("Please Select an option")
    }
  }

  const handlePrev = ()=>{
 navigate(-1)
  }



  return (

    <>
    <GridLayout title={"oral piercing"}>
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

export default OralPiercing;


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
  <h1>Oral Area Piercing</h1>
  <div className="big-container">
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Straight Bar Tongue')}>
        <h5>Straight Bar Tongue</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Snake Eye Tongue')}>
        <h5>Snake Eye Tongue</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Snake Bite Lip')}>
        <h5>Snake Bite Lip</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Tongue Web')}>
        <h5>Tongue Web</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Smiley')}>
        <h5>Smiley</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Monroe')}>
        <h5>Monroe </h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Medusa')}>
        <h5>Medusa</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Madonna')}>
        <h5>Madonna</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Dimples')}>
        <h5>Dimples</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Ahley')}>
        <h5>Ahley</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Angel Bites')}>
        <h5>Angel Bites</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Canine Bites')}>
        <h5>Canine Bites</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Cyber Bites')}>
        <h5>Cyber Bites</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Dahlia')}>
        <h5>Dahlia</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Dolphin Bites')}>
        <h5>Dolphin Bites</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Frowney')}>
        <h5>Frowney</h5>
      </div>
    </div>

    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Gum')}>
        <h5>Gum</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Horizontal Lip')}>
        <h5>Horizontal Lip</h5>
      </div>
    </div>      
      <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Jestrum')}>
        <h5>Jestrum</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Multi Tongue')}>
        <h5>Multi Tongue</h5>
      </div>
    </div>          
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Shark Bites')}>
        <h5>Shark Bites</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Spider Bites')}>
        <h5>Spider Bites</h5>
      </div>
    </div>          
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Vampire')}>
        <h5>Vampire</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Venom')} >
        <h5>Venom</h5>
      </div>
    </div>          
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Vertical Labret')}>
        <h5>Vertical Labret</h5>
      </div>

    </div>
  </div>
  <ProgressBar progress={progressValue} />
</div>
</div> */}
