import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function NotificationsEmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 mt-32">
      <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-6">
        <Ionicons
          name="notifications-off-outline"
          size={42}
          color="#2563eb"
        />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-3">
        No Notifications
      </Text>
      <Text className="text-center text-gray-500 leading-6">
        You're all caught up. Notifications will appear here.
      </Text>
    </View>
  );
}