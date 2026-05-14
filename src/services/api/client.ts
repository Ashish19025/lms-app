import axios from 'axios';
import { getToken } from '../storage/secureStorage';

export const apiClient = axios.create({
  baseURL: 'https://api.freeapi.app',
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Basic error handling/logging mechanism
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);