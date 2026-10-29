import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/* CourseCardSkeleton - A pulsing grey placeholder shaped like a CourseCard, shown while courses load */
export function CourseCardSkeleton() {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }} className="mb-4 overflow-hidden rounded-xl bg-white border border-gray-100">
      <View className="h-40 w-full bg-gray-200" />
      <View className="p-4">
        <View className="h-3 w-20 bg-gray-200 rounded mb-3" />
        <View className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
        <View className="h-3 w-full bg-gray-100 rounded mb-1" />
        <View className="h-3 w-2/3 bg-gray-100 rounded mb-4" />
        <View className="flex-row justify-between">
          <View className="h-4 w-28 bg-gray-200 rounded" />
          <View className="h-4 w-12 bg-gray-200 rounded" />
        </View>
      </View>
    </Animated.View>
  );
}
