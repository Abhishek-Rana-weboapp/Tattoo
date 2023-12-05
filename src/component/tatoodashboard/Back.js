import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button } from 'bootstrap';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';


function Back() {
  const navigate = useNavigate();
  const [showOtherField, setShowOtherField] = useState(false);
  const [otherFieldValue, setOtherFieldValue] = useState('');
  const { user, setUser } = React.useContext(UserContext);
  const [selected , setSelected] = useState()

  const handlePartLocation = (bodyPart) => {
    if(bodyPart === "other"){
        setShowOtherField(!showOtherField)
    }
    setSelected(bodyPart)
  }

  useEffect(()=>{
    if(user.bodyPart)
   if(buttons.find(item=>item.name !== user.bodyPart)){
    setSelected("other")
   }
   else{
    setSelected(user.bodyPart)
   }
  },[])

  const buttons = [
    {
      name : "Full Back Piece"
    },
    {
      name : "Right Shoulder"
    },
    {
      name : "Left Shoulder"
    },
    {
      name : "Spine"
    },
    {
      name : "Lower Back"
    },
    {
      name : "other"
    },
  ]

  console.log("input===" ,otherFieldValue)
  console.log("bodypart===" ,user.bodyPart)
  console.log("selected===" ,selected)

  const handleNext = ()=>{
   if(selected && selected !== "other"){
      setUser({...user , bodyPart : selected})
      navigate("/medical-form")
   }if(selected && selected === "other"){
    if(otherFieldValue){
      setUser({...user , bodyPart : otherFieldValue})
      navigate("/medical-form")
    }else{
      alert("Please select an option")
    }
   }
  }

  const handlePrev = ()=>{
   navigate(-1)
  }

  const handleInput = (e)=>{
     setOtherFieldValue(e.target.value)
  }
  return (
    <>
    <GridLayout onChange={handleInput} otherFieldValue={otherFieldValue} selected={selected} title={"Back"}>
      {
        buttons.map((button , index)=>{
          return <CustomButton onClick={handlePartLocation} selected={selected}>{button.name}</CustomButton>
        })
      }
    </GridLayout>
    <Navigation next={handleNext}  prev={handlePrev} />
    </>
  );
}

export default Back;

//<div className="outer container" style={{ border: '1px solid #d8d6d6' }}>
    //   <div
    //     className="container h-100"
    //     style={{
    //       backgroundColor: '#f5f5f5',
    //       alignItems: 'center',
    //       minHeight: '100vh',
    //       width: '100%',
    //       border: '3px solid black',
    //     }}
    //   >
    //     <h1> BACK</h1>
    //     <div className="big-container">
    //       <div className="outer-item">
    //         <div className="inner-item" onClick={()=>handlepartLocation('Full Back Piece')}>
    //           <h5>Full Back Piece</h5>
    //         </div>
    //         <div className="inner-item" onClick={()=>handlepartLocation('Right Shoulder')}>
    //           <h5>Right Shoulder</h5>
    //         </div>
    //       </div>
    //       <div className="outer-item">
    //         <div className="inner-item" onClick={()=>handlepartLocation('Left Shoulder')}>
    //           <h5>Left Shoulder</h5>
    //         </div>
    //         <div className="inner-item" onClick={()=>handlepartLocation('Spine')}>
    //           <h5>Spine</h5>
    //         </div>
    //       </div>
    //       <div className="outer-item">
    //         <div className="inner-item" onClick={()=>handlepartLocation('Lower Back')}>
    //           <h5>Lower Back</h5>
    //         </div>
    //         <div className="inner-item" onClick={()=>setShowOtherField(true)}>
    //           <h5>Other </h5>
    //         </div>
    //       </div>
    //       {showOtherField && (
    //         <div>
    //           <label>Explanation:</label>
    //           <input
    //             type="text"
    //             value={otherFieldValue}
    //             onChange={(e) => setOtherFieldValue(e.target.value)}
    //           />
    //           <button onClick={()=> handlepartLocation(otherFieldValue)}>Submit</button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
