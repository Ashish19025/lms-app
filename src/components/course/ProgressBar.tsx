import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  // progress - Share of the course finished, from 0 to 1
  progress: number;
  showLabel?: boolean;
}

/* ProgressBar - A thin bar showing how much of a course is done, with an optional "60% complete" label */
export function ProgressBar({ progress, showLabel = true }: Props) {
  const pct = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  return (
    <View>
      <View className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <View className={`h-2 rounded-full ${pct === 100 ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${pct}%` }} />
      </View>
      {showLabel && (
        <Text className="text-xs text-gray-500 mt-1 font-medium">
          {pct === 100 ? 'Completed' : `${pct}% complete`}
        </Text>
      )}
    </View>
  );
}
