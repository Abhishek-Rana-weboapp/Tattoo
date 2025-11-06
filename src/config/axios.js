import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}api/`, // Ensure this is defined in your .env file
});

// Optional: Set token dynamically before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // or localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // If sending FormData, let the browser set the multipart boundary
    if (config.data instanceof FormData) {
      if (config.headers && config.headers["Content-Type"]) {
        delete config.headers["Content-Type"];
      }
    } else {
      // Default to JSON for non-FormData requests
      if (config.headers && !config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => Promise.reject(error),{
  }
);

export default axiosInstance;