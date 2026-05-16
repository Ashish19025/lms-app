import React from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { useBookmarks } from '../../hooks/useBookmarks';

// Components
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { ProfileSettingsGroup } from '../../components/profile/ProfileSettingsGroup';

// Static settings data for the profile screen
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

/**
 * ProfileScreen - Displays user profile information, statistics, and settings options.
 * Allows users to view their profile details, see stats like courses and bookmarks, and access settings.
 * Also provides a logout button to sign out of the application.
 */
export default function ProfileScreen() {
  // Extract user information and signOut function from the auth hook
  const { user, signOut } = useAuth();
  // Extract bookmarked course IDs from the bookmarks hook
  const { bookmarkedIds } = useBookmarks();

  // Prepare statistics data for the profile stats component
  const stats = [
    { label: 'Courses', value: 3, icon: 'book-outline' },
    { label: 'Bookmarks', value: bookmarkedIds.length, icon: 'bookmark-outline' },
    { label: 'Completed', value: 1, icon: 'checkmark-done-outline' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white ">
      {/* ScrollView to allow scrolling through profile content on smaller screens */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile header with user information */}
        <ProfileHeader user={user} />
        {/* Profile statistics section */}
        <ProfileStats stats={stats} />
        {/* Profile settings options */}
        <ProfileSettingsGroup settings={settings} />

        {/* Logout */}
        <View className="px-6 mt-8">
          {/* Logout button to sign out of the application */}
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