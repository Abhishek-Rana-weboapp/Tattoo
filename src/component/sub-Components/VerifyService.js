import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../url";
import { useTranslation } from "react-i18next";
import { AUTHHEADERS } from "../../commonFunctions/Headers";

const VerifyService = ({ step, setStep }) => {
  const appointmentIds =
    JSON.parse(sessionStorage.getItem("appointmentIDs")) || [];
  const [service, setService] = useState("");
  const [placement, setPlacement] = useState([]);
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState([]);

  const { t } = useTranslation();
  const appointments =
    JSON.parse(sessionStorage.getItem("appointment_detail")) || [];

  useEffect(() => {
    if (appointments.length > 0) {
      const newLocations = [];
      const newPlacements = [];
      const newDescriptions = [];

      appointments.forEach((appointment) => {
        newLocations.push(JSON.parse(appointment.body_location));

        const placementKeys = Object.keys(appointment.body_location).filter(
          (key) => key !== "selectedTattooType"
        );
        newPlacements.push(...placementKeys);
        newDescriptions.push(JSON.parse(appointment.brief_description));
      });
      setLocation([...newLocations]);
      setPlacement([...newPlacements]);
      setService(appointments[0].typeofservice);
      setDescription([...newDescriptions]);
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrev = () => {
    setStep(0);
  };

  console.log(location);
  console.log(service);

  return (
    <div className="text-white flex flex-col gap-4 items-center  w-full h-full p-3 justify-between overflow-hidden">
      <div className="text-white flex flex-col gap-4 items-center  md:w-1/3 w-full h-full overflow-auto">
        <h2 className="font-bold">{t("Appointment Details")}</h2>

        {/* Service Section */}
        <h4 className="capitalize font-bold flex gap-2">
          {t("Service")} : <h4>{t(service)}</h4>{" "}
        </h4>

        {(service === "tattoo" ||
          service === "piercing" ||
          service === "removal") && (
          <>
            {/* Placement section cjanging based on the service*/}
            {location.length &&
              location.map((loc, index) => (
                <div className="p-2 border border-white w-full rounded-lg">
                  {console.log(loc[1])}
                  {service === "tattoo" ||
                    (service === "removal" && (
                      <h4>{`${t("Tattoo")} ${index + 1}`}</h4>
                    ))}
                  {service === "piercing" && (
                    <h4>{`${t("Piercing")} ${index + 1}`}</h4>
                  )}
                  <div className="flex gap-2">
                    <h4 className="font-bold">{t("Placement")} : </h4>
                    <div className="flex flex-col justify-center">
                      {loc[1] && (
                        <React.Fragment>
                          {loc[1].level1 !== null && (
                            <label className="md:text-2xl text-base">
                              {t(loc[1].level1)}
                            </label>
                          )}
                          {loc[1].level2 !== null && (
                            <label className="md:text-2xl text-base">
                              {t(loc[1].level2)}
                            </label>
                          )}
                          {loc[1].level3 !== null && (
                            <label className="md:text-2xl text-base">
                              {t(loc[1].level3)}
                            </label>
                          )}
                          {loc[1].level4 !== null && (
                            <label className="md:text-2xl text-base">
                              {t(loc[1].level4)}
                            </label>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  {service === "tattoo" && (
                    <div className="flex items-center gap-2">
                      <h4>{t(`Description`)}:</h4>
                      <label className="md:text-2xl text-base">
                        {description ? description[index][1] : ""}
                      </label>
                    </div>
                  )}
                </div>
              ))}

            {/*Description Section */}
          </>
        )}

        {service === "permanent-makeup" &&
          location.map((loc, index) => (
            <div className="flex gap-2" key={index}>
              <h4 className="font-bold">{t("Placement")} : </h4>
              <div className="flex flex-col">
                <div>
                  {loc[1].level1 !== null && (
                    <h4>{t(loc[1].level1)}</h4>
                  )}
                  {loc[1].level2 !== null && (
                    <h4>{t(loc[1].level2)}</h4>
                  )}
                  {loc[1].level3 !== null && (
                    <h4>{t(loc[1].level3)}</h4>
                  )}
                  {loc[1].level4 !== null && (
                    <h4>{t(loc[1].level4)}</h4>
                  )}
                </div>
              </div>
            </div>
          ))}

        {service === "tooth-gems" &&
          location.length > 0 &&
          location.map((loc, index) => {
            return (
              <React.Fragment key={index}>
                <h4>{t("Placement")} : </h4>
                <div className="w-full rounded">
                  <img
                    className="aspect-video w-full object-contain rounded-lg"
                    src={loc[1].level1}
                  ></img>
                </div>
              </React.Fragment>
            );
          })}

        {service === "smp" &&
          location.length > 0 &&
          location.map((loc, index) => {
            return (
              <React.Fragment key={index}>
                <h4>{`Placement :`} </h4>
                <img
                  className="w-full aspect-video h-64 rounded-lg"
                  src={loc[1].level1}
                ></img>
              </React.Fragment>
            );
          })}
      </div>
      <div className="md:w-1/2 flex justify-between w-full">
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
          onClick={handlePrev}
        >
          {t("Back")}
        </button>
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
          onClick={handleNext}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default VerifyService;
