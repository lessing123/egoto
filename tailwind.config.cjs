/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        "ink-soft": "#F9F9F9",
        "ink-line": "rgba(0, 0, 0, 0.06)",
        paper: "#173325",
        "paper-dim": "rgba(23, 51, 37, 0.8)",
        gold: "#173325",
        "gold-deep": "#0f1d1a",
        terracotta: "#FBBF24",
        palm: "#173325",
        "palm-light": "#2d5f4d",
        "palm-deep": "#0f1d1a",
        paper: "#173325",
        "paper-dim": "rgba(23, 51, 37, 0.8)",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        gold: "0 20px 60px -20px rgba(242, 169, 59, 0.45)",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
