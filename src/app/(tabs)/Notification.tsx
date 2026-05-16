import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotificationStore } from '../../store/notification.store';

// Components
import { NotificationsEmptyState } from '../../components/notifications/NotificationsEmptyState';
import { NotificationCard, NotificationItem } from '../../components/notifications/NotificationCard';

/**
 * NotificationsScreen - Displays a list of user notifications with options to mark as read.
 */
export default function NotificationsScreen() {
  // Extract notifications and related actions from the notification store
  const { notifications, initializeNotifications, markAllAsRead, markAsRead } = useNotificationStore();
  // Calculate the count of unread notifications
  const unreadCount = notifications.filter((item) => !item.read).length;

  // Initialize notifications when the component mounts
  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-5 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-gray-900">
              Notifications
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Stay with your learning activity
            </Text>
          </View>

          {unreadCount > 0 && (
            <View className="flex-col items-end">
              <View className="bg-blue-600 px-3 py-1 rounded-full mb-2">
                <Text className="text-white text-xs font-bold">
                  {unreadCount} New
                </Text>
              </View>
              <TouchableOpacity onPress={markAllAsRead}>
                <Text className="text-xs text-blue-600 font-semibold">Mark all read</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={NotificationsEmptyState}
        renderItem={({ item }) => (
          <NotificationCard 
            item={item} 
            onPress={() => !item.read && markAsRead(item.id)} 
          />
        )}
      />
    </SafeAreaView>
  );
}