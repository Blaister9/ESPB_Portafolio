# chatbot_laura/gpt4_integration.py
import os
from openai import AsyncOpenAI, OpenAIError
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if OPENAI_API_KEY is None:
    raise ValueError("No se encontró la clave de API de OpenAI. Asegúrate de que esté definida en el archivo .env")

client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# Función para generar respuesta con GPT-4
async def generar_respuesta_gpt4(resultados):
    try:
        # Crear el prompt basado en los resultados del RAG
        prompt = "He encontrado la siguiente información. Por favor, reformúlala de manera clara y amigable para el usuario:\n\n"
        
        for i, resultado in enumerate(resultados):
            if resultado.get('pregunta') and resultado.get('respuesta'):
                prompt += f"Pregunta {i + 1}: {resultado['pregunta']}\n"
                prompt += f"Respuesta: {resultado['respuesta']}\n\n"

        respuesta = await client.chat.completions.create(
            model='gpt-4o-mini',  # Puedes ajustar el modelo si es necesario
            messages=[{"role": "system", "content": prompt}],
            max_tokens=500,
            temperature=0.3
        )

        return respuesta.choices[0].message.content.strip()
    
    except OpenAIError as e:
        print(f"Error de petición a GPT-4: {e}")
        return "Lo siento, ocurrió un error al generar la respuesta con GPT-4."
    except Exception as e:
        print(f"Error inesperado con GPT-4: {e}")
        return "Lo siento, ocurrió un error inesperado al generar la respuesta."
