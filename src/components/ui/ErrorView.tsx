import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorViewProps {
  error: Error;
  resetError: () => void;
}

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