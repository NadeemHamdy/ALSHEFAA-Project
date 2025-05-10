"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type TextInputProps as RNTextInputProps,
} from "react-native"
import Colors from "../../constants/Colors2"

interface TextInputProps extends RNTextInputProps {
  label?: string
  error?: string
  containerStyle?: ViewStyle
  labelStyle?: TextStyle
  inputStyle?: TextStyle
  errorStyle?: TextStyle
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <RNTextInput
        style={[styles.input, isFocused && styles.focusedInput, error && styles.errorInput, inputStyle]}
        placeholderTextColor="#A0A0A0"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text,
  },
  focusedInput: {
    borderColor: Colors.primary,
    backgroundColor: "#fff",
  },
  errorInput: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 4,
  },
})

export default TextInput
