import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppointmentContext } from "../../context/AppointmentContext";
import TranslationWrapper from "../../component/Layout/TranslationWrapper";
import { apiUrl } from "../../url";

const VerifyService = ({ step, setStep }) => {
  const { t } = useTranslation();
  const { appointment } = useAppointmentContext();
  const [bodyLocation, setBodyLocation] = useState({});

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrev = () => {
    setStep(0);
  };

  useEffect(() => {
    if (appointment.bodyLocation) {
      setBodyLocation(JSON.parse(appointment.bodyLocation));
    }
  }, [appointment]);


  const normalServices = ["tattoo", "piercing", "removal", "permanent-makeup"];
  const imageServices = ["tooth-gems", "smp"];
  const descriptionServices = ["tattoo", "removal"]

  return (
    <div className="text-white flex flex-col gap-4 items-center  w-full h-full p-3 justify-between overflow-hidden">
      <div className="text-white flex flex-col gap-4 items-center  max-w-2xl w-full h-full overflow-auto">
        <h2 className="font-bold md:text-2xl text-lg uppercase">
          {t("Appointment Details")}
        </h2>

        {/* Service Section */}
        <h4 className="capitalize font-bold flex gap-2">
          <TranslationWrapper text={"Service"} /> : <h4>{t(appointment.typeofservice)}</h4>{" "}
        </h4>

        <div className="flex flex-col">
          {Object.keys(bodyLocation).length > 0 &&
              normalServices.includes(appointment.typeofservice) && 
               Object.keys(bodyLocation).map((location) => {
                return (
                  <div key={location}>
                    <div className="flex gap-2 items-start">
                      <label className="font-bold">
                        <TranslationWrapper text="Placement" /> :
                      </label>
                      <div>
                        {Object.keys(bodyLocation[location]).map((level) => {
                          if (level.startsWith("level")) {
                            return (
                              <p key={level} className="capitalize">
                                {bodyLocation[location][level]}
                              </p>
                            );
                          }
                        })}{" "}
                      </div>
                    </div>
                    {descriptionServices.includes(appointment.typeofservice) && <div className="flex gap-2">
                      <label className="font-bold">
                        <TranslationWrapper text="Description" /> {":"}
                      </label>
                      <div>{bodyLocation[location]["description"]} </div>
                    </div>}
                  </div>
                );
              }
            )}

          {imageServices.includes(appointment.typeofservice) &&
            <label className="font-bold flex flex-col items-center gap-2">
              {console.log(bodyLocation)}
              <TranslationWrapper text="Placement :" /> 
              <img className="w-full max-w-72 object-cover" src={`${apiUrl}${bodyLocation[1]?.level1}`} />
            </label>
          }
        </div>
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
