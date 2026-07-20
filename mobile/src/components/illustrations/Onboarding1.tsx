import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { COLORS } from "../../theme/colors";

interface IllustrationProps {
  width?: number;
  height?: number;
}

/**
 * Illustration unDraw de style Épargne Collective / Tontines
 * Utilise les couleurs Teal et Or d'Egoto.
 */
export function Onboarding1({ width = 280, height = 200 }: IllustrationProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
      {/* Background / Clouds */}
      <Circle cx="70" cy="80" r="40" fill="#E8F2EF" opacity="0.6" />
      <Circle cx="210" cy="70" r="50" fill="#FDF7EE" opacity="0.6" />
      <Circle cx="140" cy="140" r="60" fill="#E8F2EF" opacity="0.4" />

      {/* Main Floor / Base shadow */}
      <Path d="M20 170 C80 185, 200 185, 260 170" stroke="#E2EAE7" strokeWidth="4" strokeLinecap="round" />

      {/* Tontine Circle rotation representation */}
      <Circle cx="140" cy="110" r="45" stroke={COLORS.primary} strokeWidth="3" strokeDasharray="6 4" opacity="0.3" />

      {/* Users representation in circle */}
      {/* User 1 (Admin/Left) */}
      <G opacity="0.95">
        <Circle cx="90" cy="110" r="14" fill={COLORS.primary} />
        <Path d="M90 124 C75 124, 72 145, 72 155 L108 155 C108 145, 105 124, 90 124 Z" fill={COLORS.primary} />
      </G>

      {/* User 2 (Right) */}
      <G opacity="0.8">
        <Circle cx="190" cy="110" r="14" fill="#CCCCCC" />
        <Path d="M190 124 C175 124, 172 145, 172 155 L208 155 C208 145, 205 124, 190 124 Z" fill="#CCCCCC" />
      </G>

      {/* User 3 (Top Beneficiary) */}
      <G>
        {/* Crown or Gold star highlight */}
        <Path d="M140 37 L143 45 L151 45 L145 50 L147 58 L140 53 L133 58 L135 50 L129 45 L137 45 Z" fill={COLORS.accent} />
        <Circle cx="140" cy="75" r="16" fill={COLORS.primaryDark} />
        <Path d="M140 91 C122 91, 118 115, 118 125 L162 125 C162 115, 158 91, 140 91 Z" fill={COLORS.primaryDark} />
      </G>

      {/* Money flow arrows */}
      <Path d="M98 90 Q120 70, 130 80" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M182 90 Q160 70, 150 80" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" />

      {/* Gold Coin details */}
      <Circle cx="140" cy="145" r="10" fill={COLORS.accent} />
      <Circle cx="140" cy="145" r="7" stroke="#FFFFFF" strokeWidth="1.5" />
      <Circle cx="120" cy="155" r="8" fill={COLORS.accent} opacity="0.7" />
      <Circle cx="160" cy="155" r="8" fill={COLORS.accent} opacity="0.7" />
    </Svg>
  );
}
