from django.urls import re_path
from .consumers import LauraChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/laura_chat/$', LauraChatConsumer.as_asgi()),
]