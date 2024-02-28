import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import GridLayout from "../Layout/GridLayout";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import { useTranslation } from "react-i18next";

function ArmInside() {
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage } = React.useContext(UserContext);
  const { state } = useLocation();
  const [selected, setSelected] = useState()
  const {t} = useTranslation()

    useEffect(()=>{
      if(user.level4) setSelected(user.level4)
  },[])

  const handlepartLocation = (bodyPart) => {
    setSelected(bodyPart)
  };
  
  const halfButtons = [
    {
      name:"upper"
    },
    {
      name:"lower"
    },
  ]
  const upperButtons = [
    {
      name: "Inner",
    },
    {
      name: "Outer",
    },
    {
      name: "Front",
    },
    {
      name: "Back",
    },
  ];

  const elbowButtons = [
    {
      name: "Inner",
    },
    {
      name: "Outer",
    },
  ];

  const commonButtons = [
    {
      name: "Inner",
    },
    {
      name: "Outer",
    },
    {
      name: "Side",
    },
  ];

  const handleNext = ()=>{
    if(selected){
      setUser({ ...user, level4:selected });
      navigate('/description');
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
    {state.name === "half sleeve" && (
        <>
          <GridLayout title={"half sleeve" }>
            {halfButtons.map((button, index) => {
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
        </>
      )}
      {state.name === "upper arm" && (
        <>
          <GridLayout title={"upper arm" }>
            {upperButtons.map((button, index) => {
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
        </>
      )}
      {state.name === "elbow" && (
        <>
          <GridLayout title={"elbow"}>
            {elbowButtons.map((button, index) => {
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
        </>
      )}
      {(state.name === "forearm" || state.name === "wrist") && (
        <>
          <GridLayout title={state.name === "forearm" ? "forearm" : "wrist"}>
            {commonButtons.map((button, index) => {
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
        </>
      )}
      <Navigation next={handleNext}  prev={handlePrev} />
    </>
  );
}
export default ArmInside;


