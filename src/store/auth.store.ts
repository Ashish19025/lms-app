import { create } from 'zustand';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { login, register } from '../services/api/auth.api';
import { saveToken, removeToken, getToken, saveUser, removeUser, getUser, saveRefreshToken, getRefreshToken, removeRefreshToken } from '../services/storage/secureStorage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
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
      if (data.accessToken) await saveToken(data.accessToken);
      if (data.refreshToken) await saveRefreshToken(data.refreshToken);
      if (data.user) await saveUser(data.user);
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
        if (data.accessToken) await saveToken(data.accessToken);
        if (data.refreshToken) await saveRefreshToken(data.refreshToken);
        if (data.user) await saveUser(data.user);
        set({ user: data.user, isLoading: false });
      } else {
        // Fallback: Authenticate via login since register doesn't return tokens
        const loginData = await login(credentials);
        if (loginData.accessToken) await saveToken(loginData.accessToken);
        if (loginData.refreshToken) await saveRefreshToken(loginData.refreshToken);
        if (loginData.user) await saveUser(loginData.user);
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
      await removeRefreshToken();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (updates) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...updates };
      // Async save in background
      saveUser(updatedUser).catch(e => console.error("Failed saving updated user", e));
      return { user: updatedUser };
    });
  }
}));