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
  const [clientPhoneNumber, setClientPhoneNumber] = useState(null);
  const [selectedTeeth, setSelectedTeeth] = useState([]);

  const hasRestored = useRef(false);

  useEffect(() => {
    const storedAppointmentData = safeParse(
      sessionStorage.getItem("storedappointmentdata"),
    );
    const storedBodyLocation = safeParse(
      sessionStorage.getItem("storedbodyLocation"),
    );
    const storedMedicalHistory = safeParse(
      sessionStorage.getItem("storedmedicalhistory"),
    );
    const storedAppointment = safeParse(
      sessionStorage.getItem("storedappointment"),
    );
    const storedPhoneNumber = safeParse(sessionStorage.getItem("storedPhoneNumber"))
    if (storedMedicalHistory) setMedicalHistory(storedMedicalHistory);
    if (storedAppointmentData) setAppointmentData(storedAppointmentData);
    if (storedBodyLocation) setBodyLocation(storedBodyLocation);
    if (storedAppointment) setAppointment(storedAppointment);
    if(storedPhoneNumber) setClientPhoneNumber(storedPhoneNumber)

    hasRestored.current = true;
  }, []);

  const safeParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const response = await axiosInstance.get(`/user_history`);
          if (response.status === 200) {
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
      sessionStorage.removeItem("storedPhoneNumber");
      setAppointment(null);
      setClientPhoneNumber(null);
      setAppointmentData(null);
      setBodyLocation(null);
      setMedicalHistory(null);
      setEmergencyContactInfo(null);
      setDoctorInfo(null);
    }
  }, [location, resetLocations]);

  // Save only after restore
  useEffect(() => {
    if (hasRestored.current) {
      if (appointmentData !== undefined) {
        sessionStorage.setItem(
          "storedappointmentdata",
          JSON.stringify(appointmentData),
        );
      } else {
        sessionStorage.removeItem("storedappointmentdata");
      }

      if (medicalhistory !== undefined) {
        sessionStorage.setItem(
          "storedmedicalhistory",
          JSON.stringify(medicalhistory),
        );
      } else {
        sessionStorage.removeItem("storedmedicalhistory");
      }

      if (bodyLocation !== undefined) {
        sessionStorage.setItem(
          "storedbodyLocation",
          JSON.stringify(bodyLocation),
        );
      } else {
        sessionStorage.removeItem("storedbodyLocation");
      }

      if (appointment !== undefined) {
        sessionStorage.setItem(
          "storedappointment",
          JSON.stringify(appointment),
        );
        
      } else {
        sessionStorage.removeItem("storedappointment");
      }

       if (clientPhoneNumber !== undefined) {
      sessionStorage.setItem(
        "storedPhoneNumber",
        JSON.stringify(clientPhoneNumber),
      );
    }else{
       sessionStorage.removeItem("storedPhoneNumber");
    }
    }
  }, [appointmentData, medicalhistory, bodyLocation, appointment]);

  useEffect(() => {
    if (hasRestored.current) {
      sessionStorage.setItem(
        "storedbodyLocation",
        JSON.stringify(bodyLocation),
      );
    }
  }, [bodyLocation]);

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
        selectedTeeth,
        setSelectedTeeth,
        clientPhoneNumber,
        setClientPhoneNumber,
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
      "useAppointmentContext hook should be used inside the appointmentData context",
    );
  }

  return context;
};
