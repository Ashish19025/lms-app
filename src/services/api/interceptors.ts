import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../storage/secureStorage';

/**
 * Interceptors for API requests and responses to handle authentication tokens and global error handling.
 * The request interceptor adds the access token to the Authorization header of each request if it exists.
 * The response interceptor can be used to handle specific response formats or global success handling.
 * The error interceptor handles global errors, such as unauthorized access, and can trigger actions like logout.
 */
export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  try {
    // Retrieve the access token from secure storage and add it to the request headers if it exists
    const token = await getToken();
    // If a token is found, set the Authorization header to use the Bearer token scheme
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error fetching token for interceptor', error);
  }
  // Return the modified config to proceed with the request
  return config;
};

// Response interceptor to handle successful responses globally if needed
export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};


// Error interceptor to handle global error responses like 401 Unauthorized
export const errorInterceptor = (error: AxiosError) => {
  // Handle global error responses like 401 Unauthorized
  if (error.response?.status === 401) {
    // Optionally trigger a logout action here
    console.warn('Unauthorized request - Token might be expired');
  }
  return Promise.reject(error);
};
