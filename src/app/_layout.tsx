import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, View, Text } from 'react-native';
import { useAuthStore } from '../store/auth.store';
import { useNotificationStore } from '../store/notification.store';
import { requestNotificationPermissions, scheduleInactivityReminder } from '../services/notifications/notification.service';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * RootLayout - The main layout component that wraps the entire application. It handles authentication state, network status, and initializes necessary data on app startup.
 * It also manages redirection based on authentication status and displays a global offline banner when there is no internet connection.
 */
export default function RootLayout() {
  // Extract authentication state and initialization function from the auth store
  const { isInitialized, user, initialize } = useAuthStore();
  // Get router instance and segments for navigation and route management
  const segments = useSegments();
  // Local state to manage offline status
  const router = useRouter();
  // Ref to track the current app state for managing inactivity reminders
  const appState = useRef(AppState.currentState);
  // Local state to track network connectivity status
  const [isOffline, setIsOffline] = useState(false);

  // Effect to handle app initialization, network monitoring, and notification setup
  useEffect(() => {
    // Network monitor
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsOffline(state.isConnected === false);
    });

    // Initialize authentication state and user data on app startup
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

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      subscription.remove();
      unsubscribeNetInfo();
    };
  }, []);

  // Effect to handle redirection based on authentication status and current route segments
   useEffect(() => {
    if (!isInitialized) return;

    // Check if the current route is within the authentication group (e.g., login, register)
    const inAuthGroup = segments[0] === '(auth)';

    // Redirect logic:
    // - If the user is not authenticated and trying to access non-auth routes, redirect to login
    // - If the user is authenticated and trying to access auth routes, redirect to home
    if (!user && !inAuthGroup) {
      // Redirect to login if user is not authenticated
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if user is authenticated and trying to access auth screens
      router.replace('/(tabs)/home');
    }
  }, [user, isInitialized, segments]);

  return (
    <SafeAreaProvider>
      {/* Global offline banner that appears at the top of the screen when there is no internet connection */}
      {isOffline && (
        <View style={{ paddingTop: 40, backgroundColor: '#EF4444', paddingBottom: 10, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>No Internet Connection</Text>
        </View>
      )}
      <Slot />
    </SafeAreaProvider>
  );
}