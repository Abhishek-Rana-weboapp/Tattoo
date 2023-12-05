import React , {useState , useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Title from "../../assets/Title.png";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { PiSmileySticker } from 'react-icons/pi';


function Eyebrow() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [selected, setSelected] = useState();
  
    useEffect(() => {
      if (user.bodyPart) setSelected(user.bodyPart);
    }, []);

  const handlePartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }

  const buttons = [
    {
      name: "left",
    },
    {
      name: "right",
    },
  ];

  const handleNext = () => {
    if (selected) {
      setUser({ ...user, bodyPart: selected });
      navigate("/medical-form");
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
      <div className="w-4/6 h-2/3 flex flex-col items-center pt-5 gap-4">
        <h1 className='font-bold text-5xl text-white'>EYEBROW</h1>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 w-4/6 h-max">
          {buttons.map((button, index) => {
            return (
              <div className="flex justify-center items-center w-full">
                <CustomButton
                  onClick={handlePartLocation}
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
  
export default Eyebrow


// <div className='outer container' style={{
//   border: '1px solid #d8d6d6'

// }}>
// <div className='container h-100' style={{
//   backgroundColor: '#f5f5f5',

//   alignItems: 'center',
//   minHeight: '100vh',
//   width:'100%',
//   border: '3px solid black',


// }}>
//   <h1> Eyebrow</h1>
//   <div className='outer-container' style={{
//       display:'flex',
//       justifyContent:'center',
//       flexDirection:'column',
//       alignItems:'center',
//       gap:'30px',
//       marginTop:'55px'
//   }}>

  
//   <div className='inner-item' onClick={()=>handlepartLocation('left')}>
//     <h5>Left</h5>
    
//   </div>
//   <div className='inner-item' onClick={()=>handlepartLocation('right')}>

//     <h5>Right</h5>
  
//   </div>
 
//   </div>



// </div>

// </div>

