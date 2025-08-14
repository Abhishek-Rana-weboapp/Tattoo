import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { tattooBodyLocations } from "../../data/tattooLocations";
import NavigationButton from "../buttons/NavigationButton";
import { useAppointmentContext } from "../../context/AppointmentContext";
import TranslationWrapper from "../Layout/TranslationWrapper";
import { useTranslation } from "react-i18next";

function TattooDashboard({}) {
  const navigate = useNavigate()
  const {appointmentData, setAppointmentData, bodyLocation, setBodyLocation } = useAppointmentContext()
  const [step, setStep] = useState(1);
  const [selectionPath, setSelectionPath] = useState({});
  const {t} = useTranslation()
  // const [bodyLocation, setBodyLocation] = useState({});
  const [currentSelectionIndex, setCurrentSelectionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState("");

  const currentParentId = Object.values(selectionPath)[step - 2] || null;
  const currentOptions = tattooBodyLocations.filter(
    (item) => item.level === step && item.parentId === currentParentId
  );


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (showDescriptionInput) {
      setBodyLocation((prev) => ({
        ...prev,
        [currentSelectionIndex]: {
          ...bodyLocation[currentSelectionIndex],
          description,
        },
      }));
      setDescription("");
      setShowDescriptionInput(false);

      if (currentSelectionIndex < appointmentData.count) {
        setCurrentSelectionIndex(currentSelectionIndex + 1);
        setStep(1);
        setSelectionPath({});
        setSelectedOption(null);
        return;
      }

      const updatedBodyLocation = {
        ...bodyLocation, [currentSelectionIndex] : {
          ...selectionPath, description
        }
      }
      setAppointmentData((prev)=>({
       ...prev, bodyLocation: JSON.stringify(updatedBodyLocation)
      }))
      navigate("/medical-form")
      return;
    }

    if (!selectedOption) return;

    const updatedPath = {
      ...selectionPath,
      ["level" + step]: selectedOption.id,
    };
    setSelectionPath(updatedPath);
    setSelectedOption(null);

    const hasNext = tattooBodyLocations.some(
      (item) => item.parentId === selectedOption.id
    );
    if (hasNext && step < 4) {
      setStep(step + 1);
    } else {
      setBodyLocation((prev) => ({
        ...prev,
        [currentSelectionIndex]: {
          ...updatedPath,
          description: "",
        },
      }));

      setShowDescriptionInput(true);
    }
  };


  const handleBack = () => {
    if(currentSelectionIndex === 1 && step === 1){
      navigate(-1)
      return
    }

    if (showDescriptionInput) {
      setShowDescriptionInput(false);
      return;
    }

    if (step > 1) {
      const updatedPath = { ...selectionPath };
      delete updatedPath["level" + step];
      setSelectionPath(updatedPath);
      setStep(step - 1);
    } else if (step === 1 && currentSelectionIndex > 1) {
      const prevIndex = currentSelectionIndex - 1;
      const prevSelection = bodyLocation[prevIndex];
      if (prevSelection) {
        const { description: prevDesc, ...pathOnly } = prevSelection;
        setSelectionPath(pathOnly);
        setDescription(prevDesc || "");
        setStep(Object.keys(pathOnly).length);
        setCurrentSelectionIndex(prevIndex);
        setSelectedOption(null);
      }
    }
  };

  const handleDirectNext = ()=>{
    navigate("/medical-form")
    return 
  }



  return (
    <div className="p-4 space-y-4 w-full max-w-3xl flex flex-col gap-2 h-screen ">
      <h1 className="text-white md:text-3xl text-xl uppercase font-bold text-center"><TranslationWrapper text={appointmentData.typeofservice} /></h1>
      <h2 className="md:text-xl font-semibold text-white uppercase text-center">
        <TranslationWrapper text={`Select location for Tattoo ${currentSelectionIndex}`} />
      </h2>

      {!showDescriptionInput ? (
        <div className="flex-1">
          <div className="grid grid-cols-2 md:gap-x-10 gap-x-2 gap-y-5 w-full  ">
            {currentOptions.map((option) => (
              <button
                key={option.id}
                className={`px-4 py-2 rounded-lg w-full font-bold md:text-2xl uppercase select-none ${
                  selectedOption?.id === option.id
                    ? "bg-gradient-to-b from-white to-yellow-400 to-10%"
                    : "bg-[#e8e2e3] hover:bg-gradient-to-b from-white to-yellow-400 to-10%"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                
                {t(option.label)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Enter description for this selection:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

         <div className="text-white">
        <h3 className="text-lg mt-4">Selections So Far:</h3>
        <ul className="list-disc ml-6">
          {bodyLocation && Object.entries(bodyLocation).map(([key, sel]) => (
            <li key={key} className="text-sm">
              {key}:{" "}
              {Object.values(sel)
                .filter((v, i, arr) => i < arr.length - 1)
                .join(" > ")}
              {sel.description ? ` - ${sel.description}` : ""}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 mt-4 justify-between">
          <NavigationButton
            onClick={handleBack}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Back
          </NavigationButton>

          {bodyLocation && Object.keys(bodyLocation).length === appointmentData.count && currentSelectionIndex === 1 && step ===1 && <NavigationButton
            onClick={handleDirectNext}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Keep prev selection
          </NavigationButton>}

        <NavigationButton
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!showDescriptionInput && !selectedOption}
        >
          {showDescriptionInput ? "Save" : "Next"}
        </NavigationButton>
      </div>
    </div>
  );
}

export default TattooDashboard


// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../context/UserContext";
// import CustomButton from "../buttons/CustomButton";
// import Navigation from "../navigation/Navigation";
// import GridLayout from "../Layout/GridLayout";
// import { useTranslation } from "react-i18next";
// import { tattooButtons } from "../../data/buttonChoices";

// const renderButtons = (data, handleSelect, selected) => {
//   if (data) {
//     return Object.keys(data).map((key, index) => {
//       return <CustomButton onClick={handleSelect} selected={selected} key={index} value={key}>
//         {Object.keys(data[key]).length !== 0 && data[key].label}
//       </CustomButton>
//     });
//   }
// };


// const renderInput = (handleInput, value) => {
//   return (
//     <input
//       value={value}
//       onChange={handleInput}
//       type="text"
//       placeholder="Enter your value"
//       className="p-2 rounded-lg text-black"
//     />
//   );
// };

// function TattooDashboard() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { user, setUser, alert, setAlert, setAlertMessage,currentSelection} =
//     useContext(UserContext);
//   const [selected, setSelected] = useState({
//     1: null,
//     2: null,
//     3: null,
//     4: null,
//   });

//   const [inputOpen, setInputOpen] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [currentStep, setCurrentStep] = useState(1);


//   const handlePrev = () => {
//     if (currentStep === 1) {
//       navigate(-1);
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSelect = (value) => {
//     if (value === "other") {
//       setSelected((prev) => ({ ...prev, [currentStep]: value }));
//       setInputOpen(true);
//     } else {
//       setInputOpen(false);
//       setSelected((prev) => ({ ...prev, [currentStep]: value }));
//     }
//   };

//   const levelObjects = {
//     1: tattooButtons,
//     2: tattooButtons[selected[1]]?.nextLevel ?? null,
//     3: tattooButtons[selected[1]]?.nextLevel?.[selected[2]]?.nextLevel ?? null,
//     4:
//       tattooButtons[selected[1]]?.nextLevel?.[selected[2]]?.nextLevel?.[
//         selected[3]
//       ]?.nextLevel ?? null,
//   };

//   const handleInput = (e) => {
//     setInputValue(e.target.value)
//   };

//   const switchFunction = () => {
//     switch (currentStep) {
//       case 1:
//         setUser((prev) => ({
//           ...prev,
//           [currentStep]: selected[currentStep],
//           2: null,
//           3: null,
//           4: null,
//         }));
//         break;
//       case 2:
//         if(selected[1]==="back" && selected[2]==="other"){
//           setUser((prev) => ({
//             ...prev,
//             [currentStep]: inputValue,
//             3: null,
//             4: null,
//           }));   
//         }else{
//           setUser((prev) => ({
//             ...prev,
//             [currentStep]: selected[currentStep],
//             3: null,
//             4: null,
//           }));
//         }
//         break;
//       case 3:
//         setUser((prev) => ({
//           ...prev,
//           [currentStep]: selected[currentStep],
//           4: null,
//         }));
//         break;
//       case 4:
//         setUser((prev) => ({ ...prev, [currentStep]: selected[currentStep] }));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleNext = () => {
//     switchFunction();
//     if (!selected[currentStep]) {
//       setAlertMessage(t("Please select your tattoo location"));
//       setAlert(!alert);
//       return;
//     } else if (!levelObjects[currentStep + 1] && selected[currentStep]) {
//       navigate("/description");
//     } else {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   useEffect(() => {
//     const { selectedTattooType, ...copyObject } = user;
//     if (user[1] || user[2] || user[3] ||user[4]){
//       setSelected({...copyObject});
//     }

//     return ()=>{
//       setInputOpen(false)
//     }
//   }, [user]);


//   useEffect(()=>{
//     if(currentStep === 2){
//       if(selected[currentStep] && selected[1] === "back"){
//          if(!Object.keys(levelObjects).includes(selected[2])){
//           let tempValue = selected[2]
//            setInputValue(tempValue)
//            setInputOpen(true)
//            setSelected(prev=>({...prev, 2 : "other"}))
//          }
//       }
//     }else{
//       if(inputOpen){
//         setInputOpen(false)
//       }
//     }
//   },[currentStep])



//   return (
//     <>
//       {" "}
//       <GridLayout
//         title={"Tattoo"}
//         subTitle={`Please Select location for tattoo ${currentSelection}`}
//       >
//         {renderButtons(
//           levelObjects[currentStep],
//           handleSelect,
//           selected[currentStep]
//         )}
//         {inputOpen && renderInput(handleInput, inputValue)}
//       </GridLayout>
//       <Navigation next={handleNext} prev={handlePrev} />
//     </>
//   );
// }

// export default TattooDashboard;
