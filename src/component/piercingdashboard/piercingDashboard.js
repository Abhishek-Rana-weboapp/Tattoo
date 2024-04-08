import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ProgressBar from "../ProgressBar";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";
function PiercingDashboard() {
  const { t } = useTranslation();
  const progressValue = 20;
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage, finalUser, setFinalUser, currentSelection,setCurrentSelection, count} =
    React.useContext(UserContext);
  const [selected, setSelected] = useState();

  const handpiercingLocation = (piercingLocation) => {
    setSelected(piercingLocation);
  };

  useEffect(() => {
    if (user.level1) {
      setUser((prev) => ({ ...prev, level1: user.level1 }));
    }
  }, []);

  const partButton = [
    {
      name: "Belly Piercing",
    },
    {
      name: "nipple-piercing",
    },
  ];

  const buttons = [
    {
      name: "ear-piercing",
    },
    {
      name: "facial-piercing",
    },
    {
      name: "jewelry-swap",
    },
    {
      name: "nose-piercing",
    },
    {
      name: "oral-piercing",
    },
    {
      name: "surface-piercing",
    },
    {
      name: "vaginal-piercing",
    },
  ];

  const handleNext = () => {
    console.log("1")
    if (selected) {
    console.log("2")

      if (partButton.find((item) => item.name === selected)) {
    console.log("3")
        if (user.level1 !== selected) {
    console.log("4")

          setUser({
            ...user,
            level1: selected,
            level2: null,
            level3: null,
            level4: null,
          });
          setFinalUser({...finalUser,[currentSelection] : {level1 : selected, level2 : null, level3:null, level4:null}})
          if(currentSelection < count){
          console.log("5")

            setCurrentSelection(currentSelection+1)
          }
        } else {
    console.log("6")

          setUser({ ...user, level1: selected });
          setFinalUser({...finalUser,[currentSelection] : {level1 : selected, level2 : null, level3:null, level4:null}})
          if(count < currentSelection){
    console.log("7")

            setCurrentSelection(currentSelection+1)
          }
        }
        if(count  > 1 && currentSelection < count){
    console.log("8")

          navigate("/piercing")
          return
        }else{
          console.log("9")
          navigate("/medical-form");
          return
        }
      }
      if (buttons.find((item) => item.name === selected))
      if (user.level1 !== selected) {
        setUser({
          ...user,
          level1: selected,
          level2: null,
          level3: null,
          level4: null,
        });
      } else {
        setUser({ ...user, level1: selected });
      }
      navigate(`/${selected}`);
      return;
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
      <GridLayout title={"piercing"}>
        {partButton.map((button, index) => {
          return (
            <CustomButton
              key={button.name}
              onClick={handpiercingLocation}
              selected={selected}
            >
              {button.name}
            </CustomButton>
          );
        })}
        {buttons.map((button, index) => {
          return (
            <CustomButton
              key={index}
              onClick={handpiercingLocation}
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

export default PiercingDashboard;
