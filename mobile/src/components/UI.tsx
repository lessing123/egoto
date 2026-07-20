import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../theme/colors";

// ─── BUTTON COMPONENT ────────────────────────────────────────

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "accent" | "danger";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          button: [styles.btn, styles.btnSecondary],
          text: [styles.btnText, styles.btnTextSecondary],
        };
      case "accent":
        return {
          button: [styles.btn, styles.btnAccent],
          text: [styles.btnText, styles.btnTextAccent],
        };
      case "danger":
        return {
          button: [styles.btn, styles.btnDanger],
          text: [styles.btnText, styles.btnTextDanger],
        };
      default:
        return {
          button: [styles.btn, styles.btnPrimary],
          text: [styles.btnText, styles.btnTextPrimary],
        };
    }
  };

  const currentStyle = getStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        currentStyle.button,
        (disabled || loading) ? styles.btnDisabled : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" ? COLORS.primary : "#FFF"} />
      ) : (
        <Text style={[currentStyle.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

// ─── INPUT COMPONENT ─────────────────────────────────────────

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  label?: string;
  error?: string;
  style?: ViewStyle;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  label,
  error,
  style,
}: InputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textGray}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// ─── PROGRESS BAR COMPONENT ──────────────────────────────────

interface ProgressBarProps {
  progress: number; // 0 to 1
  style?: ViewStyle;
}

export function ProgressBar({ progress, style }: ProgressBarProps) {
  const clampledProgress = Math.max(0, Math.min(1, progress));
  return (
    <View style={[styles.progressContainer, style]}>
      <View
        style={[
          styles.progressBar,
          { width: `${clampledProgress * 100}%` },
        ]}
      />
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Button
  btn: {
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
  },
  btnSecondary: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnAccent: {
    backgroundColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.error,
  },
  btnDisabled: {
    backgroundColor: "#E2EAE7",
    borderColor: "#E2EAE7",
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  btnTextPrimary: {
    color: "#FFFFFF",
  },
  btnTextSecondary: {
    color: COLORS.primary,
  },
  btnTextAccent: {
    color: "#FFFFFF",
  },
  btnTextDanger: {
    color: "#FFFFFF",
  },

  // Input
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    height: 52,
    backgroundColor: "#F0F4F2",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },

  // Progress Bar
  progressContainer: {
    height: 8,
    backgroundColor: "#E2EAE7",
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
});
