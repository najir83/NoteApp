import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://noteapp-pml3.onrender.com',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer your_token' // Optional: set default auth header
  },
});

export default axiosInstance;
