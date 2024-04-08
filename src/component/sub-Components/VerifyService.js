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
  
  console.log(appointment)
  console.log(placement)
  console.log(description)

  return (
    <div className="text-white flex flex-col gap-4 items-center  w-full h-full p-3 justify-between overflow-hidden">
      <div className="text-white flex flex-col gap-4 items-center  md:w-1/3 w-full h-full overflow-auto">
        <h2 className="font-bold">{t("Appointment Details")}</h2>

        {/* Service Section */}
        <h4 className="capitalize font-bold flex gap-2">
          {t("Service")} :{" "}
          <h4>{service}</h4>{" "}
        </h4>

        {(service === "tattoo" ||
          service === "piercing" ) && (
          <>
            {/* Placement section cjanging based on the service*/}
                {placement.length && placement.map((key)=>(
                  <div className="p-2 border border-white w-full rounded-lg">
                  {service === "tattoo" && <h4>{`Tattoo ${key}`}</h4>}
                  {service === "piercing" && <h4>{`Piercing ${key}`}</h4>}
            <div className="flex gap-2">
              <h4 className="font-bold">{t("Placement")} : </h4>
              <div className="flex flex-col">
                  <React.Fragment key={key}>
                    {location[key].level1 !== null && <h4>{location[key].level1}</h4>}
                    {location[key].level2 !== null && <h4>{location[key].level2}</h4>}
                    {location[key].level3 !== null && <h4>{location[key].level3}</h4>}
                    {location[key].level4 !== null && <h4>{location[key].level4}</h4>}

                  </React.Fragment>
              </div>
            </div>
                    {service === "tattoo" && (
                      <div>
                        <h4>{`Description: ${
                          description ? description[key]: ""
                        }`}</h4>
                      </div>
                    )}
            </div>
                ))
              }

            {/*Description Section */}
          </>
        )}

        {
          (service === "permanent-makeup"|| service === "removal" )&& (
            <>
            {/* Placement section cjanging based on the service*/}
                {placement.length && placement.map((key)=>(
                  <>

            <div className="flex gap-2">
              <h4 className="font-bold">{t("Placement")} : </h4>
              <div className="flex flex-col">
                  <React.Fragment key={key}>
                    {location[key].level1 !== null && <h4>{location[key].level1}</h4>}
                    {location[key].level2 !== null && <h4>{location[key].level2}</h4>}
                    {location[key].level3 !== null && <h4>{location[key].level3}</h4>}
                    {location[key].level4 !== null && <h4>{location[key].level4}</h4>}

                  </React.Fragment>
              </div>
            </div>
            {service === "removal" && (
             <div>
               <h4>{`Description: ${
                 description ? description[1]: ""
               }`}</h4>
             </div>
           )}
            </>
                ))
              }

            {/*Description Section */}
          </>
          )
        }

        {service === "tooth-gems" && (
          <>
            <h4>{t("Placement")} : </h4>
            <img
              className="md:w-2/6 h-96 rounded-lg"
              src={location.level1}
            ></img>
          </>
        )}

        {service === "smp" && (
          <>
            <h4>{`Placement :`} </h4>
            <img
              className="md:w-1/6 h-64 rounded-lg"
              src={location.level1}
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
