import axios from 'axios';
import { getToken, getRefreshToken, saveToken, saveRefreshToken, removeToken, removeUser, removeRefreshToken } from '../storage/secureStorage';

// Create an Axios instance with a base URL and timeout for API requests
export const apiClient = axios.create({
  baseURL: 'https://api.freeapi.app',
  timeout: 10000,
});

// Request interceptor to automatically include the access token in the Authorization header of each request
apiClient.interceptors.request.use(async (config) => {
  // Retrieve the access token from secure storage and add it to the request headers if it exists
  const token = await getToken();
  // If a token is found, set the Authorization header to use the Bearer token scheme
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Flag to indicate if a token refresh is currently in progress and a queue to hold failed requests while refreshing
let isRefreshing = false;
let failedQueue: any[] = [];

// Function to process the queue of failed requests after a token refresh attempt, either resolving them with the new token or rejecting them with an error
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle errors globally, including retrying transient server errors and managing token refresh on 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.error('API Error:', error?.response?.data || error.message);

    // Initialize retry count if not present
    if (originalRequest && !originalRequest.retry) originalRequest.retry = 0;

    // Retry transient server errors with backoff
    if (originalRequest && originalRequest.retry < 3 && (!error.response || error.response.status >= 500)) {
      originalRequest.retry += 1;
      const delay = new Promise((resolve) => setTimeout(resolve, Math.pow(2, originalRequest.retry - 1) * 1000));
      await delay;
      return apiClient(originalRequest);
    }

    // Handle 401 by attempting refresh token flow
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        // No refresh token available, clear storage and reject
        await removeToken();
        await removeUser();
        await removeRefreshToken();
        return Promise.reject(error);
      }
      // If a token refresh is already in progress, queue the request and return a promise that resolves when the refresh is complete
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then((token) => {
          // After the token is refreshed, retry the original request with the new token
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint directly using axios to avoid circular imports
        const resp = await axios.post(`${apiClient.defaults.baseURL}/api/v1/users/refresh`, { refreshToken });
        const data = resp.data?.data || resp.data;
        const newAccess = data?.accessToken || data?.token || null;
        const newRefresh = data?.refreshToken || null;

        // Save the new tokens to secure storage if they are present in the response
        if (newAccess) {
          await saveToken(newAccess);
        }
        // Optionally update the refresh token if a new one is provided by the API
        if (newRefresh) {
          await saveRefreshToken(newRefresh);
        }

        processQueue(null, newAccess);
        isRefreshing = false;

        // Retry the original request with the new access token if it was obtained successfully
        if (newAccess && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return apiClient(originalRequest);
      } catch (e) {
        processQueue(e, null);
        isRefreshing = false;
        await removeToken();
        await removeUser();
        await removeRefreshToken();
        return Promise.reject(e);
      }
    }
    // For all other errors, reject the promise with the error
    return Promise.reject(error);
  }
);