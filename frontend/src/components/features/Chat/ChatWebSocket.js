// src/components/features/Chat/ChatWebSocket.js
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
      if (response.error) {
        alert(response.error);
      } else {
        if (webSocketServiceRef.current) {
          webSocketServiceRef.current.sendMessage(tema);
        }
      }
    } catch (error) {
      alert("Ocurrió un error al iniciar la conversación.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
        Chat en Tiempo Real
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Tema de la conversación"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={iniciarConversacionHandler}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded mt-2 transition duration-200 w-full"
        >
          Iniciar Conversación
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md">
        {mensajes.length > 0 ? (
          mensajes.map((msg, index) => (
            <p key={index} className="text-gray-800 dark:text-gray-100">
              <span className="font-bold">{msg.autor}:</span> {msg.mensaje}
            </p>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">No hay mensajes aún.</p>
        )}
      </div>
    </div>
  );
};

export default ChatWebSocket;
