import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Course } from '../../types/course.types';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

// We'll update this component later to include actual Bookmark storage functionality.
interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <TouchableOpacity 
      className="mb-4 overflow-hidden rounded-xl bg-white shadow-md border border-gray-100"
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Image
  source={{ uri: course.images?.[0] || course.thumbnail?.[0] || 'https://via.placeholder.com/400x200?text=No+Image' }}
  contentFit="cover"
  transition={300}
  cachePolicy="memory-disk"
  className="h-40 w-full rounded-t-xl"
/>
      
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs font-semibold text-blue-600 uppercase">{course.category}</Text>
          <TouchableOpacity className="p-1">
            {/* Bookmark placeholder */}
            <Text className="text-gray-400">☆</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={2}>
          {course.title}
        </Text>
        
        <Text className="text-sm text-gray-500 mb-3" numberOfLines={2}>
          {course.description}
        </Text>

        <View className="flex-row items-center justify-between mt-auto">
          {course.instructor && (
            <View className="flex-row items-center">
              <Image 
                source={{ uri: course.instructor.picture.thumbnail }} 
                className="h-6 w-6 rounded-full bg-gray-300 mr-2"
              />
              <Text className="text-sm text-gray-700 font-medium">
                {course.instructor.name.first} {course.instructor.name.last}
              </Text>
            </View>
          )}
          <View>
            <Text className="text-sm font-bold text-gray-900">${course.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};