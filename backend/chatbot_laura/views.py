from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .chatbot_laura_logic import ChatbotLauraLogic
import json
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
async def chatbot_laura_view(request):
    try:
        data = json.loads(request.body)
        query = data.get('mensaje', '')
        if not query:
            return Response({'error': 'No se proporcionó el mensaje'}, status=status.HTTP_400_BAD_REQUEST)

        chatbot_logic = ChatbotLauraLogic()
        resultados = await chatbot_logic.search(query)

        # Aquí se podría usar GPT-4 para refinar la respuesta
        respuesta_gpt4 = await generar_respuesta_gpt4(resultados)
        
        return Response({'respuesta': respuesta_gpt4}, status=status.HTTP_200_OK)

    except json.JSONDecodeError:
        logger.error("Error decoding JSON")
        return Response({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error in post method: {str(e)}")
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
