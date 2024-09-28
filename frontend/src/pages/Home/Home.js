// /home/epaz/Documentos/2_Conversation/frontend/src/pages/Home/Home.jsimport React from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';

const Home = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
    >
      {/* Sección del mensaje sobre Santensor */}
      <motion.div
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-24"  // Sombra suavizada y más espacio debajo
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h2
          className="text-4xl font-serif text-gray-900 dark:text-gray-100 text-center tracking-wide"  // Aumentamos el tamaño y el espaciado
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          ¿Por Qué es Santensor?
        </motion.h2>
        <motion.p
          className="text-lg mt-6 text-gray-700 dark:text-gray-300 text-center leading-relaxed"  // Ajustamos el espaciado y el interlineado para legibilidad
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <strong>Santensor</strong> es una fusión de mi nombre y el concepto de "tensores", destacando mi enfoque en la intersección entre matemáticas avanzadas y tecnología de vanguardia en IA. Este nombre refleja mi pasión por los tensores y mi visión de ofrecer soluciones técnicas de alto rendimiento para problemas complejos.
        </motion.p>
      </motion.div>

      {/* El contenido existente de la página */}
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mt-24" // Agregamos más espacio superior (mt-24)
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        Bienvenido a Mi Portafolio
      </motion.h1>
      <motion.p
        className="text-center mt-8 text-gray-600 dark:text-gray-300"  // Aumentamos el espacio entre el título y el párrafo (mt-8)
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.0 }}
      >
        Soy un desarrollador web apasionado por la tecnología y la innovación.
      </motion.p>
      <motion.div
        className="text-center mt-12"  // Incrementamos el espacio entre el párrafo y el botón (mt-12)
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.0 }}
      >
        <Button href="/projects" label="Ver Proyectos" />
      </motion.div>
    </motion.div>
  );
};

export default Home;

