import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuthStore();
  const [username, setUsername] = useState<string>(''); // Dummy data for faster testing if needed
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Check if input is an email, and pass the appropriate property
      const isEmail = username.includes('@');
      const payload = Object.assign(
        { password },
        isEmail ? { email: username.trim().toLowerCase() } : { username: username.trim().toLowerCase() }
      );
      
      await signIn(payload);
    } catch (e) {
      // Error is handled in the store
    }
  };  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
            <Text className="mt-2 text-base text-gray-600">Please sign in to continue learning</Text>
          </View>

          {error && (
            <View className="mb-4 rounded-lg bg-red-100 p-3">
              <Text className="text-sm text-red-700">{error}</Text>
            </View>
          )}

          <Input
            label="Username or Email"
            placeholder="Enter your username or email"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button 
            title="Sign In" 
            onPress={handleLogin} 
            loading={isLoading}
            className="mt-4"
          />

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="font-semibold text-blue-600">Create one</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}