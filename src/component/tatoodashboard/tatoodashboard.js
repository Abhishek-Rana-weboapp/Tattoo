import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tattooBodyLocations } from "../../data/tattooLocations";
import NavigationButton from "../buttons/NavigationButton";
import { useAppointmentContext } from "../../context/AppointmentContext";
import TranslationWrapper from "../Layout/TranslationWrapper";
import { useTranslation } from "react-i18next";

function TattooDashboard({}) {
  const navigate = useNavigate();
  const { appointmentData, setAppointmentData, bodyLocation, setBodyLocation } =
    useAppointmentContext();
  const [step, setStep] = useState(1);
  const [selectionPath, setSelectionPath] = useState({});
  const { t } = useTranslation();

  // Helper: map an id/label value to a translated label using tattooBodyLocations
  const translateLocationValue = (value) => {
    // Find by id first; if not found, try by label
    const node =
      tattooBodyLocations.find((n) => n.id === value) ||
      tattooBodyLocations.find((n) => n.label === value);
    const labelKey = node?.label || String(value);
    return t(labelKey);
  };
  // const [bodyLocation, setBodyLocation] = useState({});
  const [currentSelectionIndex, setCurrentSelectionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const currentParentId = Object.values(selectionPath)[step - 2] || null;
  const currentOptions = tattooBodyLocations.filter(
    (item) => item.level === step && item.parentId === currentParentId,
  );

 const handleOptionClick = (option) => {
  // If option requires custom input (Other)
  if (option.requiresInput) {
    setSelectedOption(null); // no normal selection
    setShowOtherInput(true);
    return;
  }

  // Normal option
  setShowOtherInput(false); // reset if coming back from Other
  setSelectedOption(option);
};

  const goToNextTattooOrFinish = (updatedBodyLocation) => {
    if (currentSelectionIndex < appointmentData.count) {
      setCurrentSelectionIndex((prev) => prev + 1);
      setStep(1);
      setSelectionPath({});
      setSelectedOption(null);
      return;
    }

    setAppointmentData((prev) => ({
      ...prev,
      bodyLocation: JSON.stringify(updatedBodyLocation),
    }));

    navigate("/medical-form");
  };

  const saveCurrentSelection = (finalPath) => {
    const updatedBodyLocation = {
      ...bodyLocation,
      [currentSelectionIndex]: {
        ...finalPath,
        description,
      },
    };

    setBodyLocation(updatedBodyLocation);
    setDescription("");
    setShowDescriptionInput(false);

    goToNextTattooOrFinish(updatedBodyLocation);
  };

  const goToNextStep = (option) => {
    const updatedPath = {
      ...selectionPath,
      ["level" + step]: option.id,
    };

    setSelectionPath(updatedPath);
    setSelectedOption(null);

    const hasNext = tattooBodyLocations.some(
      (item) => item.parentId === option.id,
    );

    if (hasNext && step < 4) {
      setStep((prev) => prev + 1);
    } else {
      setShowDescriptionInput(true);
    }
  };

  const handleNext = () => {
    // 🚨 BLOCK: If entering custom "Other" value
    if (showOtherInput) {
      if (!otherValue.trim()) return;

      const updatedPath = {
        ...selectionPath,
        ["level" + step]: otherValue.trim(), // store custom value instead of id
      };

      setSelectionPath(updatedPath);
      setOtherValue("");
      setShowOtherInput(false);

      // after custom entry → treat it like leaf node
      setShowDescriptionInput(true);
      return;
    }

    if (!selectedOption && !showDescriptionInput) return;

    // 🚨 Saving final description
    if (showDescriptionInput) {
      if (!description.trim()) return;
      saveCurrentSelection(selectionPath);
      return;
    }

    // 🚨 Normal flow
    goToNextStep(selectedOption);
  };
  // const handleNext = () => {
  //   if (showDescriptionInput) {
  //     setBodyLocation((prev) => ({
  //       ...prev,
  //       [currentSelectionIndex]: {
  //         ...bodyLocation[currentSelectionIndex],
  //         description,
  //       },
  //     }));
  //     setDescription("");
  //     setShowDescriptionInput(false);

  //     if (currentSelectionIndex < appointmentData.count) {
  //       setCurrentSelectionIndex(currentSelectionIndex + 1);
  //       setStep(1);
  //       setSelectionPath({});
  //       setSelectedOption(null);
  //       return;
  //     }

  //     const updatedBodyLocation = {
  //       ...bodyLocation,
  //       [currentSelectionIndex]: {
  //         ...selectionPath,
  //         description,
  //       },
  //     };
  //     setAppointmentData((prev) => ({
  //       ...prev,
  //       bodyLocation: JSON.stringify(updatedBodyLocation),
  //     }));
  //     navigate("/medical-form");
  //     return;
  //   }

  //   if (!selectedOption) return;

  //   const updatedPath = {
  //     ...selectionPath,
  //     ["level" + step]: selectedOption.id,
  //   };
  //   setSelectionPath(updatedPath);
  //   setSelectedOption(null);

  //   const hasNext = tattooBodyLocations.some(
  //     (item) => item.parentId === selectedOption.id,
  //   );
  //   if (hasNext && step < 4) {
  //     setStep(step + 1);
  //   } else {
  //     setBodyLocation((prev) => ({
  //       ...prev,
  //       [currentSelectionIndex]: {
  //         ...updatedPath,
  //         description: "",
  //       },
  //     }));

  //     setShowDescriptionInput(true);
  //   }
  // };

  const handleBack = () => {
    if (currentSelectionIndex === 1 && step === 1) {
      navigate(-1);
      return;
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

  const handleDirectNext = () => {
    navigate("/medical-form");
    return;
  };

  console.log(showOtherInput)

  return (
    <div className="p-4 space-y-4 w-full max-w-3xl flex flex-col gap-2 h-screen ">
      <h1 className="text-white md:text-3xl text-xl uppercase font-bold text-center">
        <TranslationWrapper text={appointmentData.typeofservice} />
      </h1>
      <h2 className="md:text-xl font-semibold text-white uppercase text-center">
        <TranslationWrapper
          text={
            !showDescriptionInput
              ? `select location for tattoo`
              : `description of tattoo`
          }
        />
        {currentSelectionIndex}
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
            {showOtherInput && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">
                  Please specify the location:
                </label>
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
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
        <h3 className="text-lg mt-4">{t("Selections so far")}:</h3>
        <ul className="list-disc ml-6">
          {bodyLocation &&
            Object.entries(bodyLocation).map(([key, sel]) => {
              // Build parts excluding description and translate each
              const parts = Object.entries(sel)
                .filter(([k]) => k !== "description")
                .map(([, v]) => translateLocationValue(v));

              const displayKey = translateLocationValue(key);

              return (
                <li key={key} className="text-sm">
                  {displayKey}: {parts.join(" > ")}
                  {sel.description ? ` - ${sel.description}` : ""}
                </li>
              );
            })}
        </ul>
      </div>

      <div className="flex gap-2 mt-4 justify-between">
        <NavigationButton
          onClick={handleBack}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          {t("Back")}
        </NavigationButton>

        {bodyLocation &&
          Object.keys(bodyLocation).length === appointmentData.count &&
          currentSelectionIndex === 1 &&
          step === 1 && (
            <NavigationButton
              onClick={handleDirectNext}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              {t("Keep prev selection")}
            </NavigationButton>
          )}

        <NavigationButton
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={
            (!showDescriptionInput && !selectedOption && !showOtherInput) ||
            (showDescriptionInput && !description.trim()) ||
            (showOtherInput && !otherValue.trim())
          }
        >
          {showDescriptionInput ? t("Save") : t("Next")}
        </NavigationButton>
      </div>
    </div>
  );
}

export default TattooDashboard;
