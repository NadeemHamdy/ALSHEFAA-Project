import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"
import * as Haptics from "expo-haptics"
import Colors from "../../constants/Colors2"

interface ButtonProps {
  title: string
  onPress?: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  variant = "primary",
}) => {
  const getButtonStyle = () => {
    if (disabled) {
      return styles.disabledButton
    }

    switch (variant) {
      case "secondary":
        return styles.secondaryButton
      case "outline":
        return styles.outlineButton
      default:
        return styles.primaryButton
    }
  }

  const getTextStyle = () => {
    if (disabled) {
      return styles.disabledText
    }

    switch (variant) {
      case "secondary":
        return styles.secondaryText
      case "outline":
        return styles.outlineText
      default:
        return styles.primaryText
    }
  }

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      onPress()
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? Colors.primary : "#fff"} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: Colors.text,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    color: "#A0A0A0",
  },
})

export default Button
