// src/components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ToggleDarkMode from '../../components/ui/ToggleDarkMode';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white dark:bg-dark shadow-md z-50">
      <div>
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-light">
          Mi Portafolio
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-gray-800 dark:text-light hover:underline">
          Sobre Mí
        </Link>
        <Link to="/projects" className="text-gray-800 dark:text-light hover:underline">
          Proyectos
        </Link>
        <Link to="/contact" className="text-gray-800 dark:text-light hover:underline">
          Contacto
        </Link>
        <ToggleDarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
