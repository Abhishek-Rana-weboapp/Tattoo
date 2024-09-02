import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useTranslation } from "react-i18next";
import SkinCondition from "./skinCondition";
import { apiUrl } from "../url";
import Timer from "./timer/Timer";
import PriceComponent from "./sub-Components/billing/PriceComponent";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ShowBill from "./sub-Components/billing/ShowBill";
import UploadAfterImage from "./sub-Components/billing/UploadAfterImage";
import CompleteAgreement from "./sub-Components/billing/CompleteAgreement";
import { decodeUrls, encodeUrls } from "../commonFunctions/Encoders";
import UploadBeforeImage from "./sub-Components/billing/UploadBeforeImage";
import LoaderModal from "./modal/LoaderModal";
import Complications from "./artistDashboard/Complications";
import { AUTHHEADERS } from "../commonFunctions/Headers";
import TattooStyles from "./artistDashboard/TattooStyles";

const BillingComponent = () => {
  let { id, step } = useParams();
  const {
    setAlert,
    setAlertMessage,
    alert,
    updateAppointment,
    setUpdateAppointment,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState();
  const [bill, setBill] = useState({});
  const [resultantMinutes, setResultantMinutes] = useState();

  const selectedAppointment = JSON.parse(
    sessionStorage.getItem("selectedAppointment")
  );

  const fetchAppointment = async () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/artist/appointment_list_id?id=${id}`, {
        headers: AUTHHEADERS(),
      })
      .then((res) => {
        sessionStorage.setItem(
          "selectedAppointment",
          JSON.stringify(res.data.data[0])
        );
        setLoading(false);
        setUpdateAppointment(res.data.data[0]);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage(t("Something went wrong"));
        setAlert(!alert);
        return;
      });
  };

  useEffect(() => {
    setCurrentStep(parseInt(step) || 1);
    fetchAppointment();
  }, [step, id]);

  useEffect(() => {
    if (selectedAppointment) {
      setUpdateAppointment(selectedAppointment);
    } else {
      navigate("/artist-dashboard");
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (currentStep === 4 && !updateAppointment.end_time) {
        const message =
          "You have unsaved data. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    const handlePopstate = (event) => {
      if (currentStep === 4 && !updateAppointment.end_time) {
        const message =
          "You have unsaved data. Are you sure you want to leave?";
        const isConfirmed = window.confirm(message);

        if (!isConfirmed) {
          event.preventDefault();
        }
      }
    };

    const handleBeforeReload = (event) => {
      if (currentStep === 4 && !updateAppointment?.end_time) {
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
  }, [currentStep, updateAppointment?.end_time]);

  const handlePrev = () => {
    switch (currentStep) {
      case 1:
        navigate("/artist-dashboard");
        break;
      case 2:
        navigate(`/billing/${updateAppointment?.id}/1`);
        break;

      case 3:
        navigate(`/billing/${updateAppointment?.id}/2`);
        break;

      case 4:
        if (updateAppointment?.typeofservice === "tattoo") {
          navigate(`/billing/${updateAppointment?.id}/3`);
          break;
        } else {
          navigate(`/billing/${updateAppointment?.id}/2`);
          break;
        }

      case 5:
        navigate(`/billing/${updateAppointment?.id}/4`);
        break;

      case 6:
        navigate(`/billing/${updateAppointment?.id}/5`);
        break;

      case 7:
        navigate(`/billing/${updateAppointment?.id}/6`);
        break;

      case 8:
        navigate(`/billing/${updateAppointment?.id}/7`);
        break;

        case 9:
        navigate(`/billing/${updateAppointment?.id}/8`);
        break;
    }
  };

  useEffect(() => {
    if (updateAppointment?.start_time && updateAppointment?.end_time) {
      const startTime = new Date(updateAppointment.start_time);
      const endTime = new Date(updateAppointment.end_time);
      setResultantMinutes(Math.floor((endTime - startTime) / 1000));
    }
  }, [updateAppointment]);

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
      {currentStep === 1 && (
        <PriceComponent
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}

      {currentStep === 2 && (
        <SkinCondition
          handlePrev={handlePrev}
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
        />
      )}

      {currentStep === 3 && (
        <>
          <UploadBeforeImage
            handlePrev={handlePrev}
            updateAppointment={updateAppointment}
            setUpdateAppointment={setUpdateAppointment}
          />
        </>
      )}

      {currentStep === 4 && (
        <div className="flex flex-col items-center w-full h-full gap-3">
          <Timer
            updateAppointment={updateAppointment}
            setUpdateAppointment={setUpdateAppointment}
            bill={bill}
            setBill={setBill}
            handlePrev={handlePrev}
          />
        </div>
      )}

      {currentStep === 5 && (
        <ShowBill
          bill={bill}
          setBill={setBill}
          resultantMinutes={resultantMinutes}
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}
      {currentStep === 6 && (
        <Complications
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}

      {currentStep === 7 && (
        <TattooStyles
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}

      {currentStep === 8 && (
        <UploadAfterImage
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}

      {currentStep === 9 && (
        <CompleteAgreement
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
};

export default BillingComponent;
