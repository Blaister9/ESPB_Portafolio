// frontend/src/services/api.js
const BASE_URL = "https://santensor.com/api/";

// Función para enviar mensajes al chatbot Laura
export async function enviarMensajeLaura(mensaje) {
    const response = await fetch(`${BASE_URL}chatbot-laura/search/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje }),
    });
    const data = await response.json();
    return data;
}

// Función para iniciar una conversación
export async function iniciarConversacion(tema) {
    const response = await fetch(`${BASE_URL}iniciar_conversacion/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tema }),
    });
    const data = await response.json();
    return data;
}

// Función para obtener el estado actual de la conversación
export async function obtenerConversacion() {
    const response = await fetch(`${BASE_URL}obtener_conversacion/`, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

// Función para obtener todos los proyectos
export async function obtenerProyectos() {
    const response = await fetch(`${BASE_URL}proyectos/`, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

// Función para crear un nuevo proyecto
export async function crearProyecto(proyecto) {
    const response = await fetch(`${BASE_URL}proyectos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
    });
    const data = await response.json();
    return data;
}

// Función para actualizar un proyecto existente
export async function actualizarProyecto(id, proyecto) {
    const response = await fetch(`${BASE_URL}proyectos/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
    });
    const data = await response.json();
    return data;
}

// Función para eliminar un proyecto
export async function eliminarProyecto(id) {
    const response = await fetch(`${BASE_URL}proyectos/${id}/`, {
        method: "DELETE",
    });
    return response.ok;
}
