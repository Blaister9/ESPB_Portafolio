import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { actualizarProyecto } from '../services/api';

const ProjectCard = ({ id, title, description, tecnologias, link, logros, onEliminar }) => {
  const [editando, setEditando] = useState(false);
  const [proyectoEditado, setProyectoEditado] = useState({
    titulo: title || '',
    descripcion: description || '',
    tecnologias: tecnologias || '',  // Aseguramos que tecnologías no sea undefined
    link_repositorio: link || '',
    logros: logros || ''
  });

  const handleActualizarProyecto = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", proyectoEditado); // Añadir log
    if (id) {
      try {
        await actualizarProyecto(id, proyectoEditado);
        setEditando(false); // Cerrar el modo de edición después de la actualización
      } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
      }
    } else {
      console.error("ID del proyecto no encontrado");
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      {editando ? (
        <form onSubmit={handleActualizarProyecto}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Título</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={proyectoEditado.titulo}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, titulo: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Descripción</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={proyectoEditado.descripcion}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, descripcion: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Tecnologías</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={proyectoEditado.tecnologias}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, tecnologias: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Link del Repositorio</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={proyectoEditado.link_repositorio}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, link_repositorio: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Logros</label>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={proyectoEditado.logros}
              onChange={(e) => setProyectoEditado({ ...proyectoEditado, logros: e.target.value })}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Guardar
          </button>
          <button
            type="button"
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setEditando(false)}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Título: {title}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Descripción: {description}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Tecnologías: {tecnologias || 'Sin tecnologías'}</p>
          {logros && <p className="mt-2 text-gray-600 dark:text-gray-300">Logros: {logros}</p>}
          <a href={link} className="text-blue-500 dark:text-gray-300 mt-4 inline-block"> URL:
            Ver más
          </a>
          <div className="mt-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>
            <button
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onEliminar}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProjectCard;
