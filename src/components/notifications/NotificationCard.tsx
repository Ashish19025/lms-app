import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types of notification items to be displayed in the notification list
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'bookmark' | 'course' | 'reminder' | 'system';
}

// Props for the NotificationCard component, which displays individual notification details
interface Props {
  item: NotificationItem;
}

// Helper function to determine the appropriate icon based on the notification type
const getNotificationIcon = (type: NotificationItem['type']) => {
  switch (type) {
    case 'bookmark': return 'bookmark';
    case 'course': return 'school';
    case 'reminder': return 'notifications';
    case 'system': return 'flag';
    default: return 'notifications';
  }
};

// Helper function to determine the background color based on the notification type
const getNotificationColor = (type: NotificationItem['type']) => {
  switch (type) {
    case 'bookmark': return 'bg-yellow-400';
    case 'course': return 'bg-blue-100';
    case 'reminder': return 'bg-red-100';
    case 'system': return 'bg-green-500';
    default: return 'bg-gray-100';
  }
};

// NotificationCard - A card component to display individual notification details in the notification list
export const NotificationCard = React.memo(function NotificationCard({ item, onPress }: Props & { onPress?: () => void }) {
  // Parse the notification time and format it for display
  const date = new Date(item.time);
  // Format the time to a more user-friendly format, showing date and time if valid, otherwise showing raw time string
  const formattedTime = isNaN(date.getTime()) 
    ? item.time 
    : date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`mb-4 rounded-3xl p-5 shadow-sm border ${
        item.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'
      }`} // Apply different background and border colors based on read status
    >
      {/* Notification content layout with icon, title, message, and time */}
      <View className="flex-row">
        <View
          className={`w-14 h-14 rounded-2xl items-center justify-center ${getNotificationColor(item.type)}`}
        >
          <Ionicons
            name={getNotificationIcon(item.type) as any}
            size={24}
            color="#111827"
          />
        </View>

        <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-gray-900 flex-1">
              {item.title}
            </Text>
            {!item.read && (
              <View className="w-3 h-3 rounded-full bg-blue-600 ml-2" />
            )}
          </View>
          <Text className="text-sm text-gray-600 mt-2 leading-5">
            {item.message}
          </Text>
          <Text className="text-xs text-gray-400 mt-3">
            {formattedTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});