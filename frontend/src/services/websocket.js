// /home/epaz/Documentos/2_Conversation/frontend/src/services/websocket.js

const createWebSocketService = (url, onMessage, maxRetries = 2) => {
  let ws = null;
  let reconnectTimeout = null;
  let isConnecting = false;
  let retryCount = 0; // Contador de reintentos

  const connect = () => {
    if (isConnecting || (ws && ws.readyState === WebSocket.OPEN)) {
      console.log('WebSocket ya está conectado o conectándose');
      return;
    }

    isConnecting = true;
    ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Conexión WebSocket abierta');
      clearTimeout(reconnectTimeout);
      isConnecting = false;
      retryCount = 0; // Reinicia el contador de reintentos al conectar exitosamente
    };

    ws.onerror = (error) => {
      console.log("Error en el WebSocket:", error);
      isConnecting = false;
    };

    ws.onmessage = (event) => {
      console.log('Mensaje raw recibido:', event.data);
      try {
        const data = JSON.parse(event.data);
        console.log('Mensaje parseado:', data);
        onMessage(data);
      } catch (error) {
        console.error('Error al parsear el mensaje:', error);
        console.log('Mensaje que causó el error:', event.data);
      }
    };

    ws.onclose = (event) => {
      console.log('Conexión WebSocket cerrada', event.code);
      isConnecting = false;

      // Sólo intenta reconectar si el código no indica un cierre normal y si no se ha alcanzado el límite de reintentos
      if (event.code !== 1000 && event.code !== 1001 && retryCount < maxRetries) {
        retryCount++;
        console.log(`Intentando reconectar WebSocket en 2 segundos... (Intento ${retryCount} de ${maxRetries})`);
        reconnectTimeout = setTimeout(() => {
          connect();
        }, 2000);
      } else if (retryCount >= maxRetries) {
        console.log(`Límite de reintentos alcanzado (${maxRetries}). No se intentará reconectar.`);
      }
    };
  };

  const connectWithDelay = (delay = 500) => {
    setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = (mensaje) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ mensaje }));
      console.log("Mensaje enviado al WebSocket:", mensaje);
    } else {
      console.error("El WebSocket no está abierto.");
    }
  };

  const close = () => {
    if (ws) {
      ws.close();
    }
    clearTimeout(reconnectTimeout);
  };

  return {
    connectWithDelay,
    sendMessage,
    close
  };
};

export default createWebSocketService;
