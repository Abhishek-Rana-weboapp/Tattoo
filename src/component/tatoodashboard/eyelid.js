import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Title from "../../assets/Title.png";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import GridLayout from '../Layout/GridLayout';
import { useTranslation } from 'react-i18next';


function Eyelid() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected, setSelected] = useState();
  const {t} = useTranslation()
  
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
    setAlert(!alert)
    setAlertMessage(t("Please select an option"));
  }
};

const handlePrev = () => {
  navigate(-1);
};


  
    return (
<>
      <GridLayout title={"eyelid"}>

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
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />

          </>
      
    );
  }
  
export default Eyelid

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
  <h1> Eyelid</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlepartLocation('left')}>
    <h5>Left</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('right')}>

    <h5>Right</h5>
  
  </div>
 
  </div>



</div>

</div>

 */}
