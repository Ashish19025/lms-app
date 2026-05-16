import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function BookmarksEmptyState() {
  // Get the router instance to navigate to the home screen when the button is pressed
  const router = useRouter();
  
  return (
    <View className="flex-1 items-center justify-center px-8 mt-32">
      {/* Icon representing an empty bookmark state */}
      <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-6">
        <Ionicons
          name="bookmark-outline"
          size={42}
          color="#2563eb"
        />
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-3">
        No Bookmarks Yet
      </Text>

      <Text className="text-center text-gray-500 leading-6 mb-8">
        Save your favorite courses to access them quickly anytime.
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/(tabs)/home')}
        className="bg-blue-600 px-6 py-4 rounded-2xl"
      >
        <Text className="text-white font-semibold">
          Explore Courses
        </Text>
      </TouchableOpacity>
    </View>
  );
}