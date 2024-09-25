from django.urls import path
from . import views

urlpatterns = [
    path('iniciar_conversacion/', views.iniciar_conversacion),
    path('obtener_conversacion/', views.obtener_conversacion),
]
