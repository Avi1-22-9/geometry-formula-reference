/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f5f4",
        surface: "#ffffff",
        ink: "#000000",
        "ink-2": "#31302e",
        muted: "#615d59",
        faint: "#8a857f",
        hairline: "#e6e6e6",
        primary: "#0075de",
        "primary-active": "#005bab",
        teal: "#1f8a86",
        plate: "#ebe9e6",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        lift: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)",
        sheet: "0 -8px 40px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
