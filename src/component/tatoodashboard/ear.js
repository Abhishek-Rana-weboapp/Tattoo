import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Title from "../../assets/Title.png";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import GridLayout from "../Layout/GridLayout";

function Ear() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState();
  
    useEffect(() => {
      if (user.level3) setSelected(user.level3);
    }, []);

  const handleEarLocation = (earLocation) => {
    setSelected(earLocation);
  };

  const buttons = [
    {
      name: "left ear",
    },
    {
      name: "right ear",
    },
  ];

  const handleNext = () => {
    if (selected) {
      setUser({ ...user, level3: selected });
      navigate("/ear-dashboard");
    } else {
      setAlertMessage("Please select a face location");
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <>
    <GridLayout title={"ear"}>
          {buttons.map((button, index) => {
            return (
             
                <CustomButton
                key={index}
                  onClick={handleEarLocation}
                  selected={selected}
                  >
                  {button.name}
                </CustomButton>
            );
          })}
          </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
          </>
  );
}

export default Ear;

// return (
//   <div className='outer container' style={{
//     border: '1px solid #d8d6d6'

//   }}>
//   <div className='container h-100' style={{
//     backgroundColor: '#f5f5f5',

//     alignItems: 'center',
//     minHeight: '100vh',
//     width:'100%',
//     border: '3px solid black',

//   }}>
//     <h1> Ear</h1>
//     <div className='outer-container' style={{
//         display:'flex',
//         justifyContent:'center',
//         flexDirection:'column',
//         alignItems:'center',
//         gap:'30px',
//         marginTop:'55px'
//     }}>

//     <div className='inner-item' onClick={()=>handleearLocation('left ear')}>
//       <h5>Left Ear</h5>

//     </div>
//     <div className='inner-item' onClick={()=>handleearLocation('right ear')}>

//       <h5>Right Ear</h5>

//     </div>

//     </div>

//   </div>

//   </div>

// );
