import { colors } from '@/libs/config/theme'
import React from 'react'
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

export type ButtonProps = {
  onPress: () => void
  title: string
  mode?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
  loading?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  color?: string
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  mode = 'contained',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  size = 'medium',
  fullWidth = false,
  color,
}) => {
  // Determine style based on mode
  const getContainerStyle = () => {
    if (disabled) {
      return [styles.container, styles.disabled]
    }

    switch (mode) {
      case 'contained':
        return [styles.container, styles.contained, color ? { backgroundColor: color } : null]
      case 'outlined':
        return [styles.container, styles.outlined, color ? { borderColor: color } : null]
      case 'text':
        return [styles.container, styles.text]
      default:
        return [styles.container, styles.contained]
    }
  }

  // Determine text color based on mode
  const getTextStyle = () => {
    if (disabled) {
      return [getSizeStyle(), styles.textDisabled]
    }

    switch (mode) {
      case 'contained':
        return [getSizeStyle(), styles.textContained]
      case 'outlined':
      case 'text':
        return [getSizeStyle(), styles.textOutlined, color ? { color } : null]
      default:
        return [getSizeStyle(), styles.textContained]
    }
  }

  // Determine size styles
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSmall
      case 'large':
        return styles.textLarge
      default:
        return styles.textMedium
    }
  }

  // Determine container size
  const getContainerSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.containerSmall
      case 'large':
        return styles.containerLarge
      default:
        return styles.containerMedium
    }
  }

  // Determine width
  const getWidthStyle = () => {
    return fullWidth ? styles.fullWidth : null
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), getContainerSizeStyle(), getWidthStyle(), style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={mode === 'contained' ? colors.white : colors.primary} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 8,
  },
  disabled: {
    backgroundColor: colors.greyOff,
    borderWidth: 0,
  },
  textContained: {
    color: colors.white,
    fontWeight: '500',
  },
  textOutlined: {
    color: colors.primary,
    fontWeight: '500',
  },
  textDisabled: {
    color: colors.greyInactive,
  },
  containerSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  containerLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  fullWidth: {
    width: '100%',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
})
