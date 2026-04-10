/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0f1726",
        panel: "#141d2f",
        panelAlt: "#19233a",
        line: "#27324a",
        muted: "#8b9ab5",
        accent: "#7dd3fc",
        accentStrong: "#38bdf8",
        success: "#34d399",
        danger: "#fb7185"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(125, 211, 252, 0.16), 0 14px 40px rgba(2, 6, 23, 0.42)"
      },
      fontFamily: {
        sans: ["Space Grotesk", "Manrope", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 28%), radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.16), transparent 22%), linear-gradient(180deg, rgba(15, 23, 38, 0.98), rgba(5, 10, 20, 1))"
      }
    }
  },
  plugins: []
};
