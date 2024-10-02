from django.urls import path
from .views import ChatbotLauraView

urlpatterns = [
    path('chatbot-laura/', ChatbotLauraView.as_view(), name='chatbot_laura'),
]