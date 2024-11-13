/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto Condensed'", "sans-serif"],
        itim: ["'Itim'", "cursive"],
        edu: ["'Edu AU VIC WA NT Pre'", "cursive"],
      },
    },
  },
  plugins: [],
};
