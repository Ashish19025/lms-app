import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'bookmark' | 'course' | 'reminder' | 'system';
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Course Bookmarked',
    message: 'You bookmarked React Native Advanced Patterns.',
    time: '2 min ago',
    read: false,
    type: 'bookmark',
  },
  {
    id: '2',
    title: 'Learning Reminder',
    message: 'Continue your UI/UX Design course today.',
    time: '1 hour ago',
    read: false,
    type: 'reminder',
  },
  {
    id: '3',
    title: 'New Course Available',
    message: 'A new AI Engineering course has been added.',
    time: 'Yesterday',
    read: true,
    type: 'course',
  },
  {
    id: '4',
    title: 'System Update',
    message: 'Your app has been updated successfully.',
    time: '2 days ago',
    read: true,
    type: 'system',
  },
];

const getNotificationIcon = (type: NotificationItem['type']) => {
  switch (type) {
    case 'bookmark':
      return 'bookmark';
    case 'course':
      return 'school';
    case 'reminder':
      return 'notifications';
    case 'system':
      return 'settings';
    default:
      return 'notifications';
  }
};

const getNotificationColor = (type: NotificationItem['type']) => {
  switch (type) {
    case 'bookmark':
      return 'bg-yellow-100';
    case 'course':
      return 'bg-blue-100';
    case 'reminder':
      return 'bg-red-100';
    case 'system':
      return 'bg-green-100';
    default:
      return 'bg-gray-100';
  }
};

export default function NotificationsScreen() {
  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const renderEmptyState = () => (
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
              Stay updated with your learning activity
            </Text>
          </View>

          {unreadCount > 0 && (
            <View className="bg-blue-600 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">
                {unreadCount} New
              </Text>
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
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className={`mb-4 rounded-3xl p-5 shadow-sm border ${
              item.read
                ? 'bg-white border-gray-100'
                : 'bg-blue-50 border-blue-100'
            }`}
          >
            <View className="flex-row">
              {/* Icon */}
              <View
                className={`w-14 h-14 rounded-2xl items-center justify-center ${getNotificationColor(
                  item.type
                )}`}
              >
                <Ionicons
                  name={getNotificationIcon(item.type) as any}
                  size={24}
                  color="#111827"
                />
              </View>

              {/* Content */}
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
                  {item.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}