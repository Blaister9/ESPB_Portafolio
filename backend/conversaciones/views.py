# conversaciones/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .conversacion_logic import obtener_estado_conversacion

@api_view(['POST'])
def iniciar_conversacion(request):
    try:
        tema = request.data.get('tema')
        if not tema:
            return Response({'error': 'El tema no puede estar vacío'}, status=status.HTTP_400_BAD_REQUEST)

        # Preparar el estado o iniciar alguna acción si es necesario (puedes personalizar esto)
        return Response({'status': 'Tema recibido, la conversación comenzará en WebSocket'})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def obtener_conversacion(request):
    estado = obtener_estado_conversacion()
    return Response(estado)
