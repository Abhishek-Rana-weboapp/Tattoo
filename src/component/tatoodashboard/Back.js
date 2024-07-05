import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';


function Back() {
  const progressValue = 30;
  const navigate = useNavigate();
  const [showOtherField, setShowOtherField] = useState(false);
  const [otherFieldValue, setOtherFieldValue] = useState('');
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const [selected , setSelected] = useState("")
  const {t} =useTranslation()

  const handlePartLocation = (bodyPart) => {
    if(bodyPart === "other"){
        setShowOtherField(!showOtherField)
    }
    setSelected(bodyPart)
  }

  useEffect(()=>{
    if(user?.bodyPart){
      if(buttons.find(item=>item?.name !== user?.level2)){
        setSelected("other")
        setOtherFieldValue(user.level2)
      }
      if(buttons.find(item=>item.name === user?.level2)){
        setSelected(user?.level2)
      }
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


  const handleNext = ()=>{
    if(selected){
      if(user.level2 !== selected){
        if(selected !== "other"){
        setUser({...user , level2 : selected, level3 : null, level4:null})
        navigate("/description")
      }if(selected === "other"){
        if(otherFieldValue){
          setUser({...user , level2 : otherFieldValue, level3 : null, level4:null})
          navigate("/description")
        }else{
          setAlert(!alert)
          setAlertMessage(t("Please select an option"))
        }
      }
      }else{
        if(selected !== "other"){
          setUser({...user , level2 : selected})
          navigate("/description")
        }if(selected === "other"){
          if(otherFieldValue){
            setUser({...user , level2 : otherFieldValue})
            navigate("/description")
          }else{
            setAlert(!alert)
            setAlertMessage(t("Please select an option"))
          }
        }
      }
          
  }if(!selected){
    setAlert(!alert)
    setAlertMessage(t("Please select an option"))
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

