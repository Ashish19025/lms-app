import React, { useCallback } from 'react';
import { View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { LegendList } from '@legendapp/list';
import { Course } from '../../types/course.types';
import { CourseCard } from './CourseCard';


interface CourseListProps {
  // courses - An array of course data to display in the list
  courses: Course[];
  // isLoading - A boolean indicating if the course data is currently being loaded
  isLoading: boolean;
  // onRefresh - A function to call when the user pulls to refresh the course list
  onRefresh: () => void;
}

/* CourseList - A component to display a list of courses with loading and empty states
   Props:
     - courses: An array of course data to display in the list
      - isLoading: A boolean indicating if the course data is currently being loaded
      - onRefresh: A function to call when the user pulls to refresh the course list
    Features:
      - Displays a loading indicator while courses are being fetched
      - Shows an empty state message if no courses are found
      - Renders a list of CourseCard components for each course in the courses array
      - Supports pull-to-refresh functionality to reload the course data
*/
export const CourseList: React.FC<CourseListProps> = ({ courses, isLoading, onRefresh }) => {
  // Render function for each course item in the list, using CourseCard to display course details
  const renderItem = ({ item }: { item: Course }) => {
    return <CourseCard course={item} />;
  };

  // Memoized callback for handling pull-to-refresh action, calls the onRefresh prop function
  const handleRefresh = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  // Show loading indicator if data is being loaded and there are no courses to display yet
  if (isLoading && courses.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Show empty state message if loading is complete but no courses were found
  if (courses.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8 mt-10">
        <Text className="text-gray-500 text-base text-center">No courses found matching your criteria.</Text>
      </View>
    );
  }

  return (
    <LegendList
      data={courses} //Features: Pass the courses array as the data source for the list
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem} //Features: Use the renderItem function to render each course item using the CourseCard component
      estimatedItemSize={280}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading && courses.length > 0}
          onRefresh={handleRefresh}
          colors={['#2563EB']} // Android
          tintColor="#2563EB" // iOS
        />
      }
    />
  );
};