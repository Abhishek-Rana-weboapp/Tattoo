import { useEffect, useState } from "react";
import SkinCondition from "./skinCondition";
import Timer from "./timer/Timer";
import PriceComponent from "./sub-Components/billing/PriceComponent";
import {useParams} from "react-router-dom";
import ShowBill from "./sub-Components/billing/ShowBill";
import UploadAfterImage from "./sub-Components/billing/UploadAfterImage";
import CompleteAgreement from "./sub-Components/billing/CompleteAgreement";
import UploadBeforeImage from "./sub-Components/billing/UploadBeforeImage";
import LoaderModal from "./modal/LoaderModal";
import Complications from "./artistDashboard/Complications";
import TattooStyles from "./artistDashboard/TattooStyles";
import { useAppointmentContext } from "../context/AppointmentContext";

const BillingComponent = () => {
  const {appointment, setAppointment} = useAppointmentContext()
  let { step } = useParams();
  const [loading, setLoading] = useState(false);
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


  if (loading) {
    return <LoaderModal />;
  }


  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
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

      {currentStep === 4 && (
        <div className="flex flex-col items-center w-full h-full gap-3">
          <Timer
          />
        </div>
      )}

      {currentStep === 5 && (
        <ShowBill/>
      )}
      
      {currentStep === 6 && (
        <Complications
        />
      )}

      {currentStep === 7 && (
        <TattooStyles
        />
      )}

      {currentStep === 8 && (
        <UploadAfterImage
        />
      )}

      {currentStep === 9 && (
        <CompleteAgreement
        />
      )}
    </div>
  );
};

export default BillingComponent;
