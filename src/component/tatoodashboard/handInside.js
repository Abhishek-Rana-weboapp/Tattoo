import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';


function HandInside() {

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected , setSelected] = useState()

    useEffect(()=>{
      if(user.bodyPart) setSelected(user.bodyPart)
    },[])

    console.log(user)
  
    const buttons = [
      {
        name:"top"
      },
      {
        name:"palm"
      },
      {
        name:"side"
      },
      {
        name:"fingers"
      }
    ]
  
    const handleNext = ()=>{
        if(selected){
          setUser({ ...user, bodyPart : selected });
          navigate('/medical-form')
        }else{
          alert("Please select an option")
        }
    }
  
    const handlePrev = ()=>{
        navigate(-1)
    }

    const handlepartLocation = (bodyPart) => {
        setSelected(bodyPart)
      }
    return (
      <>
      <GridLayout title={"hand"}>
        {
          buttons.map((button, index)=>{
            return <CustomButton key={index} onClick={handlepartLocation} selected={selected} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext}  prev={handlePrev} />
          </>
     
    );
  }
  
export default HandInside


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

  
  <div className='inner-item' onClick={()=>handlepartLocation('top')}>
    <h5>Top</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('palm')}>

    <h5>Palm</h5>
  
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('side')}>

<h5>Side</h5>

</div>
<div className='inner-item' onClick={()=>handlepartLocation('fingers')}>

<h5>Fingers</h5>

</div>

  </div>



</div>

</div> */}


