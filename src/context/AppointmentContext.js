import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import { useLocation } from "react-router-dom";
import axiosInstance from "../config/axios";

const AppointmentContext = createContext();

export const AppointmentContextProvider = ({ children }) => {
  const location = useLocation();
  const { user } = useAuthContext();
  const resetLocations = ["/dashboard", "/", "/signup"];
  const [appointmentData, setAppointmentData] = useState(null);
  const [bodyLocation, setBodyLocation] = useState(null);
  const [medicalhistory, setMedicalHistory] = useState(null);
  const [emergencyContactInfo, setEmergencyContactInfo] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [prevFormsInfo, setPrevFormsInfo] = useState(null);
  const [appointment, setAppointment] = useState(null);

  const hasRestored = useRef(false);

  useEffect(() => {
    const storedAppointmentData = sessionStorage.getItem("storedappointmentdata");
    const storedBodyLocation = sessionStorage.getItem("storedbodyLocation");
    const storedMedicalHistory = sessionStorage.getItem("storedmedicalhistory");
    const storedAppointment = sessionStorage.getItem("storedappointment");

    if (storedMedicalHistory)
      setMedicalHistory(JSON.parse(storedMedicalHistory));
    if (storedAppointmentData) setAppointmentData(JSON.parse(storedAppointmentData));
    if (storedBodyLocation) setBodyLocation(JSON.parse(storedBodyLocation));
    if(storedAppointment) setAppointment(JSON.parse(storedAppointment))

    hasRestored.current = true;
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const response = await axiosInstance.get(`artist/user_history`);
          if (response.status === 200) {
            console.log(response.data)
            setPrevFormsInfo(response.data);
          }
        } catch (error) {
          console.error("Error fetching previous Forms Info");
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    if (resetLocations.includes(location.pathname)) {
      sessionStorage.removeItem("storedappointmentdata");
      sessionStorage.removeItem("storedappointment");
      sessionStorage.removeItem("storedbodyLocation");
      sessionStorage.removeItem("storedmedicalhistory");
      setAppointment(null)
      setAppointmentData(null);
      setBodyLocation(null);
      setMedicalHistory(null);
      setEmergencyContactInfo(null);
      setDoctorInfo(null);
    }
  }, [location]);
  

  // Save only after restore
  useEffect(() => {
    if (hasRestored.current) {
      sessionStorage.setItem(
        "storedappointmentdata",
        JSON.stringify(appointmentData)
      );
      sessionStorage.setItem(
        "storedmedicalhistory",
        JSON.stringify(medicalhistory)
      );
      sessionStorage.setItem(
        "storedbodyLocation",
        JSON.stringify(bodyLocation)
      );
      sessionStorage.setItem(
        "storedappointment",
        JSON.stringify(appointment)
      );
    }
  }, [appointmentData, appointment]);

  useEffect(() => {
    if (hasRestored.current) {
      sessionStorage.setItem(
        "storedbodyLocation",
        JSON.stringify(bodyLocation)
      );
    }
  }, [bodyLocation]);

  console.log({appointment})
  console.log({appointmentData})
  console.log({bodyLocation})

  return (
    <AppointmentContext.Provider
      value={{
        appointmentData,
        setAppointmentData,
        bodyLocation,
        setBodyLocation,
        medicalhistory,
        setMedicalHistory,
        emergencyContactInfo,
        setEmergencyContactInfo,
        doctorInfo,
        setDoctorInfo,
        prevFormsInfo,
        setPrevFormsInfo,
        appointment,
        setAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointmentContext hook should be used inside the appointmentData context"
    );
  }

  return context;
};
