import axios from "axios";

const axiosClient = axios.create({
  // Use Vite's environment variable
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
