import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // replace with your actual API base URL
  timeout: 5000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your_token' // Optional: set default auth header
  },
});

export default axiosInstance;