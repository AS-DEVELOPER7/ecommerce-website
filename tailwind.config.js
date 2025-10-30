/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  darkMode: "class", // toggled via <html class="dark">
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0,0,0,.06)",
        card: "0 8px 20px rgba(0,0,0,.05)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
