import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vk: {
          bg: "var(--vk-bg)",
          surface: "var(--vk-surface)",
          "surface-hover": "var(--vk-surface-hover)",
          border: "var(--vk-border)",
          primary: "var(--vk-primary)",
          secondary: "var(--vk-secondary)",
          accent: "var(--vk-accent)",
          text: "var(--vk-text)",
          "text-muted": "var(--vk-text-muted)",
          success: "var(--vk-success)",
          warning: "var(--vk-warning)",
          danger: "var(--vk-danger)",
        },
      },
      fontFamily: {
        heading: ["Fira Code", "monospace"],
        body: ["Fira Sans", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px var(--vk-primary)" },
          "50%": { opacity: ".5", boxShadow: "0 0 10px var(--vk-primary)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
