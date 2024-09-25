# proyectos/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import obtener_proyectos_github
from .models import Proyecto
from .serializers import ProyectoSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

@api_view(['GET'])
def obtener_proyectos_github_view(request, username):
    proyectos = obtener_proyectos_github(username)
    
    if proyectos is not None:
        return Response(proyectos)
    else:
        return Response({'error': 'No se pudieron obtener los proyectos de GitHub.'}, status=400)
