import React, { useEffect, useState, useRef } from 'react';
import createWebSocketService from '../../../services/websocket';

const LauraChatbot = () => {
    const [mensajes, setMensajes] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const webSocketServiceRef = useRef(null);
    const hasConnectedRef = useRef(false);

    useEffect(() => {
        if (!hasConnectedRef.current) {
            // Conexión WebSocket
            const service = createWebSocketService('wss://' + window.location.host + '/ws/laura-chat/', (mensaje) => {
                console.log("Mensaje recibido desde WebSocket:", mensaje);  // Log para ver el mensaje recibido
    
                // Agregar el mensaje recibido a la lista de mensajes
                setMensajes((prevMensajes) => [...prevMensajes, mensaje]);
            });
            service.connectWithDelay(500);
            webSocketServiceRef.current = service;
            hasConnectedRef.current = true;
    
            return () => {
                if (webSocketServiceRef.current) {
                    webSocketServiceRef.current.close();
                }
            };
        }
    }, []);

    // Función para enviar el mensaje por WebSocket
    const enviarMensaje = async () => {
        if (!inputMessage.trim()) {
            alert("Por favor, introduce un mensaje válido.");
            return;
        }

        // Agrega el mensaje del usuario al chat
        setMensajes((prevMensajes) => [...prevMensajes, { autor: 'Usuario', mensaje: inputMessage }]);

        try {
            // Envía el mensaje a través del WebSocket
            if (webSocketServiceRef.current) {
                webSocketServiceRef.current.sendMessage({ mensaje: inputMessage });
            }
        } catch (error) {
            console.error("Error al enviar el mensaje por WebSocket:", error);
            setMensajes((prevMensajes) => [...prevMensajes, { autor: 'Sistema', mensaje: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' }]);
        }

        setInputMessage('');
    };

    // Función para renderizar los mensajes en el chat
    const renderMensaje = (msg) => {
        // Verifica si se recibió un error
        if (msg.error) {
            console.error("Mensaje de error recibido:", msg.error);
            return (
                <p className="text-red-600">
                    <span className="font-bold">Error:</span> {msg.error}
                </p>
            );
        }

        // Si se recibió una respuesta procesada por GPT-4
        if (msg.respuesta) {
            return (
                <p className="text-gray-800 dark:text-gray-100 mb-2">
                    <span className="font-bold">Laura:</span> {msg.respuesta}
                </p>
            );
        }

        // Renderiza mensajes de usuario u otros tipos de mensajes
        return (
            <p className="text-gray-800 dark:text-gray-100 mb-2">
                <span className="font-bold">{msg.autor || "Desconocido"}:</span> {msg.mensaje || JSON.stringify(msg)}
            </p>
        );
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                Chat con Laura
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md mb-4 h-96 overflow-y-auto">
                {mensajes.map((msg, index) => (
                    <div key={index}>{renderMensaje(msg)}</div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                    placeholder="Escribe tu mensaje aquí"
                    className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                    onClick={enviarMensaje}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-r transition duration-200"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default LauraChatbot;
