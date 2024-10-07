import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ProgressBar from "../ProgressBar";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";
import CustomPiercingButton from "../buttons/CustomPiercingButton";

function FacialPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, count, finalUser, setFinalUser, currentSelection,setCurrentSelection } =
    React.useContext(UserContext);
  const [selected, setSelected] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (user[2]) setSelected(user[2]);
  }, []);

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart);
  };

  const buttons = [
    {
      name: "Cheek",
      value: "Cheek 14g",
    },
    {
      name: "Eyebrow",
      value: "Eyebrow 16g",
    },
    {
      name: "sideburn",
      value: "sideburn 16g",
    },
  ];

  const handleNext = () => {
    if (selected) {
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
        }
      if(count > 1 && currentSelection < count){
          navigate("/piercing")
      }else{
          navigate("/medical-form")
      }
    } else {
      setAlert(!alert);
      setAlertMessage(t("Please select an option"));
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <>
      <GridLayout title={"facial piercing"}>
        {buttons.map((button, index) => {
          return (
            <CustomPiercingButton
              key={index}
              onClick={()=>handlepartLocation(button.value)}
              selected={selected}
              value={button.value}
            >
              {button.name}
            </CustomPiercingButton>
          );
        })}
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
    </>
  );
}

export default FacialPiercing;
