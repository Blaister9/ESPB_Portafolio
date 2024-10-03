# chatbot_laura/routing.py
from django.urls import path
from .consumers import LauraChatConsumer

websocket_urlpatterns = [
    path('ws/laura-chat/', LauraChatConsumer.as_asgi()),
]
