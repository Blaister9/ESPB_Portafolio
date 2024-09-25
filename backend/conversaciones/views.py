# conversaciones/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .conversacion_logic import manejar_conversacion, obtener_estado_conversacion

@api_view(['POST'])
def iniciar_conversacion(request):
    tema = request.data.get('tema')
    manejar_conversacion(tema)
    return Response({'status': 'Conversación iniciada'})

@api_view(['GET'])
def obtener_conversacion(request):
    estado = obtener_estado_conversacion()
    return Response(estado)
