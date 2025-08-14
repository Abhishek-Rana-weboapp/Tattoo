import {useState } from "react";
import { useNavigate } from "react-router-dom";
import GridLayout from "./Layout/GridLayout";
import CustomButton from "./buttons/CustomButton";
import Navigation from "./navigation/Navigation";
import { useTranslation } from "react-i18next";
import { useAppointmentContext } from "../context/AppointmentContext";
import toast from "react-hot-toast";

function PermanentMakeup() {
  const navigate = useNavigate();
  const {setAppointmentData}= useAppointmentContext()
  const [selected, setSelected] = useState();
  const { t } = useTranslation();

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart);
  };

  const buttons = [
    {
      name: "eyebrows",
      value: "eyebrows",
    },
    {
      name: "eyeliner",
      value: "eyeliner",
    },
    {
      name: "lips",
      value: "lips",
    },
  ];

  const handleNext = () => {
    if (!selected) {
      toast.error(t("Please select an option"))
      return
    }

    const data = {
      1: { level1: selected, level2: null, level3: null, level4: null },
    }
    setAppointmentData(prev=>({...prev, 
      bodyLocation: JSON.stringify(data)
    }));
    navigate("/medical-form");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <>
      <GridLayout title={"permanent makeup"}>
        {buttons.map((button, index) => {
          return (
            <CustomButton
              key={index}
              onClick={handlepartLocation}
              selected={selected}
              value={button.value}
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

export default PermanentMakeup;

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
  
   
        
        <div className='inner-item' onClick={()=>handlepartLocation('Eyebrows')}>
          <h5>Eyebrows</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Eyeliner')}>
          <h5>Eyeliner</h5>
          
        </div>
        <div className='inner-item' onClick={()=>handlepartLocation('Lips')}>
          <h5>Lips</h5>
          
        </div>
        </div>
      
        <ProgressBar progress={progressValue} />

      </div>

      </div>
      }}>
        <h1>Permanent Makeup</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
 
       */
}
