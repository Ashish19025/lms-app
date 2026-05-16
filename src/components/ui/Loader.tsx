import { View, ActivityIndicator } from 'react-native';


/* Loader - A simple component to display a loading spinner while data is being fetched or an operation is in progress
   Props:
     - size: Optional prop to specify the size of the activity indicator (default is 'large')
     - color: Optional prop to specify the color of the activity indicator (default is '#2563EB')
    Features:
      - Displays a centered activity indicator to indicate that the app is loading or processing something
      - Customizable size and color for flexibility in different contexts
*/
export function Loader({ size = 'large', color = '#2563EB' }: { size?: 'small' | 'large', color?: string }) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}