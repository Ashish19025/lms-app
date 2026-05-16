import React from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { useBookmarks } from '../../hooks/useBookmarks';

// Components
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { ProfileSettingsGroup } from '../../components/profile/ProfileSettingsGroup';

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
  const { user, signOut } = useAuth();
  const { bookmarkedIds } = useBookmarks();

  const stats = [
    { label: 'Courses', value: 3, icon: 'book-outline' },
    { label: 'Bookmarks', value: bookmarkedIds.length, icon: 'bookmark-outline' },
    { label: 'Completed', value: 1, icon: 'checkmark-done-outline' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ProfileHeader user={user} />
        
        <ProfileStats stats={stats} />

        <ProfileSettingsGroup settings={settings} />

        {/* Logout */}
        <View className="px-6 mt-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={signOut}
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