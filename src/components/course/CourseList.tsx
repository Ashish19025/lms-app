import React, { useCallback } from 'react';
import { View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { LegendList } from '@legendapp/list';
import { Course } from '../../types/course.types';
import { CourseCard } from './CourseCard';
import { CourseCardSkeleton } from './CourseCardSkeleton';

interface CourseListProps {
  // courses - The courses to show
  courses: Course[];
  // isLoading - True while the first page is loading or refreshing
  isLoading: boolean;
  // isLoadingMore - True while the next page is loading (shows a footer spinner)
  isLoadingMore?: boolean;
  // onRefresh - Called on pull-to-refresh
  onRefresh: () => void;
  // onEndReached - Called near the bottom of the list to load more
  onEndReached?: () => void;
  // header - Optional content shown above the courses (scrolls with the list)
  header?: React.ReactElement | null;
}

/* CourseList - Course feed with skeleton loading, pull-to-refresh, infinite scroll and an empty state */
export const CourseList: React.FC<CourseListProps> = ({
  courses,
  isLoading,
  isLoadingMore = false,
  onRefresh,
  onEndReached,
  header = null,
}) => {
  const renderItem = useCallback(({ item }: { item: Course }) => <CourseCard course={item} />, []);

  // First load: show placeholder cards instead of a bare spinner
  if (isLoading && courses.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        {header}
        {[0, 1, 2].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <LegendList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      estimatedItemSize={280}
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View className="items-center justify-center p-8 mt-10">
          <Text className="text-gray-500 text-base text-center">No courses found matching your criteria.</Text>
        </View>
      }
      ListFooterComponent={
        isLoadingMore ? (
          <View className="py-6">
            <ActivityIndicator color="#2563EB" />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isLoading && courses.length > 0}
          onRefresh={onRefresh}
          colors={['#2563EB']}
          tintColor="#2563EB"
        />
      }
    />
  );
};
