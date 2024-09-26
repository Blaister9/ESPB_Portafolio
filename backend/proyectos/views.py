# proyectos/views.py
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Proyecto
from .serializers import ProyectoSerializer
from .services import obtener_proyectos_github

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

    def perform_create(self, serializer):
        proyecto = serializer.save()
        self.enviar_actualizacion_proyecto(proyecto, 'create')

    def perform_update(self, serializer):
        proyecto = serializer.save()
        self.enviar_actualizacion_proyecto(proyecto, 'update')

    def perform_destroy(self, instance):
        instance_id = instance.id
        instance.delete()
        self.enviar_actualizacion_proyecto({'id': instance_id}, 'delete')

    def enviar_actualizacion_proyecto(self, data, accion):
        channel_layer = get_channel_layer()
        if data:
            # Serializamos el proyecto solo si no es una acción de 'delete'
            serializado = ProyectoSerializer(data).data if accion != 'delete' else data

            # Enviar el mensaje al grupo de WebSocket
            async_to_sync(channel_layer.group_send)(
                'proyectos',  # Nombre del grupo de WebSocket
                {
                    'type': 'enviar_mensaje',
                    'accion': accion,
                    'data': serializado  # Datos correctamente serializados
                }
            )
        else:
            logger.error("Datos para enviar_actualizacion_proyecto son undefined")


@api_view(['GET'])
def obtener_proyectos_github_view(request, username):
    proyectos = obtener_proyectos_github(username)
    if proyectos is not None:
        return Response(proyectos)
    else:
        return Response({'error': 'No se pudieron obtener los proyectos de GitHub.'}, status=400)
