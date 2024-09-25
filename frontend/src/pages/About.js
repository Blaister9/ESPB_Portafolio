// src/pages/About.js
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      className="container mx-auto p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
        Sobre Mí
      </h1>
      <motion.p
        className="mt-4 text-center text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.0 }}
      >
        Soy un desarrollador web con experiencia en React, Django, IA y más.
      </motion.p>
      <motion.p
        className="mt-4 text-center text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.0 }}
      >
        Tengo pasión por la creación de aplicaciones innovadoras y la resolución de problemas complejos.
      </motion.p>
    </motion.div>
  );
};

export default About;
