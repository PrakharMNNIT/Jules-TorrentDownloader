import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#256af4",
        "background-light": "#f5f6f8",
        "background-dark": "#101622",
        "surface-dark": "#1b212d",
        "surface-hover": "#242c3b",
        "neon-glow": "rgba(37, 106, 244, 0.4)"
      },
      fontFamily: {
        "display": ["var(--font-space-grotesk)", "sans-serif"],
        "body": ["var(--font-noto-sans)", "sans-serif"]
      },
      borderRadius: {
        "lg": "var(--radius)",
        "md": "calc(var(--radius) - 2px)",
        "sm": "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
