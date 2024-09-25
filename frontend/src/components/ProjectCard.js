// src/components/ProjectCard.js
import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, link }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <a href={link} className="text-blue-500 dark:text-gray-300 mt-4 inline-block">
        Ver más
      </a>
    </motion.div>
  );
};

export default ProjectCard;
