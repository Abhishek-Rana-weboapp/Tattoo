import { useEffect, useState } from "react";
import {
  createInitialsAndFullName,
  fetchAppointments,
  formatDateOnly,
} from "../../utils/helperFunctions";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios";
import LoaderModal from "../modal/LoaderModal";
import Modal from "../modal/Modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NoServiceSection = () => {
  const navigate = useNavigate();
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAppointments("pending")
      .then((appointments) => {
        setPendingAppointments(appointments);
      })
      .catch((err) =>
        toast.error(
          err.response.data.message || "Failed to fetch pending appointments"
        )
      );
  }, []);

  const handleSelectAppointment = (e) => {
    const appointment = pendingAppointments.find(
      (app) => parseInt(app.id) === parseInt(e.target.value)
    );
    setSelectedAppointment(appointment);
    return;
  };

  const handleMarkNoService = async () => {
    if (!selectedAppointment) {
      toast.error("Please select an appointment");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/appointment/${selectedAppointment.id}`,
        {
          status: "no_service",
        }
      );
      if (response.status === 200) {
        toast.success("Appointment marked as no service");
        setModalOpen(true);
      }
    } catch (error) {
      toast.error("Failed to mark appointment as no service");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    await axiosInstance
      .post(`/pdf/generate`, {
        userName: selectedAppointment?.userName,
        appointmentId: selectedAppointment?.id,
      })
      .then((res) => {
        toast.success(t("PDF uploaded to google drive"));
        navigate("/artist-dashboard", { replace: true });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || t("Something went wrong"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <>
      {modalOpen && (
        <Modal>
          <div className="flex flex-col gap-4 p-4">
            <label className="text-2xl text-black">
              Generate pdf for this appointment
            </label>
            <button
              className="yellowButton py-2 px-4 rounded-xl text-black font-bold"
              onClick={handleGeneratePDF}
              // disabled={videoStatus === "UPLOADING" || imageStatus === "UPLOADING"}
            >
              Generate PDF
            </button>
          </div>
        </Modal>
      )}
      <div className="text-white max-w-5xl mx-auto p-4">
        <h1 className="text-2xl uppercase font-bold text-center">
          No service Section
        </h1>
        <div className="flex flex-col items-center mt-3">
          <h2 className="text-xl font-medium">
            Select a service to mark no service provided
          </h2>
          <select
            name=""
            id=""
            className="text-black p-2 w-full rounded-lg mt-3"
            onChange={handleSelectAppointment}
            value={selectedAppointment ? selectedAppointment.id : ""}
          >
            <option value="">Select a Appointment</option>
            {pendingAppointments.map((app) => {
              const { fullname } = createInitialsAndFullName(
                app.firstName,
                app.lastName
              );
              return (
                <option value={app.id} key={app.id}>
                  <span className="flex justify-between w-full">
                    <span>{fullname}</span>-{" "}
                    <span className="text-xs">{app.typeofservice}</span> -{" "}
                    <span>{formatDateOnly(app.appointment_date)}</span>
                  </span>
                </option>
              );
            })}
          </select>
        </div>

        {selectedAppointment && (
          <div className="mt-5 p-4 border border-gray-600 rounded-lg ">
            <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
            <p>
              <strong>Client Name:</strong>{" "}
              {
                createInitialsAndFullName(
                  selectedAppointment.firstName,
                  selectedAppointment.lastName
                ).fullname
              }
            </p>
            <p>
              <strong>Service Type:</strong> {selectedAppointment.typeofservice}
            </p>
            <p>
              <strong>Appointment Date:</strong>{" "}
              {formatDateOnly(selectedAppointment.appointment_date)}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center mt-5 text-black gap-4">
          <button className="yellowButton rounded-xl py-2 px-5 font-bold" onClick={()=>navigate(-1)}>
            {t("Back")}
          </button>
          <button
            className="yellowButton rounded-xl py-2 px-5 font-bold"
            disabled={!selectedAppointment}
            onClick={handleMarkNoService}
          >
            Mark as No Service
          </button>
        </div>
      </div>
    </>
  );
};

export default NoServiceSection;
