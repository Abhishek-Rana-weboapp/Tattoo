import { useEffect, useState } from "react";
import SkinCondition from "./skinCondition";
import Timer from "./timer/Timer";
import PriceComponent from "./sub-Components/billing/PriceComponent";
import {useParams} from "react-router-dom";
import ShowBill from "./sub-Components/billing/ShowBill";
import UploadAfterImage from "./sub-Components/billing/UploadAfterImage";
import CompleteAgreement from "./sub-Components/billing/CompleteAgreement";
import UploadBeforeImage from "./sub-Components/billing/UploadBeforeImage";
import Complications from "./artistDashboard/Complications";
import TattooStyles from "./artistDashboard/TattooStyles";
import { useAppointmentContext } from "../context/AppointmentContext";
import PiercingTypeSelection from "./artistDashboard/PiercingTypeSelection";

const BillingComponent = () => {
  const {appointment, setAppointment, clientPhoneNumber} = useAppointmentContext()
  let { step } = useParams();
  const [currentStep, setCurrentStep] = useState();

  useEffect(()=>{
    setCurrentStep(parseInt(step) || 1);
  },[appointment, step])


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (currentStep === 4 && !appointment.endTime) {
        const message =
          "You have unsaved data. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    const handlePopstate = (event) => {
      if (currentStep === 4 && !appointment.endTime) {
        const message =
          "You have unsaved data. Are you sure you want to leave?";
        const isConfirmed = window.confirm(message);

        if (!isConfirmed) {
          event.preventDefault();
        }
      }
    };

    const handleBeforeReload = (event) => {
      if (currentStep === 4 && !appointment?.endTime) {
        const message =
          "You have unsaved data. Reloading will discard your changes. Are you sure?";
        const isConfirmed = window.confirm(message);

        if (!isConfirmed) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("beforeunload", handleBeforeReload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("beforeunload", handleBeforeReload);
    };
  }, [currentStep, appointment?.endTime]);



  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
      <div className="flex gap-3 ">
         <div>
           <label className="font-medium" htmlFor="">FirstName:</label>
           <p>{appointment?.firstName}</p>
         </div>
          <div>
           <label className="font-medium" htmlFor="">LastName:</label>
           <p>{appointment?.lastName}</p>
         </div>
          <div>
           <label className="font-medium" htmlFor="">PhoneNumber:</label>
           <p>{clientPhoneNumber ? clientPhoneNumber : ""}</p>
         </div>
      </div>

      <h1 className="text-3xl uppercase font-bold mb-4">{appointment?.typeofservice}</h1>
      {currentStep === 1 && (
        <PriceComponent/>
      )}

      {currentStep === 2 && (
        <SkinCondition
        />
      )}

      {currentStep === 3 && (
          <UploadBeforeImage/>
      )}
      {
        currentStep === 4 && (
          <PiercingTypeSelection
          />
        )
      }

      {currentStep === 5 && (
        <div className="flex flex-col items-center w-full h-full gap-3">
          <Timer
          />
        </div>
      )}

      {currentStep === 6 && (
        <ShowBill/>
      )}
      
      {currentStep ===7 && (
        <Complications
        />
      )}

      {currentStep === 8 && (
        <TattooStyles
        />
      )}

      {currentStep === 9 && (
        <UploadAfterImage
        />
      )}

      {currentStep === 10 && (
        <CompleteAgreement
        />
      )}
    </div>
  );
};

export default BillingComponent;
