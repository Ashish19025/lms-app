import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuthStore } from '../store/auth.store';
import { useNotificationStore } from '../store/notification.store';
import { requestNotificationPermissions, scheduleInactivityReminder } from '../services/notifications/notification.service';

export default function RootLayout() {
  const { isInitialized, user, initialize } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    initialize();
    
    // Initialize notifications data
    useNotificationStore.getState().initializeNotifications();
    
    // Request notification permissions explicitly on startup
    requestNotificationPermissions();
    // Schedule the 24h reminder
    scheduleInactivityReminder();

    // Reset inactivity timer when app comes from background to active
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        scheduleInactivityReminder();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

   useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to login if user is not authenticated
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if user is authenticated and trying to access auth screens
      router.replace('/(tabs)/home');
    }
  }, [user, isInitialized, segments]);

  return <Slot />;
}