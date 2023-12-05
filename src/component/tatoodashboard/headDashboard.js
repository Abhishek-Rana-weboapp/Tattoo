import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Title from "../../assets/Title.png"
import Navigation from '../navigation/Navigation';


function HeadTattoo() {
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
   <div className="w-full h-full flex flex-col gap-1 items-center">
   <img src={Title} className="w-3/5 mt-5"></img>
   <div className='w-4/6 h-2/3 flex flex-col gap-4 items-center pt-5'>
<h1 className='text-white font-semibold'>HEAD</h1>
<div className="grid grid-cols-2 gap-x-10 gap-y-3 w-4/6 h-max">
     { buttons.map((button, index) => {
       return (
         <div className="flex justify-center items-center w-full h-max">
           <CustomButton
            onClick={handleheadLocation}
            selected={selected}
            >
             {button.name}
           </CustomButton>
         </div>
       );
      }) 
    }
    </div>
   </div>
  <Navigation next={handleNext}  prev={handlePrev} />
 </div>
    );
  }
  
export default HeadTattoo