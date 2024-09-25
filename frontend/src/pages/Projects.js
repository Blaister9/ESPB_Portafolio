// src/pages/Projects.js
import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <motion.div
      className="container mx-auto p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
        Proyectos
      </h1>
      <motion.div
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.75, delay: 0.3 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Proyecto 1</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Descripción breve del proyecto.</p>
          <a href="/project/1" className="text-blue-500 dark:text-gray-300 mt-4 inline-block">
            Ver más
          </a>
        </motion.div>
        {/* Añade más proyectos aquí */}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
