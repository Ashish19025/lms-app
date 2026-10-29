import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/auth.store';
import { View, ActivityIndicator } from 'react-native';

/** Index - The main entry point for the application. It handles the initial redirection based on authentication status.
 */
export default function Index() {
  // Extract authentication state and initialization function from the auth store
  const { isInitialized, user } = useAuthStore();

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // The root layout redirects to login if there's no user
  return <Redirect href="/(tabs)/home" />;
}