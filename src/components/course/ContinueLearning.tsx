import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProgressStore } from '../../store/progress.store';
import { useCourseStore } from '../../store/course.store';
import { ProgressBar } from './ProgressBar';
import { LESSONS_PER_COURSE } from '../../utils/lessons';

/* ContinueLearning - Horizontal row of enrolled, unfinished courses. Tapping one opens the next lesson. */
export function ContinueLearning() {
  const router = useRouter();
  const enrolledIds = useProgressStore((s) => s.enrolledIds);
  const completed = useProgressStore((s) => s.completed);
  const getNextLesson = useProgressStore((s) => s.getNextLesson);
  const courses = useCourseStore((s) => s.courses);

  const inProgress = enrolledIds
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c && (completed[c.id]?.length || 0) < LESSONS_PER_COURSE);

  if (inProgress.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-lg font-bold text-gray-900 mb-3">Continue learning</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {inProgress.map((course) => {
          const next = getNextLesson(course.id);
          return (
            <TouchableOpacity
              key={course.id}
              activeOpacity={0.8}
              onPress={() => router.push(`/webview/${course.id}?lesson=${next}`)}
              className="mr-3 w-64 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm"
            >
              <View className="flex-row items-center mb-3">
                <Image source={{ uri: course.thumbnail }} className="w-12 h-12 rounded-xl bg-gray-200 mr-3" />
                <View className="flex-1">
                  <Text className="font-bold text-gray-900" numberOfLines={1}>{course.title}</Text>
                  <Text className="text-xs text-gray-500">Lesson {next + 1} of {LESSONS_PER_COURSE}</Text>
                </View>
                <Ionicons name="play-circle" size={30} color="#2563EB" />
              </View>
              <ProgressBar progress={(completed[course.id]?.length || 0) / LESSONS_PER_COURSE} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
