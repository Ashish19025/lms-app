import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  stats: { label: string; value: number; icon: string }[];
}

export function ProfileStats({ stats }: Props) {
  return (
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
  );
}