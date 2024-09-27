// src/components/ToggleDarkMode.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleDarkMode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!theme) {
    return null; // Retorna nada si el tema no está disponible para evitar errores
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
};

export default ToggleDarkMode;
