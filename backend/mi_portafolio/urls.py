from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('conversaciones.urls')),
    path('api/', include('proyectos.urls')),
    path('api/', include('chatbot_laura.urls')),
]
