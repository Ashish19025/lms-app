import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { CourseCard } from '../../components/course/CourseCard';
import { useCourseStore } from '../../store/course.store';

export default function BookmarksScreen() {
  const router = useRouter();

  const courses = useCourseStore((state) => state.courses);

  /**
   * TEMPORARY:
   * Later replace with actual bookmark store
   */
  const bookmarkedCourses = courses.slice(0, 4);

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-8 mt-32">
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-5 bg-white border-b border-gray-100">
        <Text className="text-3xl font-bold text-gray-900">
          Bookmarks
        </Text>

        <Text className="text-sm text-gray-500 mt-1">
          Your saved learning collection
        </Text>
      </View>

      {/* Stats Card */}
      <View className="px-6 mt-5">
        <View className="bg-blue-600 rounded-3xl p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-blue-100 text-sm">
                Saved Courses
              </Text>

              <Text className="text-white text-3xl font-bold mt-2">
                {bookmarkedCourses.length}
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

      {/* Bookmarks List */}
      <FlatList
        data={bookmarkedCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="px-6">
            <CourseCard course={item} />
          </View>
        )}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 120,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}