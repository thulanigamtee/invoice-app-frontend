/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // 12
        itemsBgPrimary: "var(--itemsBgPrimary)", // 03
        itemsBgSecondary: "var(--itemsBgSecondary)", // 08
        btnBgPrimary: "var(--btnBgPrimary)", // 04
        btnBgSecondary: "var(--btnBgPrimary)",
        purplePrimary: "var(--purplePrimary)", // 01
        purpleSecondary: "var(--purpleSecondary)", // 02
        redPrimary: "var(--redPrimary)", // 09
        redSecondary: "var(--redSecondary)" // 10
      }
    },
  },
  plugins: [],
}