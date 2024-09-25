# conversaciones/conversaciones.py
import os
from openai import AsyncOpenAI, OpenAIError
from dotenv import load_dotenv

load_dotenv()

# Leer la API key de OpenAI desde las variables de entorno
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Asegurarse de que la API key está definida
if OPENAI_API_KEY is None:
    raise ValueError("No se encontró la clave de API de OpenAI. Asegúrate de que esté definida en el archivo .env")

# Inicializar el cliente de OpenAI
client = AsyncOpenAI(api_key=OPENAI_API_KEY)  # Usa AsyncOpenAI para llamadas asíncronas

# Función para generar respuesta de IA1
async def generar_respuesta_ia1(contexto):
    try:
        respuesta = await client.chat.completions.create(
            model='gpt-4o-mini',
            messages=contexto,
            max_tokens=150,  # Establece el número máximo de tokens para la respuesta
            temperature=0.7
        )
        return respuesta.choices[0].message.content.strip()
    except OpenAIError as e:
        print(f"Error de petición en IA1: {e}")
        return "Lo siento, ocurrió un error al generar la respuesta de IA1."
    except Exception as e:
        print(f"Error inesperado en IA1: {e}")
        return "Lo siento, ocurrió un error inesperado en IA1."

# Función para generar respuesta de IA2
async def generar_respuesta_ia2(contexto):
    try:
        respuesta = await client.chat.completions.create(
            model='gpt-4o-mini',
            messages=contexto,
            max_tokens=150,  # Establece el número máximo de tokens para la respuesta
            temperature=0.7
        )
        return respuesta.choices[0].message.content.strip()
    except OpenAIError as e:
        print(f"Error de petición en IA2: {e}")
        return "Lo siento, ocurrió un error al generar la respuesta de IA2."
    except Exception as e:
        print(f"Error inesperado en IA2: {e}")
        return "Lo siento, ocurrió un error inesperado en IA2."
