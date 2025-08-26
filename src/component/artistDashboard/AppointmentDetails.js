import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdAttach } from "react-icons/io";
import {useAppointmentContext} from "../../context/AppointmentContext"
import { apiUrl } from "../../url";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {appointment} = useAppointmentContext()


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
              value={appointment?.firstName + " " + appointment?.lastName}
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
              value={new Date(appointment?.appointment_date).toLocaleDateString("en-GB", {
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
              value={appointment?.artistName}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 justify-between">
          <div className="flex gap-2 items-start ">
            <label className="font-bold md:text-lg w-36">Verification ID:</label>
            <a href={appointment?.clientId} target="_blank">
              <img
                src={`${apiUrl}${appointment?.clientId}`}
                className="object-cover w-52 h-32 rounded-md shadow"
              />
            </a>
          </div>

          {appointment?.guardianId && (
            <div className="flex gap-2 items-start ">
              <label className="font-bold md:text-lg w-36">
                Gaurdian Verification ID:
              </label>
              <a href={appointment?.guardianId} target="_blank">
                <img
                  src={`${apiUrl}${appointment?.guardianId}`}
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
