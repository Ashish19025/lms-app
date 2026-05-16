import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  // count - The total number of saved courses/bookmarks to display in the card.
  count: number;
}

// BookmarksStatsCard - Displays the total count of saved courses in a visually appealing card format.
export function BookmarksStatsCard({ count }: Props) {
  return (
    <View className="px-6 mt-5">
      {/* Card container with blue background and rounded corners */}
      <View className="bg-blue-600 rounded-3xl p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-blue-100 text-sm">
              Saved Courses
            </Text>

            {/* Display the count of saved courses in large, bold text */}
            <Text className="text-white text-3xl font-bold mt-2">
              {count}
            </Text>
          </View>

          <View className="w-16 h-16 rounded-2xl bg-blue-500 items-center justify-center">
            <Ionicons
              name="bookmark"
              size={30}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
}