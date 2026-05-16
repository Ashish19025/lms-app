import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingItem {
  // title - The title of the setting item to be displayed in the settings group
  title: string;
  // icon - The name of the Ionicons icon to be displayed next to the setting title
  icon: string;
}

interface Props {
  // settings - An array of setting items to be displayed in the profile settings group
  settings: SettingItem[];
}

/* ProfileSettingsGroup - A component to display a group of profile settings in the profile screen
   Props:
     - settings: An array of setting items, each containing a title and an icon name
    Features:
      - Displays a list of profile settings with icons and titles
      - Each setting item is rendered as a touchable row with an icon, title, and chevron for navigation indication
      - The component is designed to be reusable for different groups of settings in the profile screen
*/
export function ProfileSettingsGroup({ settings }: Props) {
  return (
    <View className="px-6 mt-8">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Settings
      </Text>
      {/* Container for the list of settings, styled as a white card with rounded corners and shadow */}
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
            {/* Icon for the setting item, displayed in a rounded background */}
            <View className="w-11 h-11 rounded-xl bg-gray-100 items-center justify-center">
              <Ionicons
                name={item.icon as any}
                size={20}
                color="#111827"
              />
            </View>
            {/* Title of the setting item, displayed next to the icon */}
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