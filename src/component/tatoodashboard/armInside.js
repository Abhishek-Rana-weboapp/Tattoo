import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";

function ArmInside() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const { state } = useLocation();
  const [selected, setSelected] = useState()
  const {t} = useTranslation()

    useEffect(()=>{
      if(user.bodyPart) setSelected(user.bodyPart)
  },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  };
  const upperButtons = [
    {
      name: "Inner",
    },
    {
      name: "Outer",
    },
    {
      name: "Front",
    },
    {
      name: "Back",
    },
  ];

  const elbowButtons = [
    {
      name: "Inner",
    },
    {
      name: "Outer",
    },
  ];

  const commonButtons = [
    {
      name: "Inner",
    },
    {
      name: "Outer",
    },
    {
      name: "Side",
    },
  ];

  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, bodyPart:selected });
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
      {state.name === "upper arm" && (
        <>
          <GridLayout title={"upper arm" }>
            {upperButtons.map((button, index) => {
              return (
                <CustomButton
                  key={index}
                  onClick={handlepartLocation}
                  selected={selected}
                >
                  {button.name}
                </CustomButton>
              );
            })}
          </GridLayout>
        </>
      )}
      {state.name === "elbow" && (
        <>
          <GridLayout title={"elbow"}>
            {elbowButtons.map((button, index) => {
              return (
                <CustomButton
                  key={index}
                  onClick={handlepartLocation}
                  selected={selected}
                >
                  {button.name}
                </CustomButton>
              );
            })}
          </GridLayout>
        </>
      )}
      {(state.name === "forearm" || state.name === "wrist") && (
        <>
          <GridLayout title={state.name === "forearm" ? "forearm" : "wrist"}>
            {commonButtons.map((button, index) => {
              return (
                <CustomButton
                  key={index}
                  onClick={handlepartLocation}
                  selected={selected}
                >
                  {button.name}
                </CustomButton>
              );
            })}
          </GridLayout>
        </>
      )}
      <Navigation next={handleNext}  prev={handlePrev} />
    </>
  );
}
export default ArmInside;

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
  <h1> Arm</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

<div>
{state.name === 'upper-arm' && (
  <>
   <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
   <h5>Inner</h5>
   
 </div>
 <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>

   <h5>Outer</h5>
 
 </div>
 <div className='inner-item' onClick={()=>handlepartLocation('Front')}>
     <h5>Front</h5>
 </div>
 <div className='inner-item' onClick={()=>handlepartLocation('Back')}>
     <h5>Back</h5>
 </div>    
 </>   
)}
{state.name === 'elbow' && (
  <>
   <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
   <h5>Inner</h5>
   
 </div>
 <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>

   <h5>Outer</h5>
 
 </div>
 </>
)}


{state.name === 'forearm' && (
  <>
   <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
   <h5>Inner</h5>
   
 </div>
 <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>

   <h5>Outer</h5>
 
 </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Side')}>
        <h5>Side</h5>
    </div>  
    </>
)}


{state.name === 'wrist' && (
<>
   <div className='inner-item' onClick={()=>handlepartLocation('Inner')}>
   <h5>Inner</h5>
   
 </div>
 <div className='inner-item' onClick={()=>handlepartLocation('Outer')}>

   <h5>Outer</h5>
 
 </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Side')}>
        <h5>Side</h5>
    </div>  
    </>
)}


</div>

</div>
</div>
</div> */
}
