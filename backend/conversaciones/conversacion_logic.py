# conversaciones/conversacion_logic.py
from .conversaciones import generar_respuesta_ia1, generar_respuesta_ia2  # Importamos las funciones desde conversaciones.py
import json


conversacion = []
chat_bloqueado = False

# Función para manejar el flujo de la conversación
async def manejar_conversacion(tema, consumer):
    turno_actual = 0
    turnos_maximos = 2

    # Crear historial de conversación acumulado para IA1
    historial_conversacion_ia1 = [
        {'role': 'system', 'content': "Eres IA1, un maestro de matemáticas especializado en fracciones y porcentajes. Además de responder, debes buscar errores o simplificaciones excesivas en los argumentos de IA2 y sugerir ejemplos alternativos para mejorar la claridad."},
        {'role': 'user', 'content': f"Tema inicial: {tema}"}
    ]

    # IA1 inicia la conversación respondiendo al tema inicial
    respuesta_ia1 = await generar_respuesta_ia1(historial_conversacion_ia1)  # Llamada asíncrona
    await consumer.send(text_data=json.dumps({'autor': 'IA1', 'mensaje': respuesta_ia1}))  # Enviar al cliente inmediatamente

    # Crear historial de conversación acumulado para IA2, respondiendo a IA1
    historial_conversacion_ia2 = [
        {'role': 'system', 'content': "Eres IA2, un físico espacial que investiga el impacto de la actividad solar en el campo magnético terrestre. Debes criticar las simplificaciones de IA1 y asegurarte de que las explicaciones sean lo suficientemente técnicas, sin perder precisión."},
        {'role': 'user', 'content': respuesta_ia1}
    ]

    # Iniciar el ciclo de la conversación
    while turno_actual < turnos_maximos:
        # IA2 responde a IA1
        respuesta_ia2 = await generar_respuesta_ia2(historial_conversacion_ia2)  # Llamada asíncrona
        await consumer.send(text_data=json.dumps({'autor': 'IA2', 'mensaje': respuesta_ia2}))  # Enviar al cliente inmediatamente

        # Añadir la respuesta de IA2 al historial de IA1 como 'user'
        historial_conversacion_ia1.append({'role': 'user', 'content': respuesta_ia2})

        # IA1 responde a IA2
        respuesta_ia1 = await generar_respuesta_ia1(historial_conversacion_ia1)  # Llamada asíncrona
        await consumer.send(text_data=json.dumps({'autor': 'IA1', 'mensaje': respuesta_ia1}))  # Enviar al cliente inmediatamente

        # Añadir la respuesta de IA1 al historial de IA2 como 'user'
        historial_conversacion_ia2.append({'role': 'user', 'content': respuesta_ia1})

        turno_actual += 1


def obtener_estado_conversacion():
    return {'conversacion': conversacion, 'chat_bloqueado': chat_bloqueado}


    