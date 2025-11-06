// src/shared/components/ui/Card.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { tokens } from '@/shared/constants/tokens';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof tokens.spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'elevated',
  padding = 'md',
}) => {
  const containerStyle = [
    styles.base,
    styles[variant],
    { padding: tokens.spacing[padding] },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={containerStyle}
        onPress={onPress}
        android_ripple={{ color: tokens.colors.neutral[100] }}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.borderRadius.lg,
    backgroundColor: tokens.colors.neutral[0],
  },
  elevated: {
    ...tokens.shadows.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: tokens.colors.neutral[300],
  },
  filled: {
    backgroundColor: tokens.colors.neutral[50],
  },
});
