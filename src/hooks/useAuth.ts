import { useAuthStore } from '../store/auth.store';

export function useAuth() {
  // Extract user, initialization status, authentication functions, loading state, and error state from the auth store
  const { user, isInitialized, signIn, signOut, isLoading, error } = useAuthStore();

  {/* Return the authentication state and functions to be used in components that call this hook */}
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
