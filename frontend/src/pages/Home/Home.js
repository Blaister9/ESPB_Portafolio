import React from 'react';
import ScrollConnector from '../../components/common/ScrollConnector';
import FloatingSection from '../../components/common/FloatingSection'; 
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import useScrollToTop from '../../hooks/useScrollToTop';

const Home = () => {
  useScrollToTop();
  return (
    <ScrollConnector>
      
      {/* Sección de bienvenida */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.h1
          className="text-5xl font-bold text-center text-gray-800 dark:text-gray-100 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          🌟 Bienvenido a Mi Portafolio
        </motion.h1>
      </FloatingSection>

      {/* Sección del mensaje sobre Santensor */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-5xl font-serif text-gray-900 dark:text-gray-100 text-center tracking-wider">
            🌟 ¿Por Qué es Santensor?
          </h2>
          <p className="text-lg mt-6 text-gray-700 dark:text-gray-300 text-center leading-relaxed">
            <strong>Santensor</strong> es una fusión de mi nombre y el concepto de "tensores", destacando mi enfoque en la intersección entre matemáticas avanzadas y tecnología de vanguardia en IA. Este nombre refleja mi pasión por los tensores y mi visión de ofrecer soluciones técnicas de alto rendimiento para problemas complejos.
          </p>
        </motion.div>
      </FloatingSection>

      {/* Sección de abrebocas de la Hoja de Vida */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
            📝 Abrebocas de Mi Trayectoria Profesional
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 text-center mb-6">
            Ingeniero de sistemas con más de 6 años de experiencia en la gestión de software y desarrollo técnico, trabajando en empresas como Softtek Renovation y la Compañía Industrial de Productos Agropecuarios.
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 text-center">
            💼 Especializado en Ingeniería Mecatrónica con conocimientos avanzados en inteligencia artificial.
          </p>
          <div className="text-center mt-8">
            <Button href="/about" label="Ver más sobre mi trayectoria" />
          </div>
        </motion.div>
      </FloatingSection>

      {/* Botón de proyectos */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.0 }}
        >
          <Button href="/projects" label="Ver Proyectos" />
        </motion.div>
      </FloatingSection>

    </ScrollConnector>
  );
};

export default Home;
