# conversaciones/consumers.py
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .conversacion_logic import manejar_conversacion

logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            await self.accept()
            logger.info("WebSocket conectado")
        except Exception as e:
            logger.error(f"Error en connect: {e}")
            await self.close()

    async def disconnect(self, close_code):
        logger.info(f"WebSocket desconectado: {close_code}")

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            tema = text_data_json['mensaje']
            if not tema:
                await self.send(text_data=json.dumps({'error': 'El tema no puede estar vacío'}))
                return
            # Iniciar la conversación con el tema
            logger.info(f"Conversación iniciada con tema: {tema}")
            await manejar_conversacion(tema, self)
        except Exception as e:
            logger.error(f"Error en receive: {e}")
            await self.send(text_data=json.dumps({'error': str(e)}))
