import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useNetwork } from '../../hooks/useNetwork';

export const OfflineBanner = () => {
  const { isConnected } = useNetwork();

  if (isConnected) return null;

  return (
    <View style={{ backgroundColor: '#EF4444', padding: 8, paddingTop: Platform.OS === 'ios' ? 40 : 8, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>No Internet Connection</Text>
    </View>
  );
};