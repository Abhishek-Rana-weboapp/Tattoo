import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Title from "../../assets/Title.png"
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import { useTranslation } from 'react-i18next';


function HeadTattoo() {
  const progressValue = 30;
    const navigate = useNavigate();
    const { user, setUser,alert, setAlert, setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()
    const {t} = useTranslation()

    useEffect(()=>{
       if(user.level2) setSelected(user.level2)
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
        if(user.level2 !== selected) {
          setUser({ ...user, level2 : selected, level3:null, level4:null });
        }else{
          setUser({ ...user, level2 : selected});
        }
        navigate(`/${selected}`); 
      }else{
        setAlertMessage(t("Please Select an head location"))
        setAlert(!alert)
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