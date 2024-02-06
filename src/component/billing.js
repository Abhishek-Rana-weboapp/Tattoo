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

const BillingComponent = () => {
  let { id, step } = useParams();
  const {
    setIsVisible,
    setAlert,
    setAlertMessage,
    alert,
    updateAppointment,
    setUpdateAppointment,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState();
  const [currentStep, setCurrentStep] = useState();
  const [bill, setBill] = useState({});
  const [resultantMinutes, setResultantMinutes] = useState();
  const artistLogged = sessionStorage.getItem("fullname");

  const selectedAppointment = JSON.parse(
    sessionStorage.getItem("selectedAppointment")
  );

  const fetchAppointment = async () => {
    axios
      .get(`${apiUrl}/artist/appointment_list_id?id=${id}`)
      .then((res) => {
        console.log(res)
        sessionStorage.setItem(
          "selectedAppointment",
          JSON.stringify(res.data.data[0])
        );
        setUpdateAppointment(res.data.data[0])
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCurrentStep(parseInt(step) || 1);
    fetchAppointment();
  }, [step, id]);

  useEffect(() => {
    setIsVisible(true);
    if (selectedAppointment) {
      setUpdateAppointment(selectedAppointment);
    } else {
      navigate("/artist-dashboard");
    }
  }, []);

  useEffect(() => {
    if (updateAppointment) {
      setBillingData((prev) => ({
        ...prev,
        bill_by: artistLogged,
        username: updateAppointment?.username,
        id: updateAppointment?.id,
      }));
    }
  }, [updateAppointment]);

  const [billingData, setBillingData] = useState({
    username: "",
    id: "",
    price: 0,
    fix: "",
    before_image: "",
    after_image: "",
    start_time: "",
    end_time: "",
    break_time: "",
    bill_by: "",
    video_url: "",
  });

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
      if (currentStep === 4 && !updateAppointment.end_time) {
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
  }, [currentStep, billingData.end_time]);

  const [uploadedImages, setUploadedImages] = useState({
    before_image: null,
    after_image: null,
  });

  const [finalPrice, setFinalPrice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePrice = (name, value) => {
    setBillingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSkin = async (option, explanation, field) => {
    let data;
    if (option) {
      if (option === "good") {
        data = {
          updates: [
            {
              id: updateAppointment?.id,
              updateField: field,
              updateValue: option,
            },
          ],
        };
      }
      if (option === "bad") {
        if (explanation) {
          data = {
            updates: [
              {
                id: updateAppointment?.id,
                updateField: field,
                updateValue: explanation,
              },
            ],
          };
        } else {
          setAlert(!alert);
          setAlertMessage(t("Please enter the explanation"));
        }
      }
      if (data) {
        await axios
          .post(`${apiUrl}/artist/post_new`, data)
          .then((res) => {
            axios
              .get(
                `${apiUrl}/artist/appointment_list_id?id=${updateAppointment?.id}`
              )
              .then((response) => {
                if (response.status === 200) {
                  setUpdateAppointment(response.data.data[0]);
                  if (response?.data.data[0]?.typeofservice === "tattoo") {
                    setCurrentStep(3);
                  } else {
                    setCurrentStep(4);
                  }
                }
              });
          })
          .catch((err) => console.log(err));
      }
    } else {
      setAlertMessage("Please Enter the skin explanation");
      setAlert(!alert);
    }
  };

  const fetchBill = async () => {
    await axios
      .get(`${apiUrl}/artist/billing_list_id?id=${bill.id}`)
      .then((res) => {
        setBill(res.data.data[0]);
        setCurrentStep(7);
      });
  };


  const handlePrev = () => {
    switch (currentStep) {
      case 1:
        navigate("/artist-dashboard");
        break;
      case 2:
        navigate(`/billing/${updateAppointment?.id}/1`)
        break;

      case 3:
        navigate(`/billing/${updateAppointment?.id}/2`)
        break;

      case 4:
        if (updateAppointment?.typeofservice === "tattoo") {
          navigate(`/billing/${updateAppointment?.id}/3`)
          break;
        } else {
          navigate(`/billing/${updateAppointment?.id}/2`)
          break;
        }

        case 5 :
          navigate(`/billing/${updateAppointment?.id}/4`)
          break;

        case 6 :
          navigate(`/billing/${updateAppointment?.id}/5`)
          break;
        
        case 7:
          navigate(`/billing/${updateAppointment?.id}/6`)
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

  return (
    <div className="w-full h-full flex flex-col text-white gap-2 items-center overflow-auto p-2">
      {currentStep === 1 && (
        <PriceComponent
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrice={handlePrice}
          handlePrev={handlePrev}
        />
      )}

      {currentStep === 2 && (
        <SkinCondition
          onClick={handleUpdateSkin}
          handlePrev={handlePrev}
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
        />
      )}

      {currentStep === 3 && (
        <>
          {updateAppointment?.typeofservice === "tattoo" && (
            <UploadBeforeImage
              handlePrev={handlePrev}
              updateAppointment={updateAppointment}
              setUpdateAppointment={setUpdateAppointment}
            />
          )}
        </>
      )}

      {currentStep === 4 && (
        <div className="flex flex-col items-center w-full h-full gap-3">
          <Timer
            updateAppointment={updateAppointment}
            setUpdateAppointment={setUpdateAppointment}
            bill={bill}
            setBill={setBill}
            handlePrev = {handlePrev}
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
        <UploadAfterImage
          updateAppointment={updateAppointment}
          setUpdateAppointment={setUpdateAppointment}
          handlePrev={handlePrev}
        />
      )}

      {currentStep === 7 && (
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
