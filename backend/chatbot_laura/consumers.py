import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .chatbot_logic import search, df, index

logger = logging.getLogger(__name__)

class LauraChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        logger.info("WebSocket conectado para Laura Chatbot")

    async def disconnect(self, close_code):
        logger.info(f"WebSocket desconectado para Laura Chatbot: {close_code}")

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            mensaje = text_data_json.get('message', '')
            if not mensaje:
                await self.send(text_data=json.dumps({'error': 'El mensaje no puede estar vacío'}))
                return

            logger.info(f"Mensaje recibido para Laura Chatbot: {mensaje}")

            # Usar la función search de chatbot_logic.py
            resultados = search(mensaje, df, index)

            # Formatear los resultados
            formatted_resultados = [
                {
                    'pregunta': res['content'].get('pregunta', res['content'].get('titulo', 'Sin título')),
                    'respuesta': res['content'].get('respuesta', res['content'].get('descripcion', 'Sin descripción')),
                    'url': res.get('url', ''),
                    'type': res.get('type', ''),
                    'similarity_score': res.get('similarity_score', 0)
                }
                for res in resultados
            ]

            # Enviar respuesta
            await self.send(text_data=json.dumps({
                'message': formatted_resultados
            }))
        except Exception as e:
            logger.error(f"Error en receive para Laura Chatbot: {e}")
            await self.send(text_data=json.dumps({'error': str(e)}))