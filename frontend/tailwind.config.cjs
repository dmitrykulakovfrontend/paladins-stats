/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        title: ["var(--font-title)", "sans-serif"],
      },
      colors: {
        "surface-500": "#212c47",
        "surface-600": "#1a2339",
        "surface-700": "#151C2D",
        "surface-even": "#1F2942",
        "surface-odd": "#212C47",
        "stat-win": "#8FBC8F"
      },
    },
  },
  plugins: [],
};

module.exports = config;
