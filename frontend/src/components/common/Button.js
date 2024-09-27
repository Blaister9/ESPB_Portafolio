// src/components/Button.js
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ href, label }) => {
  return (
    <motion.a
      href={href}
      className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
};

export default Button;
