import { useEffect, useState } from "react";
import { decodeUrls } from "../../commonFunctions/Encoders";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdAttach } from "react-icons/io";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [appointment, setAppointment] = useState(() => {
    return sessionStorage.getItem("selectedAppointment")
      ? JSON.parse(sessionStorage.getItem("selectedAppointment"))
      : null;
  });

  console.log(appointment);

  // useEffect(()=>{
  //   if(!appointment) return

  //   console.log(appointment)
  //   const dateParts = appointment?.Date.split("/");
  //   console.log(dateParts)
  //   const date = new Date(`20${dateParts[2]}`, dateParts[1], dateParts[0]);
  //   setAppointment(prev=>({
  //     ...prev, Date:date
  //   }))
  // },[appointment])

  if (appointment === null) {
    return (
      <div className="md:text-3xl font-bold text-white">
        No Appointment Selected
      </div>
    );
  }

  return (
    <div className="text-white flex-1 flex flex-col gap-10 overflow-hidden">
      <h1 className="md:text-3xl text-xl font-bold w-max mx-auto">
        Appointment Details
      </h1>
      <div className="max-w-7xl flex-1 mx-auto md:space-y-10 space-y-3 w-full h-[600px] p-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded">
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 justify-between">
          <div className="flex gap-2 items-center ">
            <label className="font-bold md:text-lg w-36">Customer Name:</label>
            <input
              type="text"
              readOnly
              className="rounded-md p-2 text-black focus-within:outline-none"
              value={appointment?.firstname + " " + appointment?.lastname}
            />
          </div>
          <div className="flex gap-2 items-center ">
            <label className="font-bold md:text-lg w-36">Service:</label>
            <input
              type="text"
              readOnly
              className="rounded-md p-2 text-black focus-within:outline-none"
              value={appointment?.typeofservice}
            />
          </div>
        </div>


        {appointment?.brief_description &&<div className="flex gap-2 items-center ">
            <label className="font-bold md:text-lg w-36">Description:</label>
            <input
              type="text"
              readOnly
              className="rounded-md p-2 text-black focus-within:outline-none"
              value={JSON.parse(appointment?.brief_description)[1]}
            />
          </div>}

        <div className="flex md:flex-row flex-col md:gap-16 gap-4 justify-between">
          <div className="flex gap-2 items-center ">
            <label className="font-bold md:text-lg w-36">Booking Date:</label>
            <input
              type="text"
              readOnly
              className="rounded-md p-2 text-black focus-within:outline-none"
              value={new Date(appointment?.Date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            />
          </div>

          <div className="flex gap-2 items-center ">
            <label className="font-bold md:text-lg w-36">Artist's Name:</label>
            <input
              type="text"
              readOnly
              className="rounded-md p-2 text-black focus-within:outline-none"
              value={appointment?.ArtistPiercerNames}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 justify-between">
          <div className="flex gap-2 items-start ">
            <label className="font-bold md:text-lg w-36">Verification ID:</label>
            <a href={appointment?.id_url} target="_blank">
              <img
                src={appointment?.id_url}
                className="object-cover w-52 h-32 rounded-md shadow"
              />
            </a>
          </div>

          {appointment?.gaurdian_id && (
            <div className="flex gap-2 items-start ">
              <label className="font-bold md:text-lg w-36">
                Gaurdian Verification ID:
              </label>
              <a href={appointment?.gaurdian_id} target="_blank">
                <img
                  src={appointment?.gaurdian_id}
                  className="object-cover w-52 h-32 rounded-md shadow"
                />
              </a>
            </div>
          )}
        </div>

    

        <div className="flex gap-2 items-center">
          <label className="font-bold md:text-lg w-36 ">Attachments:</label>
          <a
            href={appointment?.google_drive_folder_id}
            target="_blank"
            className="flex items-center gap-2 underline text-blue-500"
          >
            Google Drive link
            <IoMdAttach onClick />
          </a>
        </div>



        <div className="flex gap-2 items-center ">
            <label className="font-bold md:text-lg w-36">Total Cost:</label>
            <input
              type="text"
              readOnly
              className="rounded-md p-2 text-black focus-within:outline-none"
              value={"$" + " " +`${appointment?.price}`}
            />
          </div>
      </div>
      <div className="flex justify-center">
        <button
          className="yellowButton rounded-xl py-2 px-5 font-bold text-black"
          onClick={() => {
            navigate(-1);
          }}
        >
          {t("Back")}
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
