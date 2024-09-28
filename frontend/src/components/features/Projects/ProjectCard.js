// src/components/features/Projects/ProjectCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { actualizarProyecto } from '../../../services/api';

const ProjectCard = ({ id, title, description, tecnologias, link, logros, onEliminar }) => {
  const [editando, setEditando] = useState(false);
  const [proyectoEditado, setProyectoEditado] = useState({
    titulo: title || '',
    descripcion: description || '',
    tecnologias: tecnologias || '',
    link_repositorio: link || '',
    logros: logros || ''
  });

  const handleActualizarProyecto = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", proyectoEditado);
    if (id) {
      try {
        await actualizarProyecto(id, proyectoEditado);
        setEditando(false);
      } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
      }
    } else {
      console.error("ID del proyecto no encontrado");
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {editando ? (
        <form onSubmit={handleActualizarProyecto} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Título</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={proyectoEditado.titulo}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, titulo: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Descripción</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={proyectoEditado.descripcion}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, descripcion: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Tecnologías</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={proyectoEditado.tecnologias}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, tecnologias: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Link del Repositorio</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={proyectoEditado.link_repositorio}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, link_repositorio: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Logros</label>
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={proyectoEditado.logros}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, logros: e.target.value })}
            />
          </div>
          <div className="flex space-x-4">
            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-200">
              Guardar
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Título: {title}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Descripción: {description}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Tecnologías: {tecnologias || 'Sin tecnologías'}</p>
          {logros && <p className="mt-2 text-gray-600 dark:text-gray-300">Logros: {logros}</p>}
          <a href={link} className="text-primary dark:text-blue-300 mt-4 inline-block"> Ver repositorio</a>
          <div className="mt-4 flex space-x-4">
            {/*<button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              onClick={onEliminar}
            >
              Eliminar
            </button>*/}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProjectCard;
