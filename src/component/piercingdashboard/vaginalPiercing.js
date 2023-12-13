import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';

function VaginalPiercing() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const [buttonHeight, setButtonHeight] = useState('auto');

  useEffect(() => {
    // Calculate the maximum height among all buttons
    const maxHeight = Math.max(...buttons.map(button => {
      // You can adjust the padding as needed
      const padding = 16; // Adjust this value based on your design
      return buttonRef.current.clientHeight + padding * 2;
    }));
    setButtonHeight(`${maxHeight}px`);
  }, [buttons]);

  const buttonRef = useRef()

  useEffect(()=>{
    if(user.bodyPart) setSelected(user.bodyPart)
     },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }


  const buttons = [
    {
      name:"Christina"
    },
    {
      name:"Vertical Hood"
    },
    {
      name:"Horizontal Hood"
    },
    {
      name:"Inner Labia"
    },
    {
      name:"Outer Labia"
    },
    {
      name:"Fourchette"
    },
    {
      name:"Hymen"
    },
    {
      name:"Isabella"
    },
    {
      name:"Princess Albertina"
    },
    {
      name:"Triangle"
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
    <GridLayout title={"vaginal piercing"}>
    {buttons.map((button, index) => {
          return (
            <CustomButton key={index} def={buttonRef} buttonStyle={{ height: buttonHeight }} onClick={handlepartLocation} selected={selected}>
              {button.name}
            </CustomButton>
          );
        })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev} />
    </>
  
  );
}

export default VaginalPiercing;


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
  <h1>Vaginal Piercing</h1>
  <div className="big-container">
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Christina')}>
        <h5>Christina</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Vertical Hood')}>
        <h5>Vertical Hood</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Horizontal Hood')}>
        <h5>Horizontal Hood</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Inner Labia')}>
        <h5>Inner Labia</h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Outer Labia')}>
        <h5>Outer Labia</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Fourchette')}>
        <h5>Fourchette </h5>
      </div>
    </div>
    <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Hymen')}>
        <h5>Hymen</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Isabella')}>
        <h5>Isabella</h5>
      </div>
    </div>         
     <div className="outer-item">
      <div className="inner-item" onClick={()=>handlepartLocation('Princess Albertina')}>
        <h5>Princess Albertina</h5>
      </div>
      <div className="inner-item" onClick={()=>handlepartLocation('Triangle')}>
        <h5>Triangle</h5>
      </div>
    </div>         
         
  </div>
</div>
</div> */}
