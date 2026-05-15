import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingItem {
  title: string;
  icon: string;
}

interface Props {
  settings: SettingItem[];
}

export function ProfileSettingsGroup({ settings }: Props) {
  return (
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
  );
}