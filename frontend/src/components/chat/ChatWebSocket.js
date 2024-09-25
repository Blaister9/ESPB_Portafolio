// frontend/src/components/chat/ChatWebSocket.js
import React, { useEffect, useState } from 'react';
import { iniciarConversacion } from '../../services/api';

const ChatWebSocket = () => {
    const [mensajes, setMensajes] = useState([]);
    const [tema, setTema] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new WebSocket('ws://localhost:8000/ws/chat/');
    
            socket.onopen = () => {
                console.log('Conexión WebSocket abierta');
            };
    
            socket.onerror = (error) => {
                console.log("Error en el WebSocket:", error);
            };
    
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMensajes((prevMensajes) => [...prevMensajes, data.mensaje]);
            };
    
            socket.onclose = (event) => {
                console.log('Conexión WebSocket cerrada', event.code);
                if (event.code !== 1000 && event.code !== 1001) {
                    console.log('Intentando reconectar WebSocket en 2 segundos...');
                    setTimeout(() => {
                        connectWebSocket();
                    }, 2000);
                }
            };
    
            setWs(socket);
        };
    
        // Delay de 500ms antes de conectar
        const timeout = setTimeout(() => {
            connectWebSocket();
        }, 500);
    
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    

    const iniciarConversacionHandler = async () => {
        if (!tema.trim()) {
            alert("Por favor, introduce un tema válido.");
            return;
        }
        
        try {
            const response = await iniciarConversacion(tema);
            console.log('Conversación iniciada:', response);
            if (response.error) {
                console.error("Error al iniciar la conversación:", response.error);
                alert(response.error);
            } else {
                // Enviar el tema al WebSocket para iniciar la conversación entre IA
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ mensaje: tema }));  // Enviamos el tema al WebSocket
                    console.log("Tema enviado al WebSocket:", tema);
                } else {
                    console.error("El WebSocket no está abierto.");
                }
            }
        } catch (error) {
            console.error("Error al iniciar la conversación:", error);
            alert("Ocurrió un error al iniciar la conversación.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Tema de la conversación"
            />
            <button onClick={iniciarConversacionHandler}>Iniciar Conversación</button>

            <div>
                {mensajes.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
};

export default ChatWebSocket;
