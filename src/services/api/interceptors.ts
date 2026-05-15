import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../storage/secureStorage';

export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error fetching token for interceptor', error);
  }
  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const errorInterceptor = (error: AxiosError) => {
  // Handle global error responses like 401 Unauthorized
  if (error.response?.status === 401) {
    // Optionally trigger a logout action here
    console.warn('Unauthorized request - Token might be expired');
  }
  return Promise.reject(error);
};
