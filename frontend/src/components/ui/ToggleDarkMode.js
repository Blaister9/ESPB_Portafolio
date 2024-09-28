// src/components/ui/ToggleDarkMode.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleDarkMode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 focus:outline-none rounded-full bg-gray-200 dark:bg-gray-700 transition duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
};

export default ToggleDarkMode;
