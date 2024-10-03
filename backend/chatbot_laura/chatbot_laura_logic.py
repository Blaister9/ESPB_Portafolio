import os
import pandas as pd
import numpy as np
import faiss
import pickle
from openai import AsyncOpenAI, OpenAIError
from dotenv import load_dotenv
import logging

# Configurar logging
logger = logging.getLogger(__name__)

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Inicializar el cliente de OpenAI de forma asíncrona
client = AsyncOpenAI(api_key=OPENAI_API_KEY)


class ChatbotLauraLogic:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.embedding_file = os.path.join(base_dir, 'embeddings.pkl')
        self.index_file = os.path.join(base_dir, 'faiss_index.index')
        self.json_file = os.path.join(base_dir, 'preguntas_respuestas_procesadasV1.json')
        self.df = None
        self.embeddings = None
        self.index = None
        self.load_or_generate_index()

    def load_or_generate_index(self):
        try:
            if os.path.exists(self.embedding_file) and os.path.exists(self.index_file):
                logger.info("Cargando embeddings y FAISS index desde archivo...")
                self.embeddings = self.load_embeddings(self.embedding_file)
                self.index = faiss.read_index(self.index_file)
            else:
                logger.info("Generando nuevos embeddings y FAISS index...")
                self.df = self.load_and_process_data(self.json_file)
                if self.df is not None:
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
            logger.error(f"Error al cargar embeddings: {str(e)}")
            raise

    def load_and_process_data(self, json_file):
        try:
            with open(json_file, "r") as file:
                data = json.load(file)
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
            return pd.DataFrame(processed_data)
        except Exception as e:
            logger.error(f"Error al procesar el archivo JSON: {str(e)}")
            return None

    def generate_faiss_index(self):
        try:
            self.df['embedding'] = self.df['text_for_embedding'].apply(lambda x: self.get_embedding(x))
            embedding_matrix = np.array(self.df['embedding'].tolist()).astype('float32')
            embedding_matrix /= np.linalg.norm(embedding_matrix, axis=1)[:, None]
            self.index = faiss.IndexFlatIP(embedding_matrix.shape[1])
            self.index.add(embedding_matrix)
        except Exception as e:
            logger.error(f"Error al generar el índice FAISS: {str(e)}")
            raise

    async def get_embedding(self, text, model="text-embedding-ada-002"):
        try:
            response = await client.embeddings.create(input=text, model=model)
            return response.data[0].embedding
        except OpenAIError as e:
            logger.error(f"Error al obtener embedding: {str(e)}")
            raise

    async def search(self, query, k=3):
        try:
            query_embedding = np.array(await self.get_embedding(query)).astype('float32')
            query_embedding /= np.linalg.norm(query_embedding)
            D, I = self.index.search(np.array([query_embedding]), k)
            results = []
            for i in range(k):
                result = self.df.iloc[I[0][i]]
                results.append({
                    'pregunta': result['full_content'].get('pregunta', ''),
                    'respuesta': result['full_content'].get('respuesta', ''),
                    'url': result['url'],
                    'type': result['type'],
                    'metadata': result['metadata'],
                    'similarity_score': float(D[0][i])
                })
            return results
        except Exception as e:
            logger.error(f"Error en la búsqueda: {str(e)}")
            raise
