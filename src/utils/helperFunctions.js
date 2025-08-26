import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import axiosInstance from "../config/axios";

export const createInitialsAndFullName = (firstname, lastname) => {
  return {
    initials: `${firstname?.slice(0, 1).toUpperCase()}${lastname
      ?.slice(0, 1)
      .toUpperCase()}`,
    fullname: `${firstname} ${lastname ? lastname : ""}`,
  };
};

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const fetchAppointments = async (status) => {
  try {
    const response = await axiosInstance.get(
      `appointment/appointments?status=${status}`
    );
    if (response.status === 200) {
      return response.data.appointments;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const formatDateAndTime = (ISODate)=>{
      const date = new Date(ISODate)
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
      return date.toLocaleString('en-US', options);
}

export  function formatDateOnly(isoDateString) {
    const date = new Date(isoDateString);

    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
