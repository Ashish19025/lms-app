import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '../../validators/auth';
/** * LoginScreen component allows users to sign in using their username or email and password.
 * It uses react-hook-form for form management and zod for validation.
 * The component also provides navigation to the registration screen for new users.
 */
export default function LoginScreen() {
  const router = useRouter();
  // Extract signIn function and auth state from the auth store
  const { signIn, isLoading, error } = useAuthStore();

  // Set up form management with react-hook-form and zod validation
  const { control, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  // Handle form submissionfor login
  const onSubmit = async (values: LoginSchema) => {
    try {
      // Determine if the identifier is an email or username
      const isEmail = values.identifier.includes('@');
      // Prepare payload based on whether the identifier is an email or username
      const payload = Object.assign(
        { password: values.password },
        isEmail ? { email: values.identifier.trim().toLowerCase() } : { username: values.identifier.trim().toLowerCase() }
      );

      await signIn(payload);
    } catch (e) {
      // error handled in store
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
            <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
            <Text className="mt-2 text-base text-gray-600">Please sign in to continue learning</Text>
          </View>

          {/* Display error message if login fails */}
          {error && (
            <View className="mb-4 rounded-lg bg-red-100 p-3">
              <Text className="text-sm text-red-700">{error}</Text>
            </View>
          )}

          {/* Input for username or email */}
          <Controller
            control={control}
            name="identifier"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Username or Email"
                placeholder="Enter your username or email"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.identifier?.message}
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
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />
          {/* Button to submit the login form */}
          <Button 
            title="Sign In" 
            onPress={handleSubmit(onSubmit)} 
            loading={isLoading}
            className="mt-4"
          />
          {/* Link to registration screen for users who don't have an account */}
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