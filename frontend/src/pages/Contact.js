// src/pages/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", { nombre, email, mensaje });
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
