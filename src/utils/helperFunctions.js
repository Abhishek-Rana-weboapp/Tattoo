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
