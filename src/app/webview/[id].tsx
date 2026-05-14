import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useCourseStore } from '../../store/course.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getToken } from '../../services/storage/secureStorage';

export default function WebViewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const getCourseById = useCourseStore(state => state.getCourseById);
  const course = getCourseById(Number(id));
  
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Fetch user token to pass via WebView headers
    getToken().then(t => setToken(t || ''));
  }, []);

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

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${course.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 20px;
          color: #1f2937;
          line-height: 1.6;
          background-color: #f9fafb;
        }
        .container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        h1 { font-size: 24px; color: #111827; margin-bottom: 8px; }
        .instructor { color: #6b7280; font-weight: 500; font-size: 14px; margin-bottom: 20px; }
        .btn {
          display: block;
          width: 100%;
          background: #2563EB;
          color: white;
          padding: 14px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 30px;
          cursor: pointer;
          text-align: center;
        }
        .btn:active { background: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="${course.images[0] || course.thumbnail}" alt="Course Image" />
        <h1>${course.title}</h1>
        <div class="instructor">
          Instructor: ${course.instructor?.name.first} ${course.instructor?.name.last}
        </div>
        <p>${course.description}</p>
        
        <button class="btn" onclick="completeCourse()">Complete Lesson 1</button>
      </div>

      <script>
        // Bidirectional Native <-> Web Communication
        function completeCourse() {
          // Send message to React Native
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'LESSON_COMPLETED', 
            courseId: ${course.id} 
          }));
        }
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Classroom</Text>
      </View>

      <WebView 
        source={{ 
          html: htmlContent,
          // Passing Auth via headers for secure backend HTML/content rendering scenarios
          headers: { 
            'Authorization': `Bearer ${token}`,
            'X-Custom-Client': 'LMSMobileApp'
          }
        }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'LESSON_COMPLETED') {
              Alert.alert('Success!', 'You have completed this lesson.', [
                { text: 'Great', onPress: () => router.back() }
              ]);
            }
          } catch (e) {
            console.error('Failed to parse webview message', e);
          }
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator 
            size="large" 
            color="#2563EB" 
            style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -15 }, { translateY: -15 }] }} 
          />
        )}
      />
    </SafeAreaView>
  );
}