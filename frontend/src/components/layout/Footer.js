// src/components/layout/Footer.js
import React from 'react';
import { FaGithub, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <span className="text-lg font-semibold">Conéctate conmigo:</span>
        </div>
        <div className="flex space-x-6">
          {/* Enlace a GitHub */}
          <a
            href="https://github.com/Blaister9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary"
            aria-label="GitHub"
          >
            <FaGithub size={30} />
          </a>
          {/* Enlace a WhatsApp */}
          <a
            href="https://wa.me/573153197249"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={30} />
          </a>
        </div>
        <div className="mt-4 text-sm">
          <p>© {new Date().getFullYear()} Santensor. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
