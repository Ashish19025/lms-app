import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/auth.store';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { isInitialized, user } = useAuthStore();

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Redirect based on auth state
  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}