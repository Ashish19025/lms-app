import axios from 'axios';
import { API_URL } from '../utils/constants';

// We export a clean secondary instance here if needed, 
// though the app predominantly uses services/api/client.ts
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
