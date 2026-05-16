import { apiClient } from './client';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../../types/auth.types';

// Function to handle user login by sending credentials to the API and returning the authentication response
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Send a POST request to the login endpoint with the user's credentials and return the response data
  const response = await apiClient.post('/api/v1/users/login', credentials);
  // Return the data from the response, which should include the access token, refresh token, and user information
  return response.data.data;
};

// Function to handle user registration by sending credentials to the API and returning the authentication response 
export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  // Send a POST request to the registration endpoint with the user's credentials and return the response data
  const response = await apiClient.post('/api/v1/users/register', credentials);
  // Return the data from the response, which should include the access token, refresh token, and user information
  return response.data.data;
};