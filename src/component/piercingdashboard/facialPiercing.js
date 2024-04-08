import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ProgressBar from "../ProgressBar";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";

function FacialPiercing() {
  const progressValue = 30;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, count, finalUser, setFinalUser, currentSelection,setCurrentSelection } =
    React.useContext(UserContext);
  const [selected, setSelected] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (user.level2) setSelected(user.level2);
  }, []);

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart);
  };

  const buttons = [
    {
      name: "Cheek 14g",
    },
    {
      name: "Eyebrow 16g",
    },
    {
      name: "sideburn 16g",
    },
  ];

  const handleNext = () => {
    if (selected) {
      if(user.level2 !== selected){
        setUser({ ...user, level2: selected, level3:null, level4:null});
        setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user.level1 , level2: selected, level3: null, level4: null }}))
        if(currentSelection < count){
          setCurrentSelection(currentSelection + 1)
        }
        }else{
          setUser({ ...user, level2: selected});
          setFinalUser(prev=>({...prev ,[currentSelection] : {level1 : user.level1 , level2: selected, level3: null, level4: null }}))
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
            <CustomButton
              key={index}
              onClick={handlepartLocation}
              selected={selected}
            >
              {button.name}
            </CustomButton>
          );
        })}
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
    </>
  );
}

export default FacialPiercing;
