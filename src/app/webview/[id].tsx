import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCourseStore } from '../../store/course.store';
import { useProgressStore } from '../../store/progress.store';
import { getLessons, LESSONS_PER_COURSE } from '../../utils/lessons';
import { Course } from '../../types/course.types';

// Course text comes from the API, so escape it before putting it into HTML
const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export default function LessonScreen() {
  const { id, lesson } = useLocalSearchParams<{ id: string; lesson?: string }>();
  const router = useRouter();
  const courseId = Number(id);
  const lessonIndex = Math.min(Math.max(Number(lesson) || 0, 0), LESSONS_PER_COURSE - 1);

  const getOrFetchCourse = useCourseStore((s) => s.getOrFetchCourse);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const [course, setCourse] = useState<Course | undefined>(() => useCourseStore.getState().getCourseById(courseId));
  const [loading, setLoading] = useState(!course);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (course) return;
    getOrFetchCourse(courseId).then((c) => {
      setCourse(c);
      setLoading(false);
    });
  }, [courseId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Text style={{ color: '#6b7280', fontSize: 16 }}>Course not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16, backgroundColor: '#2563EB', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const current = getLessons(course)[lessonIndex];
  const isLast = lessonIndex === LESSONS_PER_COURSE - 1;

  const htmlContent = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: -apple-system, Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #1f2937; line-height: 1.6; background: #f9fafb; }
  .container { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  img { width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; }
  h1 { font-size: 22px; color: #111827; margin: 0 0 4px; }
  .meta { color: #6b7280; font-size: 14px; margin-bottom: 16px; }
  .btn { display: block; width: 100%; background: #2563EB; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin-top: 30px; }
  .btn:active { background: #1d4ed8; }
</style></head>
<body><div class="container">
  <img src="${esc(course.images?.[0] || course.thumbnail)}" alt="" />
  <div class="meta">Lesson ${lessonIndex + 1} of ${LESSONS_PER_COURSE} · ${current.minutes} min</div>
  <h1>${esc(current.title)}</h1>
  <div class="meta">Instructor: ${esc(course.instructor?.name.first)} ${esc(course.instructor?.name.last)}</div>
  <p>${esc(course.description)}</p>
  <button class="btn" onclick="done()">Mark lesson ${lessonIndex + 1} complete</button>
</div>
<script>
  function done() {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LESSON_COMPLETED', courseId: ${course.id}, lesson: ${lessonIndex} }));
  }
</script></body></html>`;

  const onMessage = async (raw: string) => {
    try {
      const data = JSON.parse(raw);
      if (data.type !== 'LESSON_COMPLETED') return;
      await completeLesson(course.id, lessonIndex);
      if (isLast) {
        Alert.alert('Course complete!', `You finished ${course.title}.`, [{ text: 'Done', onPress: () => router.back() }]);
      } else {
        Alert.alert('Lesson complete', 'Ready for the next one?', [
          { text: 'Later', style: 'cancel', onPress: () => router.back() },
          { text: 'Next lesson', onPress: () => router.replace(`/webview/${course.id}?lesson=${lessonIndex + 1}`) },
        ]);
      }
    } catch (e) {
      console.error('Failed to handle lesson message', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }} numberOfLines={1}>{course.title}</Text>
      </View>

      {loadError ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#6b7280', fontSize: 16, marginBottom: 12 }}>{loadError}</Text>
          <TouchableOpacity onPress={() => setLoadError(null)} style={{ backgroundColor: '#2563EB', padding: 12, borderRadius: 8 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          key={lessonIndex}
          source={{ html: htmlContent }}
          onMessage={(event) => onMessage(event.nativeEvent.data)}
          onError={() => setLoadError('Failed to load content. Please check your connection.')}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator size="large" color="#2563EB" style={{ position: 'absolute', top: '50%', left: '50%' }} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
