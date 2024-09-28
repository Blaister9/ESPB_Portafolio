import React from 'react';
import ScrollConnector from '../../components/common/ScrollConnector';
import FloatingSection from '../../components/common/FloatingSection'; // Componente reutilizable para efecto flotante
import { motion } from 'framer-motion'; // Aseguramos que motion esté presente para las animaciones suaves
import useScrollToTop from '../../hooks/useScrollToTop';

const About = () => {
  useScrollToTop();
  return (
    <ScrollConnector>
      
      {/* Título de la página */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.h1
          className="text-5xl font-bold text-center text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          🌟 Sobre Mí
        </motion.h1>
      </FloatingSection>

      {/* Sección de introducción */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 leading-relaxed">
            Soy un desarrollador web con experiencia en React, Django, inteligencia artificial y mucho más. Tengo pasión por la creación de aplicaciones innovadoras y la resolución de problemas complejos.
          </p>
        </motion.div>
      </FloatingSection>

      {/* Sección de Experiencia Laboral */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            💼 Experiencia Laboral
          </h2>
          <ul className="list-disc list-inside mt-6 text-xl text-gray-700 dark:text-gray-300">
            <li>Softtek Renovation: Ingeniero de sistemas especializado en proyectos de IA y tecnología avanzada.</li>
            <li>Compañía Industrial de Productos Agropecuarios: Gestión de software y optimización de procesos tecnológicos.</li>
            <li>Más de 6 años de experiencia en desarrollo técnico y gestión de proyectos.</li>
          </ul>
        </motion.div>
      </FloatingSection>

      {/* Sección de Educación */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            🎓 Educación
          </h2>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            Graduado en Ingeniería Mecatrónica, especializado en Inteligencia Artificial y tecnologías avanzadas.
          </p>
        </motion.div>
      </FloatingSection>

      {/* Sección de Habilidades */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            🔧 Habilidades
          </h2>
          <ul className="list-disc list-inside mt-6 text-xl text-gray-700 dark:text-gray-300">
            <li>Desarrollo web en React y Django</li>
            <li>Implementación de proyectos de IA y Machine Learning</li>
            <li>Optimización de software y procesos tecnológicos</li>
          </ul>
        </motion.div>
      </FloatingSection>

      {/* Información sensible (borrosa/encriptada hasta autenticación) */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            🔒 Información Personal
          </h2>
          <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 text-center blurry-text">
            [Información confidencial oculta] - Inicie sesión para ver detalles.
          </p>
        </motion.div>
      </FloatingSection>

    </ScrollConnector>
  );
};

export default About;
