import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

interface LogoProps {
  size?: number;
}

/**
 * Brand Logo Egoto - Pure vector reproduction based on official design
 */
export function Logo({ size = 80 }: LogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Dark Forest background (Squircle shape) */}
      <Rect x="0" y="0" width="100" height="100" rx="28" fill="#0E2218" />
      
      {/* Gold head */}
      <Circle cx="50" cy="32" r="10" fill="#BA7517" />
      
      {/* White body (arch shape) */}
      <Path 
        d="M26 74 C26 50, 74 50, 74 74" 
        stroke="#FFFFFF" 
        strokeWidth="10" 
        strokeLinecap="round" 
        fill="none" 
      />
    </Svg>
  );
}
