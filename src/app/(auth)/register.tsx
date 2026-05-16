import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../lib/logger';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '../../validators/auth';

/*
  * RegisterScreen component allows new users to create an account by providing a username, email, and password.
  * It uses react-hook-form for form management and zod for validation.
  * The component also provides navigation back to the login screen for existing users.
*/
export default function RegisterScreen() {
  const router = useRouter();
  // Extract signUp function and auth state from the auth store
  const { signUp, isLoading, error } = useAuthStore();

  // Set up form management with react-hook-form and zod validation
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    // Use zodResolver to integrate zod validation schema with react-hook-form
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  // Handle form submission for registration
  const onSubmit = async (values: RegisterSchema) => {
    try {
      await signUp(values);
    } catch (e) {
      logger.error('Registration failed', e);
      // Error handled in store
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* KeyboardAvoidingView to ensure the form is visible when the keyboard is open */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* ScrollView to allow scrolling when the keyboard is open and on smaller screens */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
            <Text className="mt-2 text-base text-gray-600">Start your learning journey today</Text>
          </View>

          {/* Display error message if registration fails */}
          {error && (
            <View className="mb-4 rounded-lg bg-red-100 p-3">
              <Text className="text-sm text-red-700">{error}</Text>
            </View>
          )}

          {/* Input for username */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Username"
                placeholder="Choose a username"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                error={errors.username?.message}
              />
            )}
          />

          {/* Input for email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          {/* Input for password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          {/* Button to submit the registration form */}
          <Button 
            title="Create Account" 
            onPress={handleSubmit(onSubmit)} 
            loading={isLoading}
            className="mt-4"
          />

          {/* Link to login screen for users who already have an account */}
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