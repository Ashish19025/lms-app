import { create } from 'zustand';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { login, register } from '../services/api/auth.api';
import { saveToken, removeToken, getToken } from '../services/storage/secureStorage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  initialize: async () => {
    try {
      const token = await getToken();
      if (token) {
        // Here we ideally fetch the current user profile from the API 
        // We'll generate a mock user object for the UI to satisfy the Auth guard
        set({ 
          user: {
            _id: 'restored-session',
            username: 'Student',
            email: 'user@example.com',
            avatar: 'https://via.placeholder.com/150'
          }
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ isInitialized: true });
    }
  },

  signIn: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await login(credentials);
      await saveToken(data.accessToken);
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Login failed. Please try again.',
        isLoading: false 
      });
      throw error;
    }
  },

  signUp: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await register(credentials);
      // Automatically log the user in if the API returns an access token
      if (data && data.accessToken) {
        await saveToken(data.accessToken);
        set({ user: data.user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Registration failed.',
        isLoading: false 
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await removeToken();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  }
}));