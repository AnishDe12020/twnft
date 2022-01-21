module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3C4856",
        secondary: "#A0ACBD",
        accent: "#1DA1F2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
