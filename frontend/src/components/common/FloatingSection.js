import React from 'react';
import { motion } from 'framer-motion';

// Componente flotante reutilizable
const FloatingSection = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingSection;
