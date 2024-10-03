from django.http import JsonResponse
from rest_framework.decorators import api_view
from .chatbot_laura_logic import ChatbotLauraLogic

# Inicializar el chatbot globalmente para que se cargue solo una vez
chatbot_logic = ChatbotLauraLogic()

@api_view(['POST'])
def chatbot_laura_view(request):
    """
    Vista para procesar las solicitudes del chatbot Laura.
    """
    try:
        # Obtener el mensaje enviado por el usuario desde el cuerpo del POST
        mensaje = request.data.get('mensaje', '')
        if not mensaje:
            return JsonResponse({'error': 'No se proporcionó el mensaje'}, status=400)
        
        # Realizar la búsqueda utilizando la lógica del chatbot
        resultados = chatbot_logic.search(mensaje)

        # Devolver los resultados como una respuesta JSON
        return JsonResponse({'resultados': resultados}, status=200)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
