import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer

logger = logging.getLogger(__name__)

class ProyectoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            logger.info("Intentando conectar al WebSocket")
            # Unirse al grupo de proyectos
            await self.channel_layer.group_add("proyectos", self.channel_name)
            await self.accept()
            logger.info("Conexión al WebSocket aceptada")
        except Exception as e:
            logger.error(f"Error al conectar al WebSocket: {e}")
            await self.close()

    async def disconnect(self, close_code):
        try:
            # Salirse del grupo de proyectos
            await self.channel_layer.group_discard("proyectos", self.channel_name)
            logger.info(f"Desconectado del WebSocket con código: {close_code}")
        except Exception as e:
            logger.error(f"Error al desconectar: {e}")

    # Recibir el mensaje desde el grupo
    async def enviar_mensaje(self, event):
        accion = event['accion']
        data = event['data']

        # Asegurarse de que 'data' no sea undefined
        if data is None:
            logger.error("Datos recibidos para el WebSocket son 'undefined'")
        else:
            logger.info(f"Datos recibidos para el WebSocket: {data}")

        # Enviar el mensaje de vuelta al WebSocket
        await self.send(text_data=json.dumps({
            'accion': accion,
            'data': data
        }))

        