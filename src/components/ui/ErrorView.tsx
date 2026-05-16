import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Props for the ErrorView component, which displays an error message and a retry button
interface ErrorViewProps {
  error: Error;
  resetError: () => void;
}

{/* ErrorView - A component to display when an error occurs in the app
   Props:
     - error: The error object containing the error message to display
     - resetError: A function to call when the user wants to retry the action that caused the error
    Features:
      - Displays a user-friendly error message based on the error object
      - Provides a "Try Again" button that calls the resetError function to allow the user to retry the failed action
*/}
export const ErrorView: React.FC<ErrorViewProps> = ({ error, resetError }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 12 }}>Oops, something went wrong!</Text>
      <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 24 }}>
        {error.message || "An unexpected error occurred. Please try again."}
      </Text>
      <TouchableOpacity 
        onPress={resetError}
        style={{ backgroundColor: '#2563EB', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}