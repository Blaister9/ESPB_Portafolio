import os
from openai import AsyncOpenAI, OpenAIError
from dotenv import load_dotenv
import logging

load_dotenv()

# Configurar logger
logger = logging.getLogger(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if OPENAI_API_KEY is None:
    raise ValueError("No se encontró la clave de API de OpenAI. Asegúrate de que esté definida en el archivo .env")

client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# Función para generar respuesta con GPT-4
async def generar_respuesta_gpt4(resultados):
    try:
        logger.info("Resultados enviados a GPT-4: %s", resultados)
        prompt = "He encontrado la siguiente información relacionada con tu consulta:\n\n"
        
        for i, resultado in enumerate(resultados):
            if resultado.get('pregunta') and resultado.get('respuesta'):
                prompt += f"Pregunta {i + 1}: {resultado['pregunta']}\n"
                prompt += f"Respuesta: {resultado['respuesta']}\n\n"
            elif resultado.get('type') == 'info':
                prompt += f"Información adicional: {resultado['metadata'].get('categoria', 'N/A')}\n"
                prompt += f"URL: {resultado['url']}\n\n"
        
        logger.info("Prompt enviado a GPT-4: %s", prompt)

        respuesta = await client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[{"role": "system", "content": prompt}],
            max_tokens=500,
            temperature=0.3
        )

        logger.info("Respuesta recibida de GPT-4: %s", respuesta)
        return respuesta.choices[0].message.content.strip()

    except OpenAIError as e:
        logger.error(f"Error de petición a GPT-4: {e}")
        return "Lo siento, ocurrió un error al generar la respuesta con GPT-4."
    except Exception as e:
        logger.error(f"Error inesperado con GPT-4: {e}")
        return "Lo siento, ocurrió un error inesperado al generar la respuesta."
