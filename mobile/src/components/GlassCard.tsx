import React from "react";
import { StyleSheet, View, ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { COLORS, THEME_STATE } from "../theme/colors";

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

/**
 * Composant Liquid Glass (Glassmorphism)
 * Crée un effet de panneau translucide avec flou d'arrière-plan,
 * bordure fine semi-transparente, et ombre douce pour un rendu premium.
 */
export function GlassCard({ children, style, intensity = 40 }: GlassCardProps) {
  const isDark = THEME_STATE.isDark;
  const currentTheme = THEME_STATE.current;
  const cardBg = isDark ? "rgba(23, 51, 37, 0.7)" : "rgba(255, 255, 255, 0.88)";
  const cardBorder = currentTheme.border;
  
  return (
    <View style={[styles.container, { backgroundColor: cardBg, borderColor: cardBorder }, style]}>
      {Platform.OS === "web" ? (
        <View style={[styles.glassFallback, { backgroundColor: cardBg }]}>
          {children}
        </View>
      ) : (
        <BlurView
          intensity={intensity}
          tint={isDark ? "dark" : "light"}
          style={styles.blur}
        >
          <View style={styles.content}>
            {children}
          </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: COLORS.glassBg,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  blur: {
    width: "100%",
  },
  content: {
    padding: 20,
    backgroundColor: "transparent",
  },
  glassFallback: {
    padding: 20,
    width: "100%",
    borderRadius: 24,
  },
});
