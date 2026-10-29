import { apiClient } from './client';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../../types/auth.types';

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

// Fetch the logged-in user's profile (used to restore a session)
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/api/v1/users/current-user');
  return response.data.data;
};

// Upload a new avatar image and return the updated user
export const uploadAvatar = async (uri: string): Promise<User> => {
  const name = uri.split('/').pop() || 'avatar.jpg';
  const ext = name.split('.').pop()?.toLowerCase() || 'jpg';
  const form = new FormData();
  form.append('avatar', { uri, name, type: `image/${ext === 'jpg' ? 'jpeg' : ext}` } as any);
  const response = await apiClient.patch('/api/v1/users/avatar', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};
