/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        ink: "#FAF9F6",                 // Premium soft Alabaster cream background
        "ink-soft": "#F2EFE9",            // Warm sand card background
        "ink-line": "rgba(20, 43, 32, 0.08)", // Subtle forest-tinted border line
        paper: "#142B20",               // Soft deep forest green primary text
        "paper-dim": "rgba(20, 43, 32, 0.75)", // Faded forest green text
        gold: "#142B20",                // Primary green button background
        "gold-deep": "#0B1B13",          // Darker green button hover background
        terracotta: "#C59B27",          // Premium satin champagne gold accent
        palm: "#142B20",                // Primary brand forest green
        "palm-light": "#2D5F4D",        // Medium moss green
        "palm-deep": "#0B1B13",         // Deep brand green background
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
