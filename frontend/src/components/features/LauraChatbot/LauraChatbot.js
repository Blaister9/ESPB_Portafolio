import React, { useEffect, useState, useRef, useCallback } from 'react';
import createWebSocketService from '../../../services/websocket';

const LauraChatbot = () => {
  const [mensajes, setMensajes] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const webSocketServiceRef = useRef(null);
  const mensajesRef = useRef([]);

  useEffect(() => {
    console.log("Inicializando WebSocket...");
    const service = createWebSocketService(
      'wss://' + window.location.host + '/ws/laura-chat/',
      handleWebSocketMessage
    );
    service.connectWithDelay(500);
    webSocketServiceRef.current = service;

    return () => {
      console.log("Cerrando WebSocket...");
      if (webSocketServiceRef.current) {
        webSocketServiceRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log("Estado de mensajes actualizado:", mensajes);
    mensajesRef.current = mensajes;
  }, [mensajes]);

  const handleWebSocketMessage = useCallback((mensaje) => {
    console.log("Mensaje recibido en LauraChatbot:", mensaje);
    if (mensaje.respuesta) {
      console.log("Añadiendo respuesta de Laura:", mensaje.respuesta);
      setMensajes(prevMensajes => {
        const nuevosMensajes = [...prevMensajes, { autor: 'Laura', mensaje: mensaje.respuesta }];
        console.log("Nuevo estado de mensajes:", nuevosMensajes);
        return nuevosMensajes;
      });
    } else if (mensaje.error) {
      console.log("Añadiendo mensaje de error:", mensaje.error);
      setMensajes(prevMensajes => [...prevMensajes, { autor: 'Sistema', mensaje: mensaje.error }]);
    }
  }, []);

  const enviarMensaje = useCallback(() => {
    if (!inputMessage.trim()) return;

    console.log("Enviando mensaje:", inputMessage);
    setMensajes(prevMensajes => {
      const nuevosMensajes = [...prevMensajes, { autor: 'Usuario', mensaje: inputMessage }];
      console.log("Nuevo estado de mensajes después de enviar:", nuevosMensajes);
      return nuevosMensajes;
    });

    if (webSocketServiceRef.current) {
      webSocketServiceRef.current.sendMessage({ mensaje: inputMessage });
    } else {
      console.error("WebSocket no inicializado");
    }

    setInputMessage('');
  }, [inputMessage]);

  console.log("Renderizando LauraChatbot. Número de mensajes:", mensajes.length);

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Chat con Laura</h2>
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4 h-96 overflow-y-auto">
        {mensajes.map((msg, index) => {
          console.log(`Renderizando mensaje ${index}:`, msg);
          return (
            <p key={index} className="mb-2">
              <span className="font-bold">{msg.autor}:</span> {msg.mensaje}
            </p>
          );
        })}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
          placeholder="Escribe tu mensaje aquí"
          className="flex-grow p-3 border rounded-l"
        />
        <button
          onClick={enviarMensaje}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-r"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default LauraChatbot;