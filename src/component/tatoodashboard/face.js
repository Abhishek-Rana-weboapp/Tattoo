import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import GridLayout from '../Layout/GridLayout';
import { useTranslation } from 'react-i18next';
function FaceDashboard() {
  const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser, alert , setAlert , setAlertMessage } = React.useContext(UserContext);
    const [selected, setSelected] = useState()

    useEffect(()=>{
      if(user.level3) setSelected(user.level3)
   },[])

    const handlefaceLocation = (faceLocation) => {
      setSelected(faceLocation)
    }

  const buttons = [
    {
      name:"forehead"
    },
    {
      name:"temple"
    },
    {
      name:"eyebrow"
    },
    {
      name:"eyelid"
    },
    {
      name:"nose"
    },
    {
      name:"cheeks"
    },
    {
      name:"lip"
    },
    {
      name:"jaw"
    },
  ]

  const handleNext = ()=>{
  if(selected){
    if(user.level3 !== selected){
    setUser({ ...user, level3 : selected, level4:null });
    }else{
      setUser({ ...user, level3 : selected });
    }
    if(selected === "nose"){
      navigate("/count")
      return
    }else{
      navigate(`/${selected}`); 
      return
    }
  }else{
    setAlert(!alert)
    setAlertMessage(t("Please select a face location"))
  }
  }

  const handlePrev = ()=>{
   navigate(-1)
  }

    return (
      <>
<GridLayout title={"face"}>

        { buttons.map((button, index) => {
          return (
            <div className="flex justify-center items-center w-full">
              <CustomButton
                onClick={handlefaceLocation}
                number= {button.number}
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
  
export default FaceDashboard

