import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Title from "../../assets/Title.png";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";

function Ear() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [selected, setSelected] = useState();
  
    useEffect(() => {
      if (user.earLocation) setSelected(user.earLocation);
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
      setUser({ ...user, earLocation: selected });
      navigate("/ear-dashboard");
    } else {
      alert("Please select a face location");
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 items-center">
      <img src={Title} className="w-3/5 mt-5"></img>
      <div className="w-4/6 h-2/3 flex justify-center pt-5">
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 w-4/6 h-max">
          {buttons.map((button, index) => {
            console.log(button);
            return (
              <div className="flex justify-center items-center w-full">
                <CustomButton
                  onClick={handleEarLocation}
                  number={button.number}
                  selected={selected}
                >
                  {button.name}
                </CustomButton>
              </div>
            );
          })}
        </div>
      </div>
      <Navigation next={handleNext} prev={handlePrev} />
    </div>
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
