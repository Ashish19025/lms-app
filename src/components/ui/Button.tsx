import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  // title - The text to display on the button
  title: string;
  // loading - Optional prop to indicate if the button is in a loading state, showing an activity indicator instead of text
  loading?: boolean;
}

/* Button - A reusable button component with loading state and customizable styles
   Props:
     - title: The text to display on the button
      - loading: Optional prop to indicate if the button is in a loading state, showing an activity indicator instead of text
      - style: Optional custom styles to apply to the button container
      - className: Optional Tailwind CSS classes to apply for styling
    Features:
      - Displays a button with customizable text and styles
      - Shows an activity indicator when in loading state
      - Applies disabled styles when the button is disabled
*/
export const Button: React.FC<ButtonProps> = ({ title, loading, style, className, ...props }) => {
  return (
    <TouchableOpacity
      className={`w-full flex-row items-center justify-center rounded-lg bg-blue-600 px-4 py-3 ${props.disabled ? 'opacity-50' : 'opacity-100'} ${className}`}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-center text-base font-semibold text-white">{title}</Text>
      )}
    </TouchableOpacity>
  );
};