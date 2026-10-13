/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "vexora-red": "#FF0000",
        "vexora-black": "#000000",
        "vexora-dark": "#1A1A1A",
        "islamic-green": "#0B6E4F",
        "islamic-gold": "#D4AF37",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
