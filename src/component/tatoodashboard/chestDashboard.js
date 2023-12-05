import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';


function ChestDeshboard() {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
    if(user.chestLocation)  setSelected(user.chestLocation)
    },[])

    const handleChestLocation = (chestLocation) => {
      setSelected(chestLocation)

    }

    const buttons = [
      {
        name:"full chest"
      },
      {
        name:"left chest"
      },
      {
        name:"right chest"
      },
      {
        name:"center chest"
      },
      {
        name:"collar chest"
      },
      {
        name:"Nipple"
      },
      {
        name:"under-chest"
      }
    ]


    const handleNext = ()=>{
      if(selected){
        setUser({...user , chestLocation : selected})
      navigate('/under-chest'); 
      }else{
        alert("Select a tattoo Location")
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
            return <CustomButton onClick={handleChestLocation} selected={selected}>{button.name}</CustomButton>
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