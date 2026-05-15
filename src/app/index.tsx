import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/auth.store';
import { View, ActivityIndicator } from 'react-native';
import { login } from '../services/api/auth.api';

export default function Index() {
  const { isInitialized, user } = useAuthStore();

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Bypass auth checks for now and go directly to home
  return <Redirect href="/(tabs)/home" />;
}