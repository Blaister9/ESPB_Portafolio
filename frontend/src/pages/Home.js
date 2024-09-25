// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      className="container mx-auto p-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        Bienvenido a Mi Portafolio
      </motion.h1>
      <motion.p
        className="text-center mt-4 text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.0 }}
      >
        Soy un desarrollador web apasionado por la tecnología y la innovación.
      </motion.p>
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.0 }}
      >
        <a
          href="/projects"
          className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded"
        >
          Ver Proyectos
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Home;
