import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      await signUp({ username, email, password });
      // The _layout guard will automatically intercept the active user in the store and push to home
    } catch (e) {
      logger.error('Registration failed', e);
      // Error is handled in the store
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
            <Text className="mt-2 text-base text-gray-600">Start your learning journey today</Text>
          </View>

          {error && (
            <View className="mb-4 rounded-lg bg-red-100 p-3">
              <Text className="text-sm text-red-700">{error}</Text>
            </View>
          )}

          <Input
            label="Username"
            placeholder="Choose a username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button 
            title="Create Account" 
            onPress={handleRegister} 
            loading={isLoading}
            className="mt-4"
          />

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="font-semibold text-blue-600">Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}