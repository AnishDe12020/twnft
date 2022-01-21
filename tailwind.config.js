module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#333333",
        accent: "#1DA1F2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
