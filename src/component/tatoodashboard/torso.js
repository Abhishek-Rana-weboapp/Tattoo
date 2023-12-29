import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";

function Torso() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState()

  useEffect(()=>{
    if(user.bodyPart) setSelected(user.bodyPart)
  },[])

  const handlePartLocation = (bodyPart) => {
    setSelected(bodyPart)
  };

  const buttons = [
    {
      name: "full torso",
    },
    {
      name: "left ribs",
    },
    {
      name: "right ribs",
    },
    {
      name: "stomach"
    },
    {
      name: "Belly Button",
    },
    {
      name: "Tummy tuck",
    }
  ];

  const handleNext = ()=>{
   if(selected){
    setUser({ ...user, bodyPart : selected});
    navigate("/medical-form");
   }else{
    setAlert(!alert)
    setAlertMessage("Please select a part")
   }
  }

  const handlePrev = ()=>{
     navigate(-1)
  }

  return (
    <>
      <GridLayout title={"torso"}>
        {
          buttons.map((button , index)=>{
            return <CustomButton key={index} onClick={handlePartLocation} selected={selected} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext}  prev={handlePrev}/>
    </>
  );
}

export default Torso;

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
  <h1> TORSO</h1>
  <div className='big-container'>

  <div className='outer-item'>
  <div className='inner-item' onClick={()=>handlepartLocation('Full Torso')}>
    <h5>Full Torso</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('Left Ribs')}>

    <h5>Left Ribs</h5>
  
  </div>
  </div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('Right Ribs')}>

    <h5>Right Ribs</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('Stomach')}>

    <h5>Stomach</h5>
  
  </div>
</div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('Belly Button')}>

    <h5>Belly Button</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('Tummy Tuck')}>

    <h5>Tummy Tuck </h5>
  
  </div>
</div>     

</div>
</div>
</div> */
}
