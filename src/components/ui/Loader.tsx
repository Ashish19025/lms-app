import { View, ActivityIndicator } from 'react-native';

export function Loader({ size = 'large', color = '#2563EB' }: { size?: 'small' | 'large', color?: string }) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}