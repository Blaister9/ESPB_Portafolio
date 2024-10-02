import os
from openai import AsyncOpenAI, OpenAIError
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def generar_respuesta_gpt4(resultados):
    try:
        prompt = "Reformula esta información para el usuario:\n\n"
        for i, resultado in enumerate(resultados):
            prompt += f"Pregunta {i + 1}: {resultado.get('pregunta', '')}\n"
            prompt += f"Respuesta: {resultado.get('respuesta', '')}\n\n"

        respuesta = await client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[{"role": "system", "content": prompt}],
            max_tokens=500,
            temperature=0.3
        )

        return respuesta.choices[0].message.content.strip()

    except OpenAIError as e:
        return f"Error en la respuesta GPT-4: {str(e)}"
    except Exception as e:
        return f"Error inesperado con GPT-4: {str(e)}"
