import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export default function RootLayout() {
  const { isInitialized, user, initialize } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

   useEffect(() => {
    if (!isInitialized) return;
/*
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to login if user is not authenticated
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if user is authenticated and trying to access auth screens
      router.replace('/(tabs)/home');
    }
      */
  }, [user, isInitialized, segments]);

  return <Slot />;
}