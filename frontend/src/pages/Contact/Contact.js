// src/pages/Contact.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [formStatus, setFormStatus] = useState(''); // Nueva variable para manejar el estado del formulario

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!nombre || !email || !mensaje) {
      setFormStatus('Todos los campos son obligatorios');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormStatus('Introduce un correo válido');
      return;
    }

    // Simulación de envío del formulario
    console.log("Formulario enviado", { nombre, email, mensaje });
    setFormStatus('Formulario enviado con éxito');
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Contáctame</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Mensaje</label>
          <textarea
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded"
        >
          Enviar
        </motion.button>
      </form>
      
      {/* Mensaje de estado del formulario */}
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
  );
};

export default Contact;
