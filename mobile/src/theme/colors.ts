// ═══════════════════════════════════════════════════════════════
// EGOTO BRANDING THEME PALETTE — SEMANTIC SYSTEM
// ═══════════════════════════════════════════════════════════════

export const SEMANTIC_COLORS = {
  light: {
    background:        "#E8EFEA",  // green-tinted off-white
    surface:           "#FFFFFF",
    surfaceElevated:   "#DCEFE6",  // green-100
    border:            "#B9DFCC",  // green-200
    primary:           "#173325",  // green-900
    primaryForeground: "#F1F9F5",  // text on primary
    textPrimary:       "#173325",  // green-900
    textSecondary:     "#3F8D66",  // green-600
    accent:            "#BA7517",  // gold-900
    accentForeground:  "#FFFFFF",
  },
  dark: {
    background:        "#0A150F",  // green-955
    surface:           "#173325",  // green-900 (surface container)
    surfaceElevated:   "#234D38",  // green-800
    border:            "#2F6A4D",  // green-700
    primary:           "#4FB080",  // green-505
    primaryForeground: "#0A150F",  // text on primary (dark)
    textPrimary:       "#F1F9F5",  // green-50
    textSecondary:     "#84C8A6",  // green-400
    accent:            "#E7A240",  // gold-500
    accentForeground:  "#0A150F",
  },
};

// Global shared state for reactive components outside main tree
let globalIsDark = true;

export const THEME_STATE = {
  get isDark() {
    return globalIsDark;
  },
  set isDark(val: boolean) {
    globalIsDark = val;
  },
  get current() {
    return globalIsDark ? SEMANTIC_COLORS.dark : SEMANTIC_COLORS.light;
  }
};

// Legacy object for fallback compatibility (avoiding breaking other UI references)
export const COLORS = {
  primary: "#173325",
  primaryDark: "#0A150F",
  primaryLight: "rgba(23, 51, 37, 0.15)",
  accent: "#BA7517",
  accentLight: "rgba(186, 117, 23, 0.1)",
  textGray: "#3F8D66",
  success: "#2E7D32",
  warning: "#BA7517",
  error: "#D32F2F",
  pending: "#1976D2",
  glassBg: "rgba(255, 255, 255, 0.04)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  gradientGold: ["#E7A240", "#BA7517"],
  gradientTeal: ["#173325", "#234D38", "#0A150F"],
  isDark: true,
};
