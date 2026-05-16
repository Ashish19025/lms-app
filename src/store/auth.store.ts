import { create } from 'zustand';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { login, register } from '../services/api/auth.api';
import { saveToken, removeToken, getToken, saveUser, removeUser, getUser } from '../services/storage/secureStorage';

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
        const user = await getUser();
        if (user) {
          set({ user });
        } else {
          // Fallback if token exists but user data doesn't
          set({
            user: {
              _id: 'restored-session',
              username: 'Student',
              email: 'user@example.com',
              avatar: 'https://via.placeholder.com/150'
            }
          });
        }
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
      await saveUser(data.user);
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
        await saveUser(data.user);
        set({ user: data.user, isLoading: false });
      } else {
        // Fallback: Authenticate via login since register doesn't return tokens
        const loginData = await login(credentials);
        await saveToken(loginData.accessToken);
        await saveUser(loginData.user);
        set({ user: loginData.user, isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Registration failed.',
        isLoading: false
      });
      throw error;
    }
  },  signOut: async () => {
    set({ isLoading: true });
    try {
      await removeToken();
      await removeUser();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  }
}));