import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCourseStore } from '../../store/course.store';
import { CourseList } from '../../components/course/CourseList';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/auth.store';
import { useNotificationStore } from '../../store/notification.store';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  // Extract user information from the auth store
  const { user } = useAuthStore();
  // Extract course-related state and actions from the course store
  const { filteredCourses, isLoading, loadCourses, searchQuery, setSearchQuery } = useCourseStore();
  // Extract notifications from the notification store
  const { notifications } = useNotificationStore();
  // Get router instance for navigation
  const router = useRouter();
  // Calculate the count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadCourses();
    // Sequence for entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();

    // Subtle continuous pulse for avatar/logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Animated header with welcome message and search bar */}
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }] 
        }}
        className="px-5 pt-2 pb-6 bg-white shadow-sm border-b border-gray-100 rounded-b-3xl mb-2"
      >
        <View className="flex-row justify-between items-center mb-6 mt-4">
          <View className="flex-row items-center gap-3">
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <View className="w-14 h-14 bg-blue-600 rounded-3xl items-center justify-center shadow-lg shadow-blue-300">
                <Ionicons name="school" size={26} color="white" />
              </View>
            </Animated.View>
            <View>
              <Text className="text-sm text-gray-500 font-semibold tracking-wide uppercase">Welcome back</Text>
              <Text className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {user?.username || 'Student'}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/Notification')}
            className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
          >
            <Ionicons name="notifications-outline" size={24} color="#374151" />
            {unreadCount > 0 && (
              <View className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
            )}
          </TouchableOpacity>
        </View>

        <View className="relative flex-row items-center bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100 shadow-inner">
          <Ionicons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <View className="flex-1">
            <TextInput 
              placeholder="Search by course, category or instructor..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
              className="bg-transparent border-0 p-0 text-base text-gray-900"
              style={{ height: 40 }}
            />
          </View>
        </View>
      </Animated.View>

      {/* Course list with pull-to-refresh functionality */}
      <CourseList 
        courses={filteredCourses}
        isLoading={isLoading}
        onRefresh={loadCourses}
      />
    </SafeAreaView>
  );
}