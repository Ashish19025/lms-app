import { apiClient } from './client';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../../types/auth.types';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/api/v1/users/login', credentials);
  return response.data.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/api/v1/users/register', credentials);
  return response.data.data;
};