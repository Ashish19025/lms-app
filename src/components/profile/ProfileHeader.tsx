import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface Props {
  user: any;
}

export function ProfileHeader({ user }: Props) {
  return (
    <View className="px-6 pt-6 pb-8 bg-white rounded-b-3xl shadow-sm">      
      <View className="items-center">
        <Image
          source={{
            uri: user?.avatar || 'https://i.pravatar.cc/300',
          }}
          className="w-28 h-28 rounded-full border-4 border-blue-100"       
        />
        <Text className="mt-4 text-2xl font-bold text-gray-900">
          {user?.username || 'Guest User'}
        </Text>
        <Text className="mt-1 text-sm text-gray-500">
          {user?.email || 'guest@example.com'}
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
  );
}