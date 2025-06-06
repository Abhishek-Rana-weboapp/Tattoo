import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ProgressBar from "../ProgressBar";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";
import CustomPiercingButton from "../buttons/CustomPiercingButton";
function PiercingDashboard() {
  const { t } = useTranslation();
  const progressValue = 20;
  const navigate = useNavigate();
  const {
    user,
    setUser,
    alert,
    setAlert,
    setAlertMessage,
    finalUser,
    setFinalUser,
    currentSelection,
    setCurrentSelection,
    count,
  } = React.useContext(UserContext);
  const [selected, setSelected] = useState();

  const handpiercingLocation = (piercingLocation) => {
    setSelected(piercingLocation);
  };

  useEffect(() => {
    if (user[1]) {
      setSelected(user[1]);
    }
  }, []);

  const partButton = [
    {
      name: "Belly Piercing",
      value: "Belly Piercing 14g",
    },
    {
      name: "nipple-piercing",
      value: "nipple-piercing 14g",
    },
  ];

  const buttons = [
    {
      name: "ear-piercing",
      value: "ear-piercing",
    },
    {
      name: "facial-piercing",
      value: "facial-piercing",
    },
    {
      name: "jewelry-swap",
      value: "jewelry-swap",
    },
    {
      name: "nose-piercing",
      value: "nose-piercing",
    },
    {
      name: "oral-piercing",
      value: "oral-piercing",
    },
    {
      name: "surface-piercing",
      value: "surface-piercing",
    },
    {
      name: "vaginal-piercing",
      value: "vaginal-piercing",
    },
  ];

  const handleNext = () => {
    if (selected) {
      if (partButton.find((item) => item.value === selected)) {
        if (user[1] !== selected) {
          setUser({
            ...user,
            1: selected,
            2: null,
            3: null,
            4: null,
          });
          setFinalUser({
            ...finalUser,
            [currentSelection]: {
              level1: selected,
              level2: null,
              level3: null,
              level4: null,
            },
          });
          if (currentSelection < count) {
            setCurrentSelection(currentSelection + 1);
          }
        } else {
          setUser({ ...user, 1: selected });
          setFinalUser({
            ...finalUser,
            [currentSelection]: {
              level1: selected,
              level2: null,
              level3: null,
              level4: null,
            },
          });
          if (count < currentSelection) {
            setCurrentSelection(currentSelection + 1);
          }
        }
        if (count > 1 && currentSelection < count) {
          navigate("/piercing");
          return;
        } else {
          navigate("/medical-form");
          return;
        }
      }
      if (buttons.find((item) => item.name === selected))
        if (user.level1 !== selected) {
          setUser({
            ...user,
            1: selected,
            2: null,
            3: null,
            4: null,
          });
        } else {
          setUser({ ...user, 1: selected });
        }
      navigate(`/${selected}`);
      return;
    } else {
      setAlert(!alert);
      setAlertMessage(t("Please select an option"));
    }
  };

  const handlePrev = () => {
    if(currentSelection > 1){
      setCurrentSelection(currentSelection - 1);
    }
    navigate(-1);
  };

  console.log(currentSelection)

  return (
    <>
      <GridLayout
        title={"piercing"}
        subTitle={`Please Select location for piercing ${currentSelection}`}
      >
        {partButton.map((button, index) => {
          return (
            <CustomPiercingButton
              key={button.name}
              onClick={() => handpiercingLocation(button.value)}
              selected={selected}
              value={button.value}
            >
              {button.name}
            </CustomPiercingButton>
          );
        })}
        {buttons.map((button, index) => {
          return (
            <CustomButton
              key={index}
              onClick={handpiercingLocation}
              selected={selected}
              value={button.value}
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
