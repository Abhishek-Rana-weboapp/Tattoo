import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Title from "../../assets/Title.png";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import GridLayout from "../Layout/GridLayout";

function FaceDashboard() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (user.level4) setSelected(user.level4);
  }, []);

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart);
  };

  const buttons = [
    {
      name: "left",
    },
    {
      name: "right",
    },
    {
      name: "center",
    },
  ];

  const handleNext = () => {
    if (selected) {
      setUser({ ...user, level4: selected });
      navigate("/count");
    } else {
      setAlertMessage("Please select a face location");
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <>
    <GridLayout title={"forehead"}> 

          {buttons.map((button, index) => {
            return (
              <div className="flex justify-center items-center w-full">
                <CustomButton onClick={handlepartLocation} selected={selected}>
                  {button.name}
                </CustomButton>
              </div>
            );
          })}
          </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
          </>
  );
}

export default FaceDashboard;

// <div className='outer container' style={{
//         border: '1px solid #d8d6d6'

//       }}>
//       <div className='container h-100' style={{
//         backgroundColor: '#f5f5f5',

//         alignItems: 'center',
//         minHeight: '100vh',
//         width:'100%',
//         border: '3px solid black',

//       }}>
//         <h1> Forehead</h1>
//         <div className='outer-container' style={{
//             display:'flex',
//             justifyContent:'center',
//             flexDirection:'column',
//             alignItems:'center',
//             gap:'30px',
//             marginTop:'55px'
//         }}>

//         <div className='inner-item' onClick={()=>handlepartLocation('left')}>
//           <h5>Left</h5>

//         </div>
//         <div className='inner-item' onClick={()=>handlepartLocation('right')}>

//           <h5>Right</h5>

//         </div>
//         <div className='inner-item' onClick={()=>handlepartLocation('center')}>

//   <h5>Center</h5>

// </div>
//         </div>

//       </div>

//       </div>
