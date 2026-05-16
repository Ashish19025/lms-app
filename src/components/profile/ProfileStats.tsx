import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  /** An array of statistics to display in the profile stats section */
  stats: { label: string; value: number; icon: string }[];
}


{/* ProfileStats - A component to display key statistics on the user's profile screen
   Props:
     - stats: An array of statistics to display, where each statistic includes a label (e.g. "Courses Enrolled"), a value (e.g. 12), and an icon name from Ionicons (e.g. "school").
   This component renders a horizontal row of statistic cards, each showing an icon, the statistic value, and its label for quick insights into the user's profile activity.
*/}
export function ProfileStats({ stats }: Props) {
  return (
    <View className="flex-row justify-between px-6 mt-6">
      {/* Map through the stats array and render a card for each statistic, displaying the icon, value, and label in a visually appealing format */}
      {stats.map((item) => (
        <View
          key={item.label}
          className="flex-1 mx-1 bg-white rounded-2xl p-4 items-center shadow-sm"
        >
          {/* Display the statistic icon with a background color based on the type of statistic, using Ionicons for consistent iconography */}
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