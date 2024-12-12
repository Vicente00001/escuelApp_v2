// AxiosInstance.js
import axios from 'axios';
import { VITE_BACK_URL } from '@env'; // Importar la variable desde .env

const axiosInstance = axios.create({
  baseURL: VITE_BACK_URL, // Usar la URL desde el archivo .env
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
 
export default axiosInstance;
