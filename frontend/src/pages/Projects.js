// src/pages/Projects.js
import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { obtenerProyectos, crearProyecto, eliminarProyecto } from '../services/api';

const Projects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: '',
    descripcion: '',
    tecnologias: '',
    link_repositorio: ''
  });

  // Obtener los proyectos desde la API
  useEffect(() => {
    const fetchProyectos = async () => {
      const data = await obtenerProyectos();
      setProyectos(data);
    };
    fetchProyectos();
  }, []);

  // Función para manejar la creación de un nuevo proyecto
  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    const proyectoCreado = await crearProyecto(nuevoProyecto);
    setProyectos([...proyectos, proyectoCreado]);
    setNuevoProyecto({ titulo: '', descripcion: '', tecnologias: '', link_repositorio: '' });
  };

  // Función para manejar la eliminación de un proyecto
  const handleEliminar = async (id) => {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
    if (confirmado) {
      const success = await eliminarProyecto(id);
      if (success) {
        setProyectos(proyectos.filter((proyecto) => proyecto.id !== id));
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Proyectos</h1>

      {/* Formulario para crear un nuevo proyecto */}
      <form className="mt-8 max-w-lg mx-auto" onSubmit={handleCrearProyecto}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Título</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={nuevoProyecto.titulo}
            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, titulo: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Descripción</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={nuevoProyecto.descripcion}
            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, descripcion: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Tecnologías</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={nuevoProyecto.tecnologias}
            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, tecnologias: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Link del Repositorio</label>
          <input
            type="url"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={nuevoProyecto.link_repositorio}
            onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, link_repositorio: e.target.value })}
            required
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear Proyecto
        </button>
      </form>

      {/* Mostrar proyectos */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {proyectos.map((proyecto,index) => (
          <ProjectCard
            key={index}
            id={proyecto.id} 
            title={proyecto.titulo}
            description={proyecto.descripcion}
            tecnologias={proyecto.tecnologias}
            link={proyecto.link_repositorio}
            onEliminar={() => handleEliminar(proyecto.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
