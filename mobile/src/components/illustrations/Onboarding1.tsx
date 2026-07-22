import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { THEME_STATE } from "../../theme/colors";

interface IllustrationProps {
  width?: number;
  height?: number;
}

/**
 * Illustration Épargne Collective / Tontines réactive au thème
 */
export function Onboarding1({ width = 280, height = 200 }: IllustrationProps) {
  const currentTheme = THEME_STATE.current;
  const isDark = THEME_STATE.isDark;

  return (
    <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
      {/* Background / Clouds */}
      <Circle cx="70" cy="80" r="40" fill={currentTheme.surfaceElevated} opacity="0.6" />
      <Circle cx="210" cy="70" r="50" fill={isDark ? "rgba(231,162,64,0.15)" : "rgba(186,117,23,0.15)"} opacity="0.6" />
      <Circle cx="140" cy="140" r="60" fill={currentTheme.surfaceElevated} opacity="0.4" />

      {/* Main Floor / Base shadow */}
      <Path d="M20 170 C80 185, 200 185, 260 170" stroke={currentTheme.border} strokeWidth="4" strokeLinecap="round" />

      {/* Tontine Circle rotation representation */}
      <Circle cx="140" cy="110" r="45" stroke={currentTheme.primary} strokeWidth="3" strokeDasharray="6 4" opacity="0.3" />

      {/* Users representation in circle */}
      {/* User 1 (Left) */}
      <G opacity="0.95">
        <Circle cx="90" cy="110" r="14" fill={currentTheme.textSecondary} />
        <Path d="M90 124 C75 124, 72 145, 72 155 L108 155 C108 145, 105 124, 90 124 Z" fill={currentTheme.textSecondary} />
      </G>

      {/* User 2 (Right) */}
      <G opacity="0.8">
        <Circle cx="190" cy="110" r="14" fill={currentTheme.textSecondary} opacity="0.7" />
        <Path d="M190 124 C175 124, 172 145, 172 155 L208 155 C208 145, 205 124, 190 124 Z" fill={currentTheme.textSecondary} opacity="0.7" />
      </G>

      {/* User 3 (Top Beneficiary) */}
      <G>
        {/* Crown or Gold star highlight */}
        <Path d="M140 37 L143 45 L151 45 L145 50 L147 58 L140 53 L133 58 L135 50 L129 45 L137 45 Z" fill={currentTheme.accent} />
        <Circle cx="140" cy="75" r="16" fill={currentTheme.primary} />
        <Path d="M140 91 C122 91, 118 115, 118 125 L162 125 C162 115, 158 91, 140 91 Z" fill={currentTheme.primary} />
      </G>

      {/* Money flow arrows */}
      <Path d="M98 90 Q120 70, 130 80" stroke={currentTheme.accent} strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M182 90 Q160 70, 150 80" stroke={currentTheme.accent} strokeWidth="2.5" strokeLinecap="round" />

      {/* Gold Coin details */}
      <Circle cx="140" cy="145" r="10" fill={currentTheme.accent} />
      <Circle cx="140" cy="145" r="7" stroke={isDark ? "#0A150F" : "#FFFFFF"} strokeWidth="1.5" />
      <Circle cx="120" cy="155" r="8" fill={currentTheme.accent} opacity="0.7" />
      <Circle cx="160" cy="155" r="8" fill={currentTheme.accent} opacity="0.7" />
    </Svg>
  );
}
