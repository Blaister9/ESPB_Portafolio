# conversaciones/conversacion_logic.py
import threading
from .conversaciones import generar_respuesta_ia1, generar_respuesta_ia2  # Importamos las funciones desde conversaciones.py

# Estado global para controlar las conversaciones y el campo de usuario (temporal)
conversacion = []
tema_inicial = None
turnos_maximos = 5
turno_actual = 0
chat_bloqueado = False

# Función para manejar el flujo de la conversación
def manejar_conversacion(tema):
    global conversacion, turno_actual, chat_bloqueado

    # Reiniciar el estado de la conversación y variables
    turno_actual = 0
    chat_bloqueado = False
    conversacion.clear()

    # Crear historial de conversación acumulado para IA1
    historial_conversacion_ia1 = [
        {'role': 'system', 'content': "Eres IA1, un maestro de matemáticas especializado en fracciones y porcentajes. Además de responder, debes buscar errores o simplificaciones excesivas en los argumentos de IA2 y sugerir ejemplos alternativos para mejorar la claridad."},
        {'role': 'user', 'content': f"Tema inicial: {tema}"}
    ]

    # IA1 inicia la conversación respondiendo al tema inicial
    respuesta_ia1 = generar_respuesta_ia1(historial_conversacion_ia1)
    conversacion.append({'autor': 'IA1', 'mensaje': respuesta_ia1})
    
    # Crear historial de conversación acumulado para IA2, respondiendo a IA1
    historial_conversacion_ia2 = [
        {'role': 'system', 'content': "Eres IA2, un físico espacial que investiga el impacto de la actividad solar en el campo magnético terrestre. Debes criticar las simplificaciones de IA1 y asegurarte de que las explicaciones sean lo suficientemente técnicas, sin perder precisión."},
        {'role': 'user', 'content': respuesta_ia1}
    ]

    # Iniciar el ciclo de la conversación
    while turno_actual < turnos_maximos:
        # IA2 responde a IA1
        respuesta_ia2 = generar_respuesta_ia2(historial_conversacion_ia2)
        conversacion.append({'autor': 'IA2', 'mensaje': respuesta_ia2})

        # Añadir la respuesta de IA2 al historial de IA1 como 'user'
        historial_conversacion_ia1.append({'role': 'user', 'content': respuesta_ia2})

        # IA1 responde a IA2
        respuesta_ia1 = generar_respuesta_ia1(historial_conversacion_ia1)
        conversacion.append({'autor': 'IA1', 'mensaje': respuesta_ia1})

        # Añadir la respuesta de IA1 al historial de IA2 como 'user'
        historial_conversacion_ia2.append({'role': 'user', 'content': respuesta_ia1})

        turno_actual += 1

    chat_bloqueado = True

# Función para obtener el estado actual de la conversación
def obtener_estado_conversacion():
    return {'conversacion': conversacion, 'chat_bloqueado': chat_bloqueado}
