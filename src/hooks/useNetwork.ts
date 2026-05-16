import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  // State to track whether the device is currently connected to the internet
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // useEffect to subscribe to network status changes when the component mounts
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });

    // Cleanup function to unsubscribe from network status changes when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Return the current network connectivity status to be used in components that call this hook
  return { isConnected };
};