import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View className="mb-4 w-full">
      {label && <Text className="mb-1 text-sm font-medium text-gray-700">{label}</Text>}
      <TextInput
        className={`w-full rounded-lg border px-4 py-3 text-base text-gray-900 ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
};