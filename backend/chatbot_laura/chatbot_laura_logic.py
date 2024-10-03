import os
import pandas as pd
import json
import faiss
import numpy as np
import pickle
from openai import OpenAI
from dotenv import load_dotenv
import logging

# Configurar logging para Django
logger = logging.getLogger(__name__)

# Cargar variables de entorno
load_dotenv()

# Configurar la API Key de OpenAI desde variables de entorno
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)
class ChatbotLauraLogic:
    def __init__(self):
        # Definir las rutas a los archivos embeddings y FAISS
        self.embedding_file = os.path.join(settings.BASE_DIR, 'data', 'embeddings.pkl')
        self.index_file = os.path.join(settings.BASE_DIR, 'data', 'faiss_index.index')

        self.df = None
        self.embeddings = None
        self.index = None

        # Cargar o generar el índice y el DataFrame
        self.load_or_generate_index()

    def load_or_generate_index(self):
        """
        Carga los embeddings, el DataFrame y el índice FAISS si existen, 
        o los genera a partir del archivo JSON si no existen.
        """
        try:
            # Cargar embeddings y FAISS si existen
            if os.path.exists(self.embedding_file) and os.path.exists(self.index_file):
                logger.info("Cargando embeddings y FAISS index desde archivo...")
                self.embeddings = self.load_embeddings(self.embedding_file)
                self.index = faiss.read_index(self.index_file)
                logger.info(f"Embeddings y FAISS cargados con éxito. Cantidad de embeddings: {len(self.embeddings)}")

                # Cargar el DataFrame
                self.df = self.load_and_process_data()  
                if self.df is None:
                    logger.error("Error: El DataFrame no se cargó correctamente desde el archivo JSON.")
                else:
                    logger.info(f"DataFrame cargado correctamente con {len(self.df)} filas.")
                
            else:
                # Generar nuevos embeddings y FAISS si no existen
                logger.info("Generando nuevos embeddings y FAISS index...")
                self.df = self.load_and_process_data()
                if self.df is not None:
                    logger.info(f"DataFrame cargado con {len(self.df)} filas.")
                    self.generate_faiss_index()
                else:
                    raise ValueError("Error al cargar el DataFrame desde el archivo JSON.")
        except Exception as e:
            logger.error(f"Error en load_or_generate_index: {str(e)}")
            raise

    def load_embeddings(self, file_name):
        try:
            with open(file_name, 'rb') as f:
                return pickle.load(f)
        except Exception as e:
            logger.error(f"Error al cargar los embeddings: {str(e)}")
            raise

    def save_embeddings(self, embeddings, file_name):
        """
        Guardar los embeddings en un archivo pickle.
        """
        try:
            with open(file_name, 'wb') as f:
                pickle.dump(embeddings, f)
        except Exception as e:
            logger.error(f"Error al guardar embeddings: {str(e)}")
            raise

    def load_and_process_data(self):
        """
        Cargar y procesar los datos desde el archivo JSON.
        """
        try:
            # Construir la ruta usando BASE_DIR y la carpeta 'data'
            json_file = os.path.join(settings.BASE_DIR, 'data', 'preguntas_respuestas_procesadasV1.json')
            logger.info(f"Intentando cargar el archivo JSON desde: {json_file}")
            
            # Verificar si el archivo existe
            if not os.path.exists(json_file):
                logger.error("El archivo JSON no existe.")
                return None

            # Cargar el JSON
            with open(json_file, "r") as file:
                data = json.load(file)

            if len(data) == 0:
                logger.error("El archivo JSON está vacío.")
                return None

            # Procesar los datos y convertirlos en un DataFrame
            processed_data = []
            for item in data:
                if item['type'] == 'qa':
                    text_for_embedding = f"{item['content']['pregunta']} {item['content']['respuesta']}"
                    processed_data.append({
                        'text_for_embedding': text_for_embedding,
                        'full_content': item['content'],
                        'type': 'qa',
                        'url': item.get('url', ''),
                        'metadata': item.get('metadata', {})
                    })
                elif item['type'] == 'info':
                    text_for_embedding = f"{item['content']['titulo']} {item['content'].get('descripcion', '')}"
                    processed_data.append({
                        'text_for_embedding': text_for_embedding,
                        'full_content': item['content'],
                        'type': 'info',
                        'url': item.get('url', ''),
                        'metadata': item.get('metadata', {})
                    })

            if not processed_data:
                logger.error("No se procesaron datos del archivo JSON.")
                return None
            
            df = pd.DataFrame(processed_data)
            logger.info(f"DataFrame cargado con {len(df)} filas.")
            return df
        except Exception as e:
            logger.error(f"Error al cargar y procesar el archivo JSON: {str(e)}")
            return None

    def get_embedding(self, text, model="text-embedding-ada-002"):
        try:
            response = client.embeddings.create(input=text, model=model)
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error al obtener embedding: {str(e)}")
            raise

    def search(self, query, k=3):
        try:
            query_embedding = np.array(self.get_embedding(query)).astype('float32')
            query_embedding /= np.linalg.norm(query_embedding)
            D, I = self.index.search(np.array([query_embedding]), k)

            results = []
            for i in range(k):
                result = self.df.iloc[I[0][i]]
                results.append({
                    'pregunta': result['full_content'].get('pregunta', ''),
                    'respuesta': result['full_content'].get('respuesta', ''),
                    'url': result['url'],
                    'metadata': result['metadata'],
                    'similarity_score': float(D[0][i])
                })
            return results
        except Exception as e:
            logger.error(f"Error en la búsqueda: {str(e)}")
            raise
