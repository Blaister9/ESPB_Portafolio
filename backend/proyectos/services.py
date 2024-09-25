# proyectos/services.py
import requests

def obtener_proyectos_github(username):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()  # Devuelve la lista de repositorios en formato JSON
    else:
        return None
