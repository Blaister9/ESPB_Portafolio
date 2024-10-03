# chatbot_laura/consumers.py
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .chatbot_laura_logic import ChatbotLauraLogic

logger = logging.getLogger(__name__)

class LauraChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            await self.accept()
            logger.info("WebSocket conectado para Laura Chatbot")
        except Exception as e:
            logger.error(f"Error en connect para Laura Chatbot: {e}")
            await self.close()

    async def disconnect(self, close_code):
        logger.info(f"WebSocket desconectado para Laura Chatbot: {close_code}")

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            
            mensaje = text_data_json.get('mensaje', '')
            if not mensaje:
                await self.send(text_data=json.dumps({'error': 'El mensaje no puede estar vacío'}))
                return

            logger.info(f"Mensaje recibido para Laura Chatbot: {mensaje}")
            
            # Usar la lógica de ChatbotLauraLogic para procesar el mensaje
            chatbot_logic = ChatbotLauraLogic()
            resultados = await chatbot_logic.search(mensaje)
            
            # Procesar resultados para hacerlos más legibles
            formatted_resultados = [
                {
                    'pregunta': res.get('pregunta', 'Sin pregunta'),
                    'respuesta': res.get('respuesta', 'Sin respuesta'),
                    'url': res.get('url', ''),
                    'similarity_score': res.get('similarity_score', 0)
                } 
                for res in resultados
            ]
            
            # Enviar respuesta
            await self.send(text_data=json.dumps({
                'resultados': formatted_resultados
            }))
        except Exception as e:
            logger.error(f"Error en receive para Laura Chatbot: {e}")
            await self.send(text_data=json.dumps({'error': str(e)}))
