import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

// Props for the Input component, which extends TextInputProps and includes optional label and error message
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

/* Input - A reusable input component with label and error message support
   Props:
     - label: Optional text to display above the input field as a label
     - error: Optional error message to display below the input field when there is a validation error
     - All other TextInputProps are supported for customization
    Features:
      - Displays a label above the input field if provided
      - Shows an error message below the input field if the error prop is provided, and applies error styling to the input field
      - Supports all standard TextInput props for flexible usage in forms
*/
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