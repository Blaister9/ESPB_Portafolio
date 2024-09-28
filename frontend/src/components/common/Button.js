// src/components/common/Button.js
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ href, label }) => {
  return (
    <motion.a
      href={href}
      className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
};

export default Button;
