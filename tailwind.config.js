/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], // ✅ CORRECTED
  theme: {
    extend: {},
  },
  plugins: [], // ✅ This must be an array (which it already is)
};
