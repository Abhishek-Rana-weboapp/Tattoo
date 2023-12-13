import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Title from "../../assets/Title.png"
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';


function HeadTattoo() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
       if(user.headLocation) setSelected(user.headLocation)
    },[])

    const handleheadLocation = (headLocation) =>{
      setSelected(headLocation)
    }

    const buttons = [
      {
        name : "face"
      },
      {
        name:"scalp"
      },
      {
        name:"ear"
      }
    ]

    const handleNext = ()=>{
      if(selected){
        setUser({ ...user, selected });
        navigate(`/${selected}`); 
      }else{
        alert("Please Select an head location")
      }
        
    }

    const handlePrev = ()=>{
navigate(-1)
    }

    return (
      <>
   <GridLayout title={"head"}>
     { buttons.map((button, index) => {
       return (
         <CustomButton
         onClick={handleheadLocation}
         selected={selected}
         >
             {button.name}
           </CustomButton>
       );
      }) 
    }
    </GridLayout>
   <Navigation next={handleNext}  prev={handlePrev} />
   </>
   );
  }
  
export default HeadTattoo