// frontend/src/services/api.js
const BASE_URL = "http://localhost:8000/api/";

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
