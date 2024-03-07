import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';


function Pelvic() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
      if(user.level2) setSelected(user.level2)
  },[])

    const handlepartLocation = (bodyPart) => {
      setSelected(bodyPart)
      }

      const buttons = [
        {
          name: "top"
        },
        {
          name: "middle"
        },
        {
          name: "bottom"
        },
        {
          name: "left"
        },
        {
          name: "right"
        },
        {
          name: "full"
        }
      ]

      const handleNext = ()=>{
        if(selected){
          if(user.level2 !== selected){
            setUser({ ...user, level2:selected, level3:null, level4:null });
            }else{
              setUser({ ...user, level2:selected });
            }
          navigate("/count"); 
        }else{
          setAlert(!alert)
          setAlertMessage(t("Please select an option"))
        }
      }
  
      const handlePrev = ()=>{
       navigate(-1)
      }

    
    return (
      <>
      <GridLayout title={"pelvic"}>
      {
           buttons.map((button, index)=>{
             return <CustomButton onClick={handlepartLocation} selected={selected} key={index}>{button.name}</CustomButton>
           })
         }
      </GridLayout>
       <Navigation next={handleNext} prev={handlePrev} />
      </>
     
    );
  }
  
export default Pelvic


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
  <h1> PELVIC</h1>
  <div className='big-container'>

  <div className='outer-item'>
  <div className='inner-item' onClick={()=>handlepartLocation('top')}>
    <h5>Top</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('middle')}>

    <h5>Middle</h5>
  
  </div>
  </div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('bottom')}>

    <h5>Bottom</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('left')}>

    <h5>Left</h5>
    
  </div>
</div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('right')}>

   <h5>Right</h5> 
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('full')}>

   <h5>Full</h5>
    
  </div>
</div>




</div>
</div>
</div> */}
