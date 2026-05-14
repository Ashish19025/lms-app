import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCourseStore } from '../../store/course.store';
import { CourseList } from '../../components/course/CourseList';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/auth.store';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { filteredCourses, isLoading, loadCourses, searchQuery, setSearchQuery } = useCourseStore();

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View className="px-4 py-4 bg-white border-b border-gray-200">
        <View className="mb-4">
          <Text className="text-sm text-gray-500">Welcome back,</Text>
          <Text className="text-xl font-bold text-gray-900">{user?.username || 'Student'}</Text>
        </View>
        <Input 
          placeholder="Search courses or instructors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <CourseList 
        courses={filteredCourses}
        isLoading={isLoading}
        onRefresh={loadCourses}
      />
    </SafeAreaView>
  );
}