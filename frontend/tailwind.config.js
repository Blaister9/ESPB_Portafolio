// tailwind.config.js
export const darkMode = 'class'; // Mantiene soporte para dark mode
export const content = [
  './src/**/*.{js,jsx,ts,tsx,css}',
];

export const theme = {
  extend: {
    colors: {
      // Paleta de colores base
      primary: '#3490dc',      // Azul moderno
      secondary: '#ffed4a',    // Amarillo claro
      background: '#f7fafc',   // Fondo blanco
      text: '#2d3748',         // Texto gris oscuro
      success: '#38c172',      // Verde para éxito
      error: '#e3342f',        // Rojo para errores
      // Colores para modo oscuro
      dark: '#1a202c',
      light: '#f7fafc',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],        // Tipografía principal
      serif: ['Playfair Display', 'serif'], // Tipografía secundaria para títulos
    },
    spacing: {
      4: '4px',
      8: '8px',
      16: '16px',
      24: '24px',
      32: '32px',
      48: '48px',
      64: '64px',
    },
  },
};

export const plugins = [];
