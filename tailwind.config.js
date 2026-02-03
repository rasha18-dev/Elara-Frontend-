export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F9F6F0",
        champagne: "#E8DCCA",
        softBrown: "#8C7B6D",
        mocha: "#5D4037",
        antiqueGold: "#B08D55",
        richBlack: "#121212",
        deepMocha: "#3E2723",
        softGray: "#F5F5F5",
      },
      fontFamily: {
        luxury: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
        'luxury-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
};
