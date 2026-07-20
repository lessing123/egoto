import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { COLORS } from "../../theme/colors";

interface IllustrationProps {
  width?: number;
  height?: number;
}

/**
 * Illustration unDraw d'état vide (Empty State)
 * Utilisé pour indiquer qu'aucun cercle ou bol d'épargne n'est actif.
 */
export function EmptyState({ width = 160, height = 120 }: IllustrationProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 120" fill="none">
      {/* Background circle decoration */}
      <Circle cx="80" cy="55" r="35" fill="#F4F8F7" />

      {/* Main Box representation */}
      <Path d="M40 85 L120 85" stroke="#E2EAE7" strokeWidth="4" strokeLinecap="round" />
      
      {/* Closed box shape (semi open) */}
      <Path d="M50 85 L55 60 L105 60 L110 85 Z" fill="#E2EAE7" opacity="0.6" />
      <Path d="M55 60 L40 45 L70 45 L80 60 Z" fill="#CCCCCC" opacity="0.5" />
      <Path d="M105 60 L120 45 L90 45 L80 60 Z" fill="#CCCCCC" opacity="0.4" />
      
      {/* Plant leaf growing out (Egoto style) */}
      <Path d="M80 65 Q70 40, 85 30 Q100 40, 80 65" fill={COLORS.primary} opacity="0.8" />
      <Path d="M80 65 Q95 50, 90 42 Q85 50, 80 65" fill={COLORS.primary} opacity="0.6" />

      {/* Light sparkles */}
      <Circle cx="50" cy="35" r="2" fill={COLORS.accent} />
      <Circle cx="115" cy="40" r="3" fill={COLORS.accent} />
    </Svg>
  );
}
