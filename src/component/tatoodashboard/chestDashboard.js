import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import { useTranslation } from 'react-i18next';


function ChestDeshboard() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
    if(user.level2)  setSelected(user.level2)
    },[])

    const handleChestLocation = (chestLocation) => {
      setSelected(chestLocation)
    }

    const buttons = [
      {
        name:"full chest"
      },
      {
        name:"left side"
      },
      {
        name:"right side"
      },
      {
        name:"center"
      }, 
    ]

    const insideButtons = [
      {
        name:"collarbone"
      },
      {
        name:"nipple"
      },
      {
        name:"under-chest"
      }
    ]

    const handleNext = ()=>{
      if(selected){
        if(user.level2 !== selected){
          setUser({...user , level2 : selected, level3:null, level4:null})
        }else{
          setUser({...user , level2 : selected})

        }
        if(insideButtons.find(b=>b.name === selected)){
          navigate("/under-chest")
        }
        if(buttons.find(b=>b.name === selected)){
          navigate("/description")  
        }
      }
      else{
        setAlert(!alert)
        setAlertMessage(t("Select a tattoo Location"))
      }
    }

    const handlePrev = ()=>{
     navigate(-1)
    }

    return (
      <>
      <GridLayout title={"chest"}>
        {
          buttons.map((button, index)=>{
            return <CustomButton key={index} onClick={handleChestLocation} selected={selected}>{button.name}</CustomButton>
          })
        }
        {
          insideButtons.map((button, index)=>{
            return <CustomButton key={index} onClick={handleChestLocation} selected={selected}>{button.name}</CustomButton>
          })
        }
        </GridLayout>
       <Navigation next={handleNext}  prev={handlePrev}   />    
        </>
  
    );
  }
  
export default ChestDeshboard

{/* <div className='big-container'>
  
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('full chest')}>
  <h5>Full Chest</h5>
  
</div>
<div className='inner-item' onClick={()=>handlepartLocation('left side')}>

  <h5>Left Side</h5>

</div>
</div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('right side')}>

  <h5>Right Side</h5>
  
</div>
<div className='inner-item' onClick={()=>handlepartLocation('center')}>

  <h5>Center</h5>

</div>
</div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('collar bone')}>

  <h5>Collar bone</h5>
  
</div>
<div className='inner-item' onClick={()=>handlchestLocation('nipple')}>

  <h5>Nipple </h5>

</div>
</div>    
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlchestLocation('under-chest')}>

  <h5>Under Chest</h5>
  
</div>

</div>     

</div> */}