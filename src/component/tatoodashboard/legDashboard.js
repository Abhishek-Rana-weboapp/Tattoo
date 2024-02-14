import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';


function LegDashboard() {
  const progressValue = 40;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
     if(user.bodyPart) setSelected(user.bodyPart)
     if(user.legInside) setSelected(user.legInside)
    },[])

    const handlepartLocation = (bodyPart) => {
      setSelected(bodyPart)
    }

    // const handleContentSelection = (legInside) => {
    //   setUser({ ...user, legInside });

    //     navigate('/leginside',
    //     {
    //       state: {
    //         full: legInside
    //       }
    //     })
    //   };

      const partButtons = [
        {
          name: 'full'
        }
      ]

      const contentButtons = [
        {
          name:"half sleeve"
        },
        {
          name:"thigh"
        },
        {
          name:"knee"
        },
        {
          name:"lower leg"
        },
        {
          name:"ankle"
        },
      ]

      const handleNext = ()=>{
        if(selected){
         if(partButtons.find(item=>item.name === selected)){
           setUser({ ...user, bodyPart : selected});
           navigate('/description'); 
         }
         if(contentButtons.find(item=>item.name===selected)){
           setUser({ ...user, legInside : selected});
           navigate('/leginside',{state:{full: selected}}); 
         }
        }
     }
 
     const handlePrev = ()=>{
       navigate(-1)
     }

    return (

      <>
      <GridLayout title={"leg"}>
        {
          partButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
        {
          contentButtons.map((button , index)=>{
            return <CustomButton onClick={handlepartLocation} selected={selected} key={index} >{button.name}</CustomButton>
          })
        }
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev}/>
      </>
     
  
  
    );
  }
  
export default LegDashboard


// <div className='outer container' style={{
//   border: '1px solid #d8d6d6'

// }}>
// <div className='container h-100' style={{
//   backgroundColor: '#setSelectedContentf5f5f5',

//   alignItems: 'center',
//   minHeight: '100vh',
//   width:'100%',
//   border: '3px solid black',


// }}>
//   <h1> Leg</h1>
//   <div className='outer-container' style={{
//       display:'flex',
//       justifyContent:'center',
//       flexDirection:'column',
//       alignItems:'center',
//       gap:'30px',
//       marginTop:'55px'
//   }}>

  
//   <div className='inner-item' onClick={()=>handlepartLocation('full')}>
//     <h5>Full Sleeve </h5>
    
//   </div>
//   <div className='inner-item' onClick={()=>handleContentSelection('Half')}>

//     <h5>Half Sleeve</h5>
  
//   </div>
//   <div className='inner-item' onClick={()=>handleContentSelection('Thigh')}>

//       <h5>Thigh</h5>

//       </div>
//       <div className='inner-item' onClick={()=>handleContentSelection('Knee')}>
//     <h5>Knee </h5>
    
//   </div>     <div className='inner-item' onClick={()=>handleContentSelection('Lower')}>
//     <h5>Lower Leg </h5>
    
//   </div>     <div className='inner-item' onClick={()=>handleContentSelection('Ankle')}>
//     <h5>Ankle </h5>
    
//   </div>
//   </div>



// </div>

// </div>
