import { useAuthStore } from '../store/auth.store';

export function useAuth() {
  const { user, isInitialized, signIn, signOut, isLoading, error } = useAuthStore();

  return {
    user,
    isInitialized,
    signIn,
    signOut,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}
