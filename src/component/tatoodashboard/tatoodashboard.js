import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import GridLayout from "../Layout/GridLayout";

function TattooDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [selected , setSelected] = useState()

  useEffect(()=>{
    if(user.tattooLocation){
      setSelected(user.tattooLocation)
    }
  },[])

  const handletattooLocation = (tattooLocation) => {
    setSelected(tattooLocation)
  };

 
  const buttons = [
    {
      name: "head",
    },
    {
      name: "chest",
    },
    {
      name: "torso",
    },
    {
      name: "back",
    },
    {
      name: "arm",
    },
    {
      name: "hand"
    },
    {
      name: "hip"
    },
    {
      name: "glute"
    },
    {
      name: "leg",
    },
    {
      name: "foot",
    },
    {
      name: "neck",
    },
    {
      name: "pelvic",
    },
  ];
  
  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, tattooLocation : selected});
      navigate(`/${selected}`)
    }
    else{
      alert("Please Select a Location for the tatto")
    }

  }

  const handlePrev = ()=>{
      navigate(-1)
  }

  return (
    <>
    <GridLayout title={"tattoo"}>
        { buttons.map((button, index) => {
          return (
              <CustomButton
              key={index}
                onClick={handletattooLocation}
                selected={selected}
                >
                {button.name}
              </CustomButton>
          );
        }) 
      }
     </GridLayout>
     <Navigation next={handleNext}  prev={handlePrev} />
      </>
  );
}

export default TattooDashboard;

{
  /* <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> FAME TATTOOS</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handletattooLocation('head')}>
          <h5>head</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('chest')}>
  
          <h5>chest</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('torso')}>
  
          <h5>torso</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('back')}>
  
          <h5>back</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('arm')}>
  
         <h5>arm</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('hand')}>
  
         <h5>hand</h5>
          
        </div>
      </div>

      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('hip')}>
  
         <h5>hip</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('glute')}>
  
         <h5>glute</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('leg')}>
  
         <h5>leg</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('foot')}>
  
         <h5>foot</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handletattooLocation('neck')}
      >
  
         <h5>Neck</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handletattooLocation('pelvic')}>
  
  <h5>pelvic</h5>
   
 </div>
      </div>

      </div>
      </div>
  </div>
   */
}
