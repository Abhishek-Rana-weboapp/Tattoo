import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../url";
import { useTranslation } from "react-i18next";
import { AUTHHEADERS } from "../../commonFunctions/Headers";

const VerifyService = ({ step, setStep }) => {
  const appointmentId = sessionStorage.getItem("appointmentID") || null;
  const [appointment, setAppointment] = useState();
  const [service, setService] = useState("")
  const [placement, setPlacement] = useState([]);
  const [location, setLocation] = useState({})
  const [description, setDescription] = useState("");
  const {t} = useTranslation()

  useEffect(() => {
    const fetchAppointment = async () => {
      await axios
        .get(`${apiUrl}/artist/appointment_list_id_user?id=${appointmentId}`, {headers:AUTHHEADERS()})
        .then((res) => {
          const data = JSON.parse(res?.data?.data[0].body_location)
          console.log(data)
          setAppointment(res?.data?.data[0]);
          setService(data.selectedTattooType || "")
          setLocation(data)
          setPlacement(Object.keys(data).filter(key=>key !== "selectedTattooType"));
          setDescription(JSON.parse(res?.data?.data[0].brief_description))
        })
        .catch((err) => console.log(err));
    };
    if (appointmentId !== null) {
      fetchAppointment();
    }
  }, []);

  const handleNext = () => {
    setStep(2);
  };

  const handlePrev = () => {
    setStep(0);
  };

  console.log(location)
  console.log(location[1]?.level1)

  return (
    <div className="text-white flex flex-col gap-4 items-center  w-full h-full p-3 justify-between overflow-hidden">
      <div className="text-white flex flex-col gap-4 items-center  md:w-1/3 w-full h-full overflow-auto">
        <h2 className="font-bold">{t("Appointment Details")}</h2>

        {/* Service Section */}
        <h4 className="capitalize font-bold flex gap-2">
          {t("Service")} :{" "}
          <h4>{t(service)}</h4>{" "}
        </h4>

        {(service === "tattoo" ||
          service === "piercing" || service === "removal" ) && (
          <>
            {/* Placement section cjanging based on the service*/}
                {placement.length && placement.map((key)=>(
                  <div className="p-2 border border-white w-full rounded-lg">
                  {service === "tattoo" || service === "removal" && <h4>{`${t("Tattoo")} ${key}`}</h4>}
                  {service === "piercing" && <h4>{`${t("Piercing")} ${key}`}</h4>}
            <div className="flex gap-2">
              <h4 className="font-bold">{t("Placement")} : </h4>
              <div className="flex flex-col justify-center">
                  <React.Fragment key={key}>
                    {location[key].level1 !== null && <label className="md:text-2xl text-base">{t(location[key]?.level1)}</label>}
                    {location[key].level2 !== null && <label className="md:text-2xl text-base">{t(location[key]?.level2)}</label>}
                    {location[key].level3 !== null && <label className="md:text-2xl text-base">{t(location[key]?.level3)}</label>}
                    {location[key].level4 !== null && <label className="md:text-2xl text-base">{t(location[key]?.level4)}</label>}
                  </React.Fragment>
              </div>
            </div>
                    {service === "tattoo" && (
                      <div className="flex items-center gap-2">
                        <h4>{t(`Description`)}:</h4>
                        <label className="md:text-2xl text-base">
                        {
                          description ? description[key]: ""
                        }
                        </label>
                      </div>
                    )}
            </div>
                ))
              }

            {/*Description Section */}
          </>
        )}

        {
          (service === "permanent-makeup")&& (
            <>
            <div className="flex gap-2">
              <h4 className="font-bold">{t("Placement")} : </h4>
              <div className="flex flex-col">
                  <div>
                    {location[1].level1 !== null && <h4>{t(location[1].level1)}</h4>}
                    {location[1].level2 !== null && <h4>{t(location[1].level2)}</h4>}
                    {location[1].level3 !== null && <h4>{t(location[1].level3)}</h4>}
                    {location[1].level4 !== null && <h4>{t(location[1].level4)}</h4>}

                  </div>
              </div>
            </div>
          </>
          )
        }

        {service === "tooth-gems" && (
          <>
            <h4>{t("Placement")} : </h4>
            <div className="w-full rounded">
            <img
              className="aspect-video w-full object-contain rounded-lg"
              src={location[1].level1}
              ></img>
              </div>
          </>
        )}

        {service === "smp" && (
          <>
            <h4>{`Placement :`} </h4>
            <img
              className="w-full aspect-video h-64 rounded-lg"
              src={location[1].level1}
            ></img>
          </>
        )}
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
