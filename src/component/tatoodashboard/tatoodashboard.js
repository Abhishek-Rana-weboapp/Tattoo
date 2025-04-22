import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CustomButton from "../buttons/CustomButton";
import Navigation from "../navigation/Navigation";
import GridLayout from "../Layout/GridLayout";
import { useTranslation } from "react-i18next";
import { tattooButtons } from "../../data/buttonChoices";

const renderButtons = (data, handleSelect, selected) => {
  if (data) {
    return Object.keys(data).map((key, index) => {
      return <CustomButton onClick={handleSelect} selected={selected} key={index} value={key}>
        {Object.keys(data[key]).length !== 0 && data[key].label}
      </CustomButton>
    });
  }
};


const renderInput = (handleInput, value) => {
  return (
    <input
      value={value}
      onChange={handleInput}
      type="text"
      placeholder="Enter your value"
      className="p-2 rounded-lg text-black"
    />
  );
};

function TattooDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser, alert, setAlert, setAlertMessage,currentSelection} =
    useContext(UserContext);
  const [selected, setSelected] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputOpen, setInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(1);


  const handlePrev = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelect = (value) => {
    if (value === "other") {
      setSelected((prev) => ({ ...prev, [currentStep]: value }));
      setInputOpen(true);
    } else {
      setInputOpen(false);
      setSelected((prev) => ({ ...prev, [currentStep]: value }));
    }
  };

  const levelObjects = {
    1: tattooButtons,
    2: tattooButtons[selected[1]]?.nextLevel ?? null,
    3: tattooButtons[selected[1]]?.nextLevel?.[selected[2]]?.nextLevel ?? null,
    4:
      tattooButtons[selected[1]]?.nextLevel?.[selected[2]]?.nextLevel?.[
        selected[3]
      ]?.nextLevel ?? null,
  };

  const handleInput = (e) => {
    setInputValue(e.target.value)
  };

  const switchFunction = () => {
    switch (currentStep) {
      case 1:
        setUser((prev) => ({
          ...prev,
          [currentStep]: selected[currentStep],
          2: null,
          3: null,
          4: null,
        }));
        break;
      case 2:
        if(selected[1]==="back" && selected[2]==="other"){
          setUser((prev) => ({
            ...prev,
            [currentStep]: inputValue,
            3: null,
            4: null,
          }));   
        }else{
          setUser((prev) => ({
            ...prev,
            [currentStep]: selected[currentStep],
            3: null,
            4: null,
          }));
        }
        break;
      case 3:
        setUser((prev) => ({
          ...prev,
          [currentStep]: selected[currentStep],
          4: null,
        }));
        break;
      case 4:
        setUser((prev) => ({ ...prev, [currentStep]: selected[currentStep] }));
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switchFunction();
    if (!selected[currentStep]) {
      setAlertMessage(t("Please select your tattoo location"));
      setAlert(!alert);
      return;
    } else if (!levelObjects[currentStep + 1] && selected[currentStep]) {
      navigate("/description");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    const { selectedTattooType, ...copyObject } = user;
    if (user[1] || user[2] || user[3] ||user[4]){
      setSelected({...copyObject});
    }

    return ()=>{
      setInputOpen(false)
    }
  }, [user]);


  useEffect(()=>{
    if(currentStep === 2){
      if(selected[currentStep] && selected[1] === "back"){
         if(!Object.keys(levelObjects).includes(selected[2])){
          let tempValue = selected[2]
           setInputValue(tempValue)
           setInputOpen(true)
           setSelected(prev=>({...prev, 2 : "other"}))
         }
      }
    }else{
      if(inputOpen){
        setInputOpen(false)
      }
    }
  },[currentStep])



  return (
    <>
      {" "}
      <GridLayout
        title={"Tattoo"}
        subTitle={`Please Select location for tattoo ${currentSelection}`}
      >
        {renderButtons(
          levelObjects[currentStep],
          handleSelect,
          selected[currentStep]
        )}
        {inputOpen && renderInput(handleInput, inputValue)}
      </GridLayout>
      <Navigation next={handleNext} prev={handlePrev} />
    </>
  );
}

export default TattooDashboard;
