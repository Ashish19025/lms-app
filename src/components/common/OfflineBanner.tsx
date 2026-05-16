import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useNetwork } from '../../hooks/useNetwork';

/**
 * OfflineBanner - Displays a banner at the top of the screen when there is no internet connection.
 * Uses the useNetwork hook to determine connectivity status and conditionally renders the banner.
 */
export const OfflineBanner = () => {
  // Extract isConnected from the useNetwork hook to determine if the device is online or offline
  const { isConnected } = useNetwork();

  // If the device is connected to the internet, do not render anything
  if (isConnected) return null;
  return (
    <View style={{ backgroundColor: '#EF4444', padding: 8, paddingTop: Platform.OS === 'ios' ? 40 : 8, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>No Internet Connection</Text>
    </View>
  );
};