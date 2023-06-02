//  @type {import('tailwindcss').Config}
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "weather-primary": "#1e2095",
        // "weather-secondary": "#101171",
        "weather-primary": "#03001C",
        "weather-secondary": "#16213E",
      },
    },
    fontFamily: {
      Soro: ["Soro, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "40rem",
      md: "48rem",
    },
  },
  plugins: [],
};
