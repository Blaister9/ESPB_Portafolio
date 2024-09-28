import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingSection from '../../components/common/FloatingSection'; // Utilizamos el efecto flotante pero de manera más sutil

const Contact = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setFormStatus('Todos los campos son obligatorios');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormStatus('Introduce un correo válido');
      return;
    }

    console.log("Formulario enviado", { nombre, email, mensaje });
    setFormStatus('Formulario enviado con éxito');
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <FloatingSection>
      <div className="container mx-auto p-8">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          Contáctame
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <label className="block text-gray-700 dark:text-gray-300">Nombre</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <label className="block text-gray-700 dark:text-gray-300">Mensaje</label>
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Enviar
          </motion.button>
        </form>

        {formStatus && (
          <motion.p
            className={`mt-4 text-center ${formStatus.includes('éxito') ? 'text-green-500' : 'text-red-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {formStatus}
          </motion.p>
        )}
      </div>
    </FloatingSection>
  );
};

export default Contact;
