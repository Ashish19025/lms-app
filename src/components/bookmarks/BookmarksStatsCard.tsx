import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  count: number;
}

export function BookmarksStatsCard({ count }: Props) {
  return (
    <View className="px-6 mt-5">
      <View className="bg-blue-600 rounded-3xl p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-blue-100 text-sm">
              Saved Courses
            </Text>

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