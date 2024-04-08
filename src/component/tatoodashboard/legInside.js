import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";

function LegInside({}) {
  const progressValue = 45;
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } =
    React.useContext(UserContext);
  const [selected, setSelected] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (user.level4) setSelected(user.level4);
  }, []);

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart);
  };

  const halfButton = [
    {
      name: "upper",
    },
    {
      name: "lower",
    },
  ];

  const ankleButtons = [
    {
      name: "full",
    },
    {
      name: "inner",
    },
    {
      name: "outer",
    },
    {
      name: "front",
    },
    {
      name: "back",
    },
  ];

  const thighButton = [
    {
      name: "inner",
    },
    {
      name: "outer",
    },
    {
      name: "front",
    },
    {
      name: "back",
    },
  ];

  const kneeButtons = [
    {
      name: "front",
    },
    {
      name: "back",
    },
  ];

  const handleNext = () => {
    if (selected) {
      setUser({ ...user, level4: selected });
      navigate("/description");
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
      <GridLayout title={user.level3}>
        {user.level3 === "ankle" &&
          ankleButtons.map((button, index) => {
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

        {user.level3 === "half sleeve" &&
          halfButton.map((button, index) => {
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
        {user.level3 === "knee" &&
          kneeButtons.map((button, index) => {
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
        {user.level3 === "thigh" &&
          thighButton.map((button, index) => {
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
        {user.level3 === "lower leg" &&
          thighButton.map((button, index) => {
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

export default LegInside;
