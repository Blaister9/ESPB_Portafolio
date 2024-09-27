// /home/epaz/Documentos/2_Conversation/frontend/src/components/chat/ChatWebSocket.js

import React, { useEffect, useState, useRef } from 'react';
import { iniciarConversacion } from '../../../services/api';
import createWebSocketService from '../../../services/websocket';

const ChatWebSocket = () => {
  const [mensajes, setMensajes] = useState([]);
  const [tema, setTema] = useState('');
  const webSocketServiceRef = useRef(null);
  const hasConnectedRef = useRef(false);

  useEffect(() => {
    if (!hasConnectedRef.current) {
      const service = createWebSocketService('wss://' + window.location.host + '/ws/chat/', (mensaje) => {
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
        if (webSocketServiceRef.current) {
          webSocketServiceRef.current.sendMessage(tema);
        } else {
          console.error("El servicio WebSocket no está disponible.");
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
          <p key={index}>{msg.autor}: {msg.mensaje}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatWebSocket;