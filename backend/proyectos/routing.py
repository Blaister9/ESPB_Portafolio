# proyectos/routing.py
from django.urls import path
from .consumers import ProyectoConsumer

websocket_urlpatterns = [
    path('ws/proyectos/', ProyectoConsumer.as_asgi()),  # Ruta WebSocket para proyectos
]
