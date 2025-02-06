// axiosInstance.ts
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://d17f-27-66-22-166.ngrok-free.app", // Replace with your base API URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000, // Set a timeout (optional)
});

export default axiosInstance;
