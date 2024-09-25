// src/pages/Projects.js
import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const proyectos = [
    { title: 'Proyecto 1', description: 'Descripción del Proyecto 1', link: '/project/1' },
    { title: 'Proyecto 2', description: 'Descripción del Proyecto 2', link: '/project/2' },
    // Añadir más proyectos según sea necesario
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Proyectos</h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {proyectos.map((proyecto, index) => (
          <ProjectCard key={index} title={proyecto.title} description={proyecto.description} link={proyecto.link} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
