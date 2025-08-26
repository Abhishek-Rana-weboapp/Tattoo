import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { piercingBodyLocations } from "../../data/tattooLocations";
import NavigationButton from "../buttons/NavigationButton";
import { useAppointmentContext } from "../../context/AppointmentContext";
import TranslationWrapper from "../Layout/TranslationWrapper";

function PiercingDashboard() {
  const navigate = useNavigate();
  const { appointmentData, setAppointmentData, bodyLocation, setBodyLocation } = useAppointmentContext();
  const [step, setStep] = useState(1);
  const [selectionPath, setSelectionPath] = useState({});
  const [currentSelectionIndex, setCurrentSelectionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentParentId = Object.values(selectionPath)[step - 2] || null;
  const currentOptions = piercingBodyLocations.filter(
    (item) => item.level === step && item.parentId === currentParentId
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const updatedPath = {
      ...selectionPath,
      ["level" + step]: selectedOption.id,
    };
    setSelectionPath(updatedPath);
    setSelectedOption(null);

    const hasNext = piercingBodyLocations.some(
      (item) => item.parentId === selectedOption.id
    );

    if (hasNext && step < 4) {
      setStep(step + 1);
    } else {
      setBodyLocation((prev) => ({
        ...prev,
        [currentSelectionIndex]: updatedPath,
      }));

      if (currentSelectionIndex < appointmentData.count) {
        setCurrentSelectionIndex(currentSelectionIndex + 1);
        setStep(1);
        setSelectionPath({});
      } else {
        setAppointmentData((prev) => ({
          ...prev,
          bodyLocation: JSON.stringify({
            ...bodyLocation,
            [currentSelectionIndex]: updatedPath,
          }),
        }));
        navigate("/medical-form");
      }
    }
  };

  const handleBack = () => {
    if (currentSelectionIndex === 1 && step === 1) {
      navigate(-1);
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
        setSelectionPath(prevSelection);
        setStep(Object.keys(prevSelection).length);
        setCurrentSelectionIndex(prevIndex);
        setSelectedOption(null);
      }
    }
  };

  const handleDirectNext = () => {
    navigate("/medical-form");
  };

  return (
    <div className="p-4 space-y-4 w-full max-w-3xl flex flex-col gap-2 h-screen ">
      <h1 className="text-white md:text-3xl text-xl uppercase font-bold text-center">
        <TranslationWrapper text={appointmentData.typeofservice} />
      </h1>
      <h2 className="md:text-xl font-semibold text-white uppercase text-center">
        <TranslationWrapper text={`Select location for Piercing ${currentSelectionIndex}`} />
      </h2>

      <div className="flex-1">
        <div className="grid grid-cols-2 md:gap-x-10 gap-x-2 gap-y-5 w-full">
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
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="text-white">
        <h3 className="text-lg mt-4">Selections So Far:</h3>
        <ul className="list-disc ml-6">
          {bodyLocation &&
            Object.entries(bodyLocation).map(([key, sel]) => (
              <li key={key} className="text-sm">
                {key}:{" "}
                {Object.values(sel).join(" > ")}
              </li>
            ))}
        </ul>
      </div> */}

      <div className="flex gap-2 mt-4 justify-between">
        <NavigationButton
          onClick={handleBack}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Back
        </NavigationButton>

        {bodyLocation &&
          Object.keys(bodyLocation).length === appointmentData.count &&
          currentSelectionIndex === 1 &&
          step === 1 && (
            <NavigationButton
              onClick={handleDirectNext}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Keep prev selection
            </NavigationButton>
          )}

        <NavigationButton
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!selectedOption}
        >
          Next
        </NavigationButton>
      </div>
    </div>
  );
}

export default PiercingDashboard;



