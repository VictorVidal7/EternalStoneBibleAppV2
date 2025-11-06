// src/shared/components/ui/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '@/shared/constants/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : tokens.colors.primary[500]}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  primary: {
    backgroundColor: tokens.colors.primary[500],
    ...tokens.shadows.sm,
  },
  secondary: {
    backgroundColor: tokens.colors.secondary[500],
    ...tokens.shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: tokens.colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  size_sm: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    minHeight: 36,
  },
  size_md: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    minHeight: 44,
  },
  size_lg: {
    paddingHorizontal: tokens.spacing.xl,
    paddingVertical: tokens.spacing.lg,
    minHeight: 52,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontWeight: tokens.typography.weights.semibold,
  },
  text_primary: {
    color: tokens.colors.neutral[0],
  },
  text_secondary: {
    color: tokens.colors.neutral[0],
  },
  text_outline: {
    color: tokens.colors.primary[500],
  },
  text_ghost: {
    color: tokens.colors.primary[500],
  },
  text_sm: {
    fontSize: tokens.typography.sizes.sm,
  },
  text_md: {
    fontSize: tokens.typography.sizes.base,
  },
  text_lg: {
    fontSize: tokens.typography.sizes.lg,
  },
});
