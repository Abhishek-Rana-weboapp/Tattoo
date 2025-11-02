import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Ensure this is defined in your .env file
});

// Optional: Set token dynamically before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // or localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),{
  }
);

export default axiosInstance;