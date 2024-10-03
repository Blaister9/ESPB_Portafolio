# chatbot_laura/consumers.py
# chatbot_laura/consumers.py
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .views import ChatbotLauraView

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

            # Usar ChatbotLauraView para procesar el mensaje
            chatbot_view = ChatbotLauraView()
            resultados = await chatbot_view.search(mensaje)  # FAISS busca el mensaje

            # Procesar los resultados a través de GPT-4
            respuesta_gpt4 = await generar_respuesta_gpt4(resultados)

            # Enviar la respuesta de GPT-4 al cliente
            await self.send(text_data=json.dumps({
                'respuesta': respuesta_gpt4
            }))
        except Exception as e:
            logger.error(f"Error en receive para Laura Chatbot: {e}")
            await self.send(text_data=json.dumps({'error': str(e)}))
