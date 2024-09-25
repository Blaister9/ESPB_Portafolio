// frontend/src/ChatWebSocket.js
import React, { useEffect, useState } from 'react';

const ChatWebSocket = () => {
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/chat/');

        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setMensajes((prevMensajes) => [...prevMensajes, data.mensaje]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const enviarMensaje = () => {
        const ws = new WebSocket('ws://localhost:8000/ws/chat/');
        ws.onopen = function() {
            ws.send(JSON.stringify({
                'mensaje': mensaje
            }));
        };
    };

    return (
        <div>
            <h2>Chat en Tiempo Real</h2>
            <div>
                {mensajes.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
            />
            <button onClick={enviarMensaje}>Enviar</button>
        </div>
    );
};

export default ChatWebSocket;
