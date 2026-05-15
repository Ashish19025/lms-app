import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseCard } from '../../components/course/CourseCard';
import { useCourseStore } from '../../store/course.store';
import { useBookmarks } from '../../hooks/useBookmarks';

// Components
import { BookmarksEmptyState } from '../../components/bookmarks/BookmarksEmptyState';
import { BookmarksStatsCard } from '../../components/bookmarks/BookmarksStatsCard';

export default function BookmarksScreen() {
  const courses = useCourseStore((state) => state.courses);
  const { bookmarkedIds } = useBookmarks();

  const bookmarkedCourses = courses.filter(course => bookmarkedIds.includes(course.id));

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

      <BookmarksStatsCard count={bookmarkedCourses.length} />

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
        ListEmptyComponent={BookmarksEmptyState}
      />
    </SafeAreaView>
  );
}