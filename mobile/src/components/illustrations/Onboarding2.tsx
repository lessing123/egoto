import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { THEME_STATE } from "../../theme/colors";

interface IllustrationProps {
  width?: number;
  height?: number;
}

/**
 * Illustration Épargne Individuelle / Bols d'Épargne réactive au thème
 */
export function Onboarding2({ width = 280, height = 200 }: IllustrationProps) {
  const currentTheme = THEME_STATE.current;
  const isDark = THEME_STATE.isDark;

  return (
    <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
      {/* Background decorations */}
      <Circle cx="80" cy="70" r="50" fill={isDark ? "rgba(231,162,64,0.15)" : "rgba(186,117,23,0.15)"} opacity="0.7" />
      <Circle cx="200" cy="80" r="40" fill={currentTheme.surfaceElevated} opacity="0.6" />

      {/* Ground */}
      <Path d="M30 170 C90 180, 190 180, 250 170" stroke={currentTheme.border} strokeWidth="4" strokeLinecap="round" />

      {/* The Savings Pot (Le Bol) */}
      <Path d="M110 160 L170 160 C175 160, 178 155, 176 150 L164 105 C163 102, 160 100, 157 100 L123 100 C120 100, 117 102, 116 105 L104 150 C102 155, 105 160, 110 160 Z" fill={currentTheme.border} opacity="0.6" />
      
      {/* Liquid glass layer inside the pot */}
      <Path d="M115 145 L165 145 C167 145, 169 143, 168 141 L160 112 C159 110, 157 108, 155 108 L125 108 C123 108, 121 110, 120 112 L112 141 C111 143, 113 145, 115 145 Z" fill={currentTheme.primary} opacity="0.8" />

      {/* Target Flag / Progress bar metaphor */}
      <Rect x="137" y="55" width="6" height="45" fill={currentTheme.border} rx="3" />
      <Path d="M143 55 L175 63 L143 71 Z" fill={currentTheme.accent} />

      {/* Grow plants/leaves out of the pot */}
      <Path d="M125 90 Q110 75, 120 65 Q130 75, 130 90" fill={currentTheme.textSecondary} opacity="0.9" />
      <Path d="M155 90 Q170 75, 160 65 Q150 75, 150 90" fill={currentTheme.textSecondary} opacity="0.9" />

      {/* Character depositing coin */}
      <G>
        {/* Head */}
        <Circle cx="80" cy="95" r="10" fill={currentTheme.textSecondary} opacity="0.5" />
        {/* Body */}
        <Path d="M80 108 C68 108, 65 125, 65 135 L88 135 C88 128, 86 108, 80 108 Z" fill={currentTheme.primary} />
        {/* Arm extending toward pot */}
        <Path d="M82 118 Q110 115, 120 108" stroke={currentTheme.textSecondary} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        {/* Falling Gold coin */}
        <Circle cx="123" cy="92" r="6" fill={currentTheme.accent} />
        <Circle cx="123" cy="92" r="4" stroke={isDark ? "#0A150F" : "#FFFFFF"} strokeWidth="1" />
      </G>

      {/* Sparkles / Success */}
      <Path d="M100 45 L102 49 L106 49 L103 52 L104 56 L100 53 L96 56 L97 52 L94 49 L98 49 Z" fill={currentTheme.accent} opacity="0.8" />
      <Path d="M185 85 L187 89 L191 89 L188 92 L189 96 L185 93 L181 96 L182 92 L179 89 L183 89 Z" fill={currentTheme.accent} opacity="0.8" />
    </Svg>
  );
}
