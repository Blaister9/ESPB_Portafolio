import React, { useEffect, useState, useRef } from 'react';
import ScrollConnector from '../../components/common/ScrollConnector'; // Agregamos ScrollConnector
import FloatingSection from '../../components/common/FloatingSection'; // Reutilizamos el componente FloatingSection para el efecto flotante
import ProjectCard from '../../components/features/Projects/ProjectCard';
import { obtenerProyectos, crearProyecto, eliminarProyecto } from '../../services/api';
import createWebSocketService from '../../services/websocket';

const Projects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: '',
    descripcion: '',
    tecnologias: '',
    link_repositorio: '',
    logros: ''
  });
  const websocketServiceRef = useRef(null);

  const fetchProyectos = async () => {
    const data = await obtenerProyectos();
    setProyectos(data);
  };

  useEffect(() => {
    const fetchProyectosYConectarWebSocket = async () => {
      await fetchProyectos();

      if (!websocketServiceRef.current) {
        websocketServiceRef.current = createWebSocketService(
          'wss://' + window.location.host + '/ws/proyectos/',
          (data) => {
            console.log('Mensaje recibido desde WebSocket en Projects:', data);
            if (!data) {
              console.error('Datos de WebSocket son undefined');
              return;
            }
            switch (data.accion) {
              case 'create':
                setProyectos((prevProyectos) => [...prevProyectos, data.data]);
                break;
              case 'update':
                setProyectos((prevProyectos) =>
                  prevProyectos.map((proyecto) =>
                    proyecto.id === data.data.id ? data.data : proyecto
                  )
                );
                break;
              case 'delete':
                setProyectos((prevProyectos) =>
                  prevProyectos.filter((proyecto) => proyecto.id !== data.data.id)
                );
                break;
              default:
                console.log('Acción de WebSocket no reconocida:', data.accion);
            }
          }
        );
        websocketServiceRef.current.connectWithDelay();
      }
    };

    fetchProyectosYConectarWebSocket();

    return () => {
      if (websocketServiceRef.current) {
        websocketServiceRef.current.close();
        console.log('WebSocket cerrado al desmontar el componente');
      }
    };
  }, []);

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    const proyectoCreado = await crearProyecto(nuevoProyecto);
    setProyectos([...proyectos, proyectoCreado]);
    setNuevoProyecto({ titulo: '', descripcion: '', tecnologias: '', link_repositorio: '' });
  };

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
    <ScrollConnector>
      
      {/* Título de la página */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
          🌟 Proyectos
        </h1>
      </FloatingSection>

      {/* Formulario para crear un nuevo proyecto */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <form className="max-w-lg mx-auto" onSubmit={handleCrearProyecto}>
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
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Logros</label>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={nuevoProyecto.logros}
              onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, logros: e.target.value })}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear Proyecto
          </button>
        </form>
      </FloatingSection>

      {/* Mostrar proyectos */}
      <FloatingSection className="h-screen flex items-center justify-center">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <ProjectCard
              key={index}
              id={proyecto.id}
              title={proyecto.titulo}
              description={proyecto.descripcion}
              tecnologias={proyecto.tecnologias}
              link={proyecto.link_repositorio}
              logros={proyecto.logros}
              onEliminar={() => handleEliminar(proyecto.id)}
            />
          ))}
        </div>
      </FloatingSection>

    </ScrollConnector>
  );
};

export default Projects;
