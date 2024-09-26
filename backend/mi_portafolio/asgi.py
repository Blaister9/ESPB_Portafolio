# mi_portafolio/asgi.py
import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import conversaciones.routing
import proyectos.routing  # Importar las rutas de proyectos

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mi_portafolio.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            conversaciones.routing.websocket_urlpatterns +
            proyectos.routing.websocket_urlpatterns  # Añadir las rutas de proyectos
        )
    ),
})
