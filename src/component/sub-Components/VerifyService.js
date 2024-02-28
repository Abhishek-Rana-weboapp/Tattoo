import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../url";

const VerifyService = ({ step, setStep }) => {
  const appointmentId = sessionStorage.getItem("appointmentID") || null;
  const [appointment, setAppointment] = useState();
  const [placement, setPlacement] = useState();

  useEffect(() => {
    const fetchAppointment = async () => {
      await axios
        .get(`${apiUrl}/artist/appointment_list_id?id=${appointmentId}`)
        .then((res) => {
          setAppointment(res?.data?.data[0]);
          setPlacement(JSON.parse(res?.data?.data[0].body_location));
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

  return (
    <div className="text-white flex flex-col gap-4 items-center  w-full h-full p-3 justify-between">
      <div className="text-white flex flex-col gap-4 items-center  w-full h-full">
        <h2 className="font-bold">Appointment Details</h2>

        {/* Service Section */}
        <h4 className="capitalize font-bold flex gap-2">
          {`Service : `}{" "}
          <h4>{placement ? placement?.selectedTattooType : ""}</h4>{" "}
        </h4>

        {(placement?.selectedTattooType === "tattoo" ||
          placement?.selectedTattooType === "piercing" ||
          placement?.selectedTattooType === "permanent-makeup") && (
          <>
            {/* Placement section cjanging based on the service*/}
            <div className="flex gap-2">
              <h4 className="font-bold">Placement : </h4>
              <div className="flex flex-col">
                {placement && (
                  <>
                    {placement.level1 !== null && <h4>{placement.level1}</h4>}
                    {placement.level2 !== null && <h4>{placement.level2}</h4>}
                    {placement.level3 !== null && <h4>{placement.level3}</h4>}
                    {placement.level4 !== null && <h4>{placement.level4}</h4>}
                  </>
                )}
              </div>
            </div>

            {/*Description Section */}
            {placement.selectedTattooType === "tattoo" && (
              <div>
                <h4>{`Description: ${
                  appointment ? appointment.brief_description : ""
                }`}</h4>
              </div>
            )}
          </>
        )}

        {placement?.selectedTattooType === "tooth-gems" && (
          <>
            <h4>{`Placement :`} </h4>
            <img
              className="md:w-2/6 h-96 rounded-lg"
              src={placement.level1}
            ></img>
          </>
        )}

        {placement?.selectedTattooType === "smp" && (
          <>
            <h4>{`Placement :`} </h4>
            <img
              className="md:w-1/6 h-64 rounded-lg"
              src={placement.level1}
            ></img>
          </>
        )}
      </div>
      <div className="md:w-1/2 flex justify-between w-full">
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
          onClick={handlePrev}
        >
          Back
        </button>
        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerifyService;
