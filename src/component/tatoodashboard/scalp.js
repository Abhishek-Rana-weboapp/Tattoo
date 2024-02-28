import React ,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';


function Scalp() {
    const navigate = useNavigate();
    const { user, setUser, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
      if(user.bodyPart) setSelected(user.bodyPart)
   },[])

    const handlepartLocation = (bodyPart) => {
      setSelected(bodyPart)
    }

    const buttons = [
      {
        name:"top"
      },
      {
        name:"back"
      },
      {
        name:"left"
      },
      {
        name:"right"
      },
      {
        name:"full"
      },
    ]

    const handleNext = ()=>{
      if(selected){
        setUser({ ...user, bodyPart : selected, earLocation:null, faceLocation:null });
        navigate(`/description`);    
      }else{
        setAlertMessage("Please select a face location")
      }
      }
    
      const handlePrev = ()=>{
       navigate(-1)
      }

    return (
      <>
      <GridLayout title={"scalp"}>

        { buttons.map((button, index) => {
          return (
            <div className="flex justify-center items-center w-full" key={index}>
              <CustomButton
                onClick={handlepartLocation}
                selected={selected}
                >
                {button.name}
              </CustomButton>
            </div>
          );
        }) 
      }
      </GridLayout>
     <Navigation next={handleNext}  prev={handlePrev} />
   
    </>
    );
  }
  
export default Scalp



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
  <h1> Scalp</h1>
  <div className='big-container'>

  <div className='outer-item'>
  <div className='inner-item' onClick={()=>handlepartLocation('top')}>
    <h5>Top</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('back')}>

    <h5>Back</h5>
  
  </div>
  </div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('left')}>

    <h5>Left</h5>
    
  </div>
  <div className='inner-item' onClick={()=>handlepartLocation('right')}>

    <h5>Right</h5>
    
  </div>
</div>
<div className='outer-item'>
<div className='inner-item' onClick={()=>handlepartLocation('full')}>

   <h5>Full</h5> 
    
  </div>
 
</div>





</div>
</div>
</div> */}
