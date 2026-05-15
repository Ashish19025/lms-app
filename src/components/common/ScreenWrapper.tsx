import { SafeAreaView } from 'react-native-safe-area-context';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

export function ScreenWrapper({ children, style, ...props }: Props) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#fff' }, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}