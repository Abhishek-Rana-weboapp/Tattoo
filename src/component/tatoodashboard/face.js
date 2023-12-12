import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Title from "../../assets/Title.png"
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';

function FaceDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
      if(user.faceLocation) setSelected(user.faceLocation)
   },[])

    const handlefaceLocation = (faceLocation) => {
      setSelected(faceLocation)
    }

  const buttons = [
    {
      name:"forehead"
    },
    {
      name:"temple"
    },
    {
      name:"eyebrow"
    },
    {
      name:"eyelid"
    },
    {
      name:"nose"
    },
    {
      name:"cheeks"
    },
    {
      name:"lip"
    },
    {
      name:"jaw"
    },
  ]

  const handleNext = ()=>{
  if(selected){
    setUser({ ...user, faceLocation : selected });
    navigate(`/${selected}`); 
  }else{
    alert("Please select a face location")
  }
  }

  const handlePrev = ()=>{
   navigate(-1)
  }

    return (
      <>
{/* 
      <div className="w-full h-full flex flex-col gap-1 items-center">
      <img src={Title} className="w-3/5 mt-5"></img>
      <div className='w-4/6 h-2/3 flex flex-col gap-4 items-center pt-5'>
<h1 className='text-white font-semibold'>FACE</h1>
<div className="grid grid-cols-2 gap-x-10 gap-y-3 w-4/6 h-max"> */}
<GridLayout title={"face"}>

        { buttons.map((button, index) => {
          return (
            <div className="flex justify-center items-center w-full">
              <CustomButton
                onClick={handlefaceLocation}
                number= {button.number}
                selected={selected}
                >
                {button.name}
              </CustomButton>
            </div>
          );
        }) 
      }
      </GridLayout>
      {/* </div> */}
      {/* // </div> */}
     <Navigation next={handleNext}  prev={handlePrev} />
    {/* // </div> */}
      </>
  
    );
  }
  
export default FaceDashboard

{/* <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> FACE</h1>
        <div className='big-container'>
  
        <div className='outer-item'>
        <div className='inner-item' onClick={()=>handlefaceLocation('forehead')}>
          <h5>Forehead</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('face-temple')}>
  
          <h5>Temple</h5>
        
        </div>
        </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlefaceLocation('eyebrow')}>
  
          <h5>Eyebrow</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('eyelid')}>
  
          <h5>Eyelid</h5>
          
        </div>
      </div>
      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlefaceLocation('nose')}>
  
         <h5>Nose</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('cheeks')}>
  
         <h5>Cheeks</h5>
          
        </div>
      </div>

      <div className='outer-item'>
      <div className='inner-item' onClick={()=>handlefaceLocation('lip')}>
  
         <h5>Lip</h5> 
          
        </div>
        <div className='inner-item' onClick={()=>handlefaceLocation('jaw')}>
  
         <h5>Jaw</h5>
          
        </div>
      </div>



      </div>
      <ProgressBar progress={progressValue} />
      </div>
  </div> */}