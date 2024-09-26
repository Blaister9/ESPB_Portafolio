// /home/epaz/Documentos/2_Conversation/frontend/src/services/websocket.js

const createWebSocketService = (url, onMessage) => {
    let ws = null;
    let reconnectTimeout = null;
    let isConnecting = false;
  
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
      };
  
      ws.onerror = (error) => {
        console.log("Error en el WebSocket:", error);
        isConnecting = false;
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data.mensaje);
      };
  
      ws.onclose = (event) => {
        console.log('Conexión WebSocket cerrada', event.code);
        isConnecting = false;
        if (event.code !== 1000 && event.code !== 1001) {
          console.log('Intentando reconectar WebSocket en 2 segundos...');
          reconnectTimeout = setTimeout(() => {
            connect();
          }, 2000);
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