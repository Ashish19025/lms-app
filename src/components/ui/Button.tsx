import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

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