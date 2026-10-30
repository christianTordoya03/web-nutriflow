/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        nutriflow: {
          'green-light': '#9bb438', // Alegría[cite: 7]
          'green-dark': '#335c32',  // Potencia[cite: 7]
          'yellow': '#ebc343',      // Bienestar[cite: 7]
          'cream': '#f6f0e0',       // Pausa[cite: 7]
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Tipografía principal
      }
    },
  },
  plugins: [],
}