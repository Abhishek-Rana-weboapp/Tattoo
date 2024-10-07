import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import GridLayout from '../Layout/GridLayout';
import CustomButton from '../buttons/CustomButton';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';

function VaginalPiercing() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, finalUser, setFinalUser,count, currentSelection, setCurrentSelection } = React.useContext(UserContext);
  const [selected , setSelected] = useState()
  const {t} = useTranslation()
  const [buttonHeight, setButtonHeight] = useState('auto');

  const buttonRef = useRef()

  useEffect(()=>{
    if(user[2]) setSelected(user[2])
     },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  }


  const buttons = [
    {
      name:"Christina 16g"
    },
    {
      name:"Vertical Hood 16g"
    },
    {
      name:"Horizontal Hood 16g"
    },
    {
      name:"Inner Labia 16g"
    },
    {
      name:"Outer Labia 16g"
    },
    {
      name:"Fourchette 16g"
    },
    {
      name:"Hymen 16g"
    },
    {
      name:"Isabella 16g"
    },
    {
      name:"Princess Albertina 16g"
    },
    {
      name:"Triangle 16g"
    }
  ]

  const handleNext = ()=>{
    if(selected){
      if(user[2] !== selected){
        setUser({ ...user, 2: selected, 3:null, 4:null});
        setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user[1] , level2: selected, level3: null, level4: null }}))
        if(currentSelection < count){
          setCurrentSelection(currentSelection + 1)
        }
        }else{
        setUser({ ...user, 2: selected});
        setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user[1] , level2: selected, level3: null, level4: null }}))
        if(currentSelection < count){
          setCurrentSelection(currentSelection + 1)
        }
        if(count > 1 && currentSelection < count){
          navigate("/piercing")
        }else{
          navigate("/medical-form")
        }
        }
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
    <GridLayout title={"vaginal piercing"}>
    {buttons?.map((button, index) => {
          return (
            <CustomButton key={index} def={buttonRef} buttonStyle={{ height: buttonHeight }} onClick={handlepartLocation} selected={selected}>
              {button.name}
            </CustomButton>
          );
        })}
    </GridLayout>
    <Navigation next={handleNext} prev={handlePrev} />
    </>
  
  );
}

export default VaginalPiercing;


