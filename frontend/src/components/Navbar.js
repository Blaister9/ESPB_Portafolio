// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ToggleDarkMode from './ToggleDarkMode';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
      <div>
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          Mi Portafolio
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-gray-800 dark:text-white hover:underline">
          Sobre Mí
        </Link>
        <Link to="/projects" className="text-gray-800 dark:text-white hover:underline">
          Proyectos
        </Link>
        <Link to="/contact" className="text-gray-800 dark:text-white hover:underline">
          Contacto
        </Link>
        <ToggleDarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
