export const API_URL = process.env.API_URL || 'http://localhost:3000/';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
export default axiosInstance;
