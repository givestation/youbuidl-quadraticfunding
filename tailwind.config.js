/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        "Pure-Black": "#000000",
        "Ghost-White": "#F9F9F9",
        "Pure-White": "#FFFFFF",
        "Anti-Flash-White": "#F0F2F5",
        Nickle: "#727272",
        Gray: "#818283",
        "Spanish-Gray": "#999999",
        "Red-RYB": "#FF2121",
        "Chinese-Blue": "#00A4FF",
        "Quick-Silver": "#A6A6A6",
        "Bright-Gray": "#EEEEEE",
        "Old-Silver": "#828282",
        "Alien-Armpit": "#71D81F",
        "Celestial-Blue": "#478DCD",
        "Raisin-Black": "#262626",
        "Light-Slate-Gray": "#7F819E",
        Liberty: "#4459A9",
        "Spanish-Violet": "#402383",
        "Philipine-Silver": "#B6B6B6",
        "Steel-Blue": "#B8C2E5",
        "Philipine-Gray": "#929292",
        "Vampire-Black": "#0A0A0A",
        "Davy-Grey": "#525252",
        "Rich-Black": "#000812",
        "Eire-Black": "#141A23",
        "Spring-Frost": "#88F32F",
      },
      fontFamily: {
        Poppins: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
