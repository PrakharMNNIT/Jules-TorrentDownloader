/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#256af4",
        "background-light": "#f5f6f8",
        "background-dark": "#0a0c14",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
    },
  },
  plugins: [],
}
