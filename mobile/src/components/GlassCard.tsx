import React from "react";
import { StyleSheet, View, ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { COLORS } from "../theme/colors";

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
  // Sur iOS, BlurView est parfait. Sur Android, il peut y avoir des lenteurs
  // selon le système, mais BlurView est maintenant bien supporté en Expo SDK 51.
  // En fallback (si l'intensité est à 0 ou non supporté), on met un fond blanc translucide.
  return (
    <View style={[styles.container, style]}>
      {Platform.OS === "web" ? (
        // Sur le Web, on simule backdrop-filter avec CSS en natif ou fond translucide.
        <View style={[styles.glassFallback, { backgroundColor: COLORS.glassBg }]}>
          {children}
        </View>
      ) : (
        <BlurView
          intensity={intensity}
          tint="light"
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
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
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
  },
});
