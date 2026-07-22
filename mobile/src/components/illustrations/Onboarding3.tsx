import React from "react";
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from "react-native-svg";
import { THEME_STATE } from "../../theme/colors";

interface IllustrationProps {
  width?: number;
  height?: number;
}

/**
 * Illustration Carte Visa Egoto & Score Financier réactive au thème
 */
export function Onboarding3({ width = 280, height = 200 }: IllustrationProps) {
  const currentTheme = THEME_STATE.current;
  const isDark = THEME_STATE.isDark;

  return (
    <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
      <Defs>
        <LinearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#BA7517" />
          <Stop offset="50%" stopColor="#D4AF37" />
          <Stop offset="100%" stopColor="#9A6212" />
        </LinearGradient>
        <LinearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={isDark ? "rgba(23, 51, 37, 0.75)" : "rgba(255, 255, 255, 0.75)"} />
          <Stop offset="100%" stopColor={isDark ? "rgba(35, 77, 56, 0.35)" : "rgba(255, 255, 255, 0.25)"} />
        </LinearGradient>
      </Defs>

      {/* Decorative Circles */}
      <Circle cx="210" cy="130" r="50" fill={currentTheme.surfaceElevated} opacity="0.8" />
      <Circle cx="80" cy="70" r="40" fill={isDark ? "rgba(231,162,64,0.15)" : "rgba(186,117,23,0.15)"} opacity="0.6" />

      {/* Base floor line */}
      <Path d="M30 170 C90 180, 190 180, 250 170" stroke={currentTheme.border} strokeWidth="4" strokeLinecap="round" />

      {/* Score gauge in background */}
      <G opacity="0.4">
        <Circle cx="140" cy="110" r="60" stroke={currentTheme.border} strokeWidth="10" strokeDasharray="180 180" strokeLinecap="round" />
        <Circle cx="140" cy="110" r="60" stroke={currentTheme.primary} strokeWidth="10" strokeDasharray="120 180" strokeLinecap="round" />
      </G>

      {/* The Egoto Gold Card representation */}
      <G transform="rotate(-10 140 100)">
        {/* Card shadow */}
        <Rect x="84" y="64" width="132" height="84" rx="12" fill="#000000" opacity="0.15" />
        {/* Card Body */}
        <Rect x="80" y="60" width="132" height="84" rx="12" fill="url(#goldGrad)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        
        {/* Chip (Puce) */}
        <Rect x="94" y="74" width="18" height="14" rx="3" fill="#E6EEEC" opacity="0.8" />
        
        {/* Visa Logo placeholder */}
        <Rect x="176" y="118" width="24" height="14" rx="2" fill="#E6EEEC" opacity="0.4" />
        
        {/* Card text lines placeholder */}
        <Rect x="94" y="105" width="40" height="4" rx="2" fill="#E6EEEC" opacity="0.6" />
        <Rect x="94" y="115" width="55" height="5" rx="2.5" fill="#E6EEEC" opacity="0.8" />
        
        {/* Card gloss lines */}
        <Path d="M80 60 L140 60 L80 144 Z" fill="#FFFFFF" opacity="0.15" />
      </G>

      {/* The Egoto Glass Card representation (overlapping) */}
      <G transform="rotate(5 140 100)">
        {/* Card Body (translucent) */}
        <Rect x="90" y="65" width="132" height="84" rx="12" fill="url(#glassGrad)" stroke={currentTheme.border} strokeWidth="1.5" />
        
        {/* Chip (Puce) */}
        <Rect x="104" y="79" width="18" height="14" rx="3" fill={isDark ? currentTheme.border : "#FFFFFF"} opacity="0.8" />
        
        {/* Teal Accent circle representing Egoto Identity on Card */}
        <Circle cx="196" cy="85" r="10" fill={currentTheme.primary} opacity="0.9" />
        <Circle cx="196" cy="85" r="7" stroke={isDark ? "#0A150F" : "#FFFFFF"} strokeWidth="1.5" />
        
        {/* Visa text */}
        <Rect x="186" y="123" width="24" height="14" rx="2" fill={isDark ? currentTheme.border : "#FFFFFF"} opacity="0.6" />

        {/* Card name */}
        <Rect x="104" y="125" width="50" height="5" rx="2.5" fill={isDark ? currentTheme.border : "#FFFFFF"} opacity="0.7" />
      </G>

      {/* Sparkles of unlock success */}
      <Path d="M60 40 L62 44 L66 44 L63 47 L64 51 L60 48 L56 51 L57 47 L54 44 L58 44 Z" fill={currentTheme.accent} />
      <Path d="M220 50 L222 54 L226 54 L223 57 L224 61 L220 58 L216 61 L217 57 L214 54 L218 54 Z" fill={currentTheme.accent} />
    </Svg>
  );
}
