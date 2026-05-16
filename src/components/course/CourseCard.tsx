import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Course } from '../../types/course.types';
import { useRouter } from 'expo-router';
import { BookmarkButton } from './BookmarkButton';

interface CourseCardProps {
  // course - The course data to display in the card
  course: Course;
}


/* CourseCard - A card component to display course information in a concise format
   Props:
     - course: The course data to display, including title, description, instructor, price, etc.
    Features:
      - Displays course image, title, description, instructor info, and price
      - Includes a bookmark button to toggle bookmark status for the course
      - Navigates to course detail screen when pressed
*/
export const CourseCard = React.memo(function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  // Handle press event to navigate to course detail screen
  const handlePress = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-xl bg-white shadow-md border border-gray-100"
      activeOpacity={0.7}
      onPress={handlePress}
    >
      {/* Course image with fallback to thumbnail or placeholder if not available */}
      <Image
        source={{ uri: course.images?.[0] || course.thumbnail || 'https://via.placeholder.com/400x200?text=No+Image' }}
        resizeMode="cover"
        className="h-40 w-full rounded-t-xl"
      />

      {/* Course details section */}
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs font-semibold text-blue-600 uppercase">{course.category}</Text>
          <View className="-my-2 -mr-2">
            <BookmarkButton courseId={course.id} />
          </View>
        </View>

        {/* Course title and description with truncation for long text */}
        <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={2}>
          {course.title}
        </Text>
        {/* Display course description with truncation to 2 lines for better card layout */}
        <Text className="text-sm text-gray-500 mb-3" numberOfLines={2}>
          {course.description}
        </Text>
        {/* Instructor info and course price displayed at the bottom of the card */}
        <View className="flex-row items-center justify-between mt-auto">
          {/* Display instructor information if available, including thumbnail and name */}
          {course.instructor && (
            <View className="flex-row items-center">
              <Image
                source={{ uri: course.instructor?.picture?.thumbnail || 'https://via.placeholder.com/150' }}
                className="h-6 w-6 rounded-full bg-gray-300 mr-2"
              />
              <Text className="text-sm text-gray-700 font-medium">
                {course.instructor.name.first} {course.instructor.name.last}
              </Text>
            </View>
          )}
          {/* Display course price, formatted as currency, or "Free" if price is 0 */}
          <View>
            <Text className="text-sm font-bold text-gray-900">${course.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});