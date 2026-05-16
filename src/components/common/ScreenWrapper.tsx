import { SafeAreaView } from 'react-native-safe-area-context';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  // children - The content to be rendered inside the ScreenWrapper, typically the main content of a screen.
  children: React.ReactNode;
}

// ScreenWrapper - A reusable component that provides a safe area and consistent styling for screens across the app.
export function ScreenWrapper({ children, style, ...props }: Props) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#fff' }, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}