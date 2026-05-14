import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { LegendList } from '@legendapp/list';
import { Course } from '../../types/course.types';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Course[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, isLoading, onRefresh }) => {
  const renderItem = ({ item }: { item: Course }) => {
    return <CourseCard course={item} />;
  };

  if (isLoading && courses.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8 mt-10">
        <Text className="text-gray-500 text-base text-center">No courses found matching your criteria.</Text>
      </View>
    );
  }

  return (
    <LegendList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      estimatedItemSize={280}
      contentContainerStyle={{ padding: 16 }}
      refreshing={isLoading}
      onRefresh={onRefresh}
    />
  );
};