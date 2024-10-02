///home/epaz/Documentos/2_Conversation/frontend/src/components/features/LauraChatbot/LauraChatbot.js
import React, { useEffect, useState, useRef } from 'react';
import createWebSocketService from '../../../services/websocket';
import { enviarMensajeLaura } from '../../../services/api';

const LauraChatbot = () => {
    const [mensajes, setMensajes] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const webSocketServiceRef = useRef(null);
    const hasConnectedRef = useRef(false);

    useEffect(() => {
        if (!hasConnectedRef.current) {
            const service = createWebSocketService('wss://' + window.location.host + '/ws/laura-chat/', (mensaje) => {
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

    const enviarMensaje = async () => {
        if (!inputMessage.trim()) {
            alert("Por favor, introduce un mensaje válido.");
            return;
        }
        
        setMensajes((prevMensajes) => [...prevMensajes, { autor: 'Usuario', mensaje: inputMessage }]);
        
        try {
            // Intenta enviar por WebSocket primero
            if (webSocketServiceRef.current) {
                webSocketServiceRef.current.sendMessage(inputMessage);
            }
            
            // También envía a través de la API REST como respaldo
            const respuestaAPI = await enviarMensajeLaura(inputMessage);
            if (respuestaAPI.resultados) {
                setMensajes((prevMensajes) => [...prevMensajes, { autor: 'Laura', mensaje: respuestaAPI.resultados[0].content }]);
            }
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
            setMensajes((prevMensajes) => [...prevMensajes, { autor: 'Sistema', mensaje: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' }]);
        }

        setInputMessage('');
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                Chat con Laura
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md mb-4 h-96 overflow-y-auto">
                {mensajes.map((msg, index) => (
                    <p key={index} className="text-gray-800 dark:text-gray-100 mb-2">
                        <span className="font-bold">{msg.autor}:</span> {msg.mensaje}
                    </p>
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