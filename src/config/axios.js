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
    console.log('Axios request config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      baseURL: config.baseURL
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.log('Axios error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;