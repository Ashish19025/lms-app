import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const stats = [
  {
    label: 'Courses',
    value: 12,
    icon: 'book-outline',
  },
  {
    label: 'Bookmarks',
    value: 8,
    icon: 'bookmark-outline',
  },
  {
    label: 'Completed',
    value: 5,
    icon: 'checkmark-done-outline',
  },
];

const settings = [
  {
    title: 'Edit Profile',
    icon: 'person-outline',
  },
  {
    title: 'Notifications',
    icon: 'notifications-outline',
  },
  {
    title: 'Privacy & Security',
    icon: 'shield-checkmark-outline',
  },
  {
    title: 'Help & Support',
    icon: 'help-circle-outline',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-8 bg-white rounded-b-3xl shadow-sm">
          <View className="items-center">
            <Image
              source={{
                uri: 'https://i.pravatar.cc/300',
              }}
              className="w-28 h-28 rounded-full border-4 border-blue-100"
            />

            <Text className="mt-4 text-2xl font-bold text-gray-900">
              Ashish Kumar
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
              ashish@example.com
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              className="mt-5 px-5 py-3 bg-blue-600 rounded-2xl"
            >
              <Text className="text-white font-semibold">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between px-6 mt-6">
          {stats.map((item) => (
            <View
              key={item.label}
              className="flex-1 mx-1 bg-white rounded-2xl p-4 items-center shadow-sm"
            >
              <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-3">
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color="#2563eb"
                />
              </View>

              <Text className="text-xl font-bold text-gray-900">
                {item.value}
              </Text>

              <Text className="text-sm text-gray-500 mt-1">
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Settings
          </Text>

          <View className="bg-white rounded-3xl overflow-hidden shadow-sm">
            {settings.map((item, index) => (
              <TouchableOpacity
                key={item.title}
                activeOpacity={0.7}
                className={`flex-row items-center px-5 py-5 ${
                  index !== settings.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
              >
                <View className="w-11 h-11 rounded-xl bg-gray-100 items-center justify-center">
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color="#111827"
                  />
                </View>

                <Text className="flex-1 ml-4 text-base font-medium text-gray-800">
                  {item.title}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <View className="px-6 mt-8">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-red-500 py-4 rounded-2xl items-center"
          >
            <Text className="text-white font-bold text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}