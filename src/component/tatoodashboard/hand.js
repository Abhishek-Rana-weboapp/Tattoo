import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';


function Hand() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected , setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
      if(user.level2) setSelected(user.level2)
    },[])
  
    const buttons = [
      {
        name:"left hand"
      },
      {
        name:"right hand"
      }
    ]
  
    const handleNext = ()=>{
        if(selected){
          if(user.level2 !== selected){
            setUser({ ...user, level2 : selected, level3:null , level4:null });
          }else{
            setUser({ ...user, level2 : selected });
          }
          navigate('/hand-inside')
        }else{
          setAlert(!alert)
          setAlertMessage(t("Please select an option"))
        }
    }
  
    const handlePrev = ()=>{
        navigate(-1)
    }

    const handlehandLocation = (handLocation) => {
      setSelected(handLocation)
    }
    return (
      <>
      <GridLayout title={"hand"}>
        {
          buttons.map((button, index)=>{
            return <CustomButton key={index} onClick={handlehandLocation} selected={selected} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext}  prev={handlePrev} />
          </>
     
  
    );
  }
  
export default Hand

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
  <h1> Hand</h1>
  <div className='outer-container' style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      gap:'30px',
      marginTop:'55px'
  }}>

  
  <div className='inner-item' onClick={()=>handlehandLocation('left hand')}>
    <h5>Left Hand</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlehandLocation('right hand')}>

    <h5>Right Hand</h5>
  
  </div>
 
  </div>



</div>

</div> */}

