from django.urls import path
from .views import chatbot_laura_view

urlpatterns = [
    path('chatbot-laura/', chatbot_laura_view, name='chatbot_laura'),
]
