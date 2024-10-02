# mi_portafolio/asgi.py
import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import conversaciones.routing
import proyectos.routing
import chatbot_laura.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mi_portafolio.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            conversaciones.routing.websocket_urlpatterns +
            proyectos.routing.websocket_urlpatterns +
            chatbot_laura.routing.websocket_urlpatterns
        )
    ),
})
