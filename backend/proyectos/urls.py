# proyectos/urls.py
from rest_framework.routers import DefaultRouter
from .views import ProyectoViewSet, obtener_proyectos_github_view
from django.urls import path

router = DefaultRouter()
router.register(r'proyectos', ProyectoViewSet, basename='proyecto')

urlpatterns = router.urls
urlpatterns += [
    path('github/<str:username>/', obtener_proyectos_github_view),
]
