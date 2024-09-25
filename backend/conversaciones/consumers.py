# conversaciones/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Aceptamos la conexión
        await self.accept()

    async def disconnect(self, close_code):
        # Al desconectar, no hacemos nada especial de momento
        pass

    # Recibimos el mensaje desde el WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        mensaje = text_data_json['mensaje']

        # Enviar el mensaje de vuelta al WebSocket
        await self.send(text_data=json.dumps({
            'mensaje': mensaje
        }))
