/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: "rgba(var(--c-text), <alpha-value>)",
        surface: "rgba(var(--c-surface), <alpha-value>)",
        panel: "rgba(var(--c-panel), <alpha-value>)",
        line: "rgba(var(--c-line), <alpha-value>)",
        muted: "rgba(var(--c-muted), <alpha-value>)",
        accent: "rgba(var(--c-accent), <alpha-value>)",
        accentStrong: "rgba(var(--c-accent-strong), <alpha-value>)",
        success: "#34d399",
        danger: "#fb7185",
        slate: {
          50: "rgba(var(--c-text), <alpha-value>)",
          100: "rgba(var(--c-text), <alpha-value>)",
          200: "rgba(var(--c-muted), <alpha-value>)",
          300: "rgba(var(--c-muted), <alpha-value>)",
          400: "rgba(var(--c-muted), <alpha-value>)",
          500: "rgba(var(--c-line), <alpha-value>)",
          600: "rgba(var(--c-line), <alpha-value>)",
          700: "rgba(var(--c-panel), <alpha-value>)",
          800: "rgba(var(--c-panel), <alpha-value>)",
          900: "rgba(var(--c-panel), <alpha-value>)",
          950: "rgba(var(--c-surface), <alpha-value>)",
        },
        sky: {
          100: "rgba(var(--c-accent-strong), <alpha-value>)",
          200: "rgba(var(--c-accent-strong), <alpha-value>)",
          300: "rgba(var(--c-accent-strong), <alpha-value>)",
          400: "rgba(var(--c-accent-strong), <alpha-value>)",
          500: "rgba(var(--c-accent), <alpha-value>)",
          600: "rgba(var(--c-muted), <alpha-value>)",
          700: "rgba(var(--c-muted), <alpha-value>)",
          800: "rgba(var(--c-line), <alpha-value>)",
          900: "rgba(var(--c-line), <alpha-value>)",
          950: "rgba(var(--c-line), <alpha-value>)",
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(var(--c-text), 0.1), 0 14px 40px rgba(0, 0, 0, 0.4)"
      },
      fontFamily: {
        sans: ["Space Grotesk", "Manrope", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid": "var(--bg-gradient)"
      }
    }
  },
  plugins: []
};
