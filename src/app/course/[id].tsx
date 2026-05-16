import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'; 
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCourseStore } from '../../store/course.store';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Course } from '../../types/course.types';
import { Button } from '../../components/ui/Button';
import { BookmarkButton } from '../../components/course/BookmarkButton';
import { Ionicons } from '@expo/vector-icons';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const getOrFetchCourse = useCourseStore(state => state.getOrFetchCourse);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadCourse = async () => {
      if (id) {
        setIsLoading(true);
        const fetched = await getOrFetchCourse(Number(id));
        setCourse(fetched);
        setIsLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500 text-lg">Loading course...</Text>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">    
        <Text className="text-gray-500 text-lg">Course not found</Text>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4 w-1/2" />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ top: insets.top + 16, left: 16, zIndex: 50, position: 'absolute' }}
        className="w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons name="arrow-back" size={24} color="#1f2937" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {course.images && course.images.length > 0 ? (
          <Image
            source={{ uri: course.images[0] }}
            className="w-full h-64 bg-gray-200"
            resizeMode="cover"
          />
        ) : course.thumbnail ? (
          <Image
            source={{ uri: course.thumbnail }}
            className="w-full h-64 bg-gray-200"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-64 bg-gray-300 items-center justify-center">
            <Text className="text-gray-500">No image available</Text>
          </View>
        )}
        
        <View className="p-5 bg-white mb-2 shadow-sm rounded-b-3xl border-b border-gray-100">
          <View className="flex-row justify-between items-center mb-3">
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-700 font-semibold text-xs uppercase tracking-wide">{course.category}</Text>
            </View>
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Text className="text-yellow-500 text-lg">★</Text>
                <Text className="font-bold text-gray-700">{course.rating}</Text>
              </View>
              <BookmarkButton courseId={course.id} />
            </View>
          </View>
          
          <Text className="text-2xl font-extrabold text-gray-900 mb-2">{course.title}</Text>
          
          {course.instructor && (
            <View className="flex-row items-center mt-3 bg-gray-50 p-3 rounded-lg">
              <Image
                source={{ uri: course.instructor?.picture?.large || 'https://via.placeholder.com/150' }}
                className="h-12 w-12 rounded-full border border-gray-200 mr-3"
              />
              <View>
                <Text className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Instructor</Text>
                <Text className="text-base font-bold text-gray-900">
                  {course.instructor.name.first} {course.instructor.name.last}
                </Text>
              </View>
            </View>
          )}
        </View>
        
        <View className="p-5">
           <Text className="text-lg font-bold text-gray-900 mb-2">About this course</Text>
           <Text className="text-base text-gray-600 leading-6">{course.description}</Text>
           
           <Text className="text-lg font-bold text-gray-900 mt-6 mb-2">Details</Text>
           <View className="bg-white p-4 rounded-xl border border-gray-100">
             <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500 font-medium">Brand</Text>
                <Text className="text-gray-900 font-semibold">{course.brand}</Text>
             </View>
             <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500 font-medium">Stock</Text>
                <Text className="text-gray-900 font-semibold">{course.stock} Available</Text>
             </View>
           </View>
        </View>

      </ScrollView>

      {/* Floating Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex-row items-center justify-between">
        <View className="flex-col w-1/3">
          <Text className="text-xs text-gray-500 uppercase font-semibold">Price</Text>
          <Text className="text-2xl font-bold text-gray-900">₹{(course.price - (course.price * course.discountPercentage / 100)).toFixed(2)}</Text>
          <Text className="text-xs text-gray-400 line-through">₹{course.price.toFixed(2)}</Text>
        </View>
        
        <View className="flex-1 ml-4 shadow-sm">
          <Button 
            title="Enroll Now" 
            onPress={() => router.push(`/webview/${course.id}`)} 
          />
        </View>
      </View>
    </View>
  );
}