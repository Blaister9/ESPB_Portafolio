from openai import OpenAI
import pandas as pd
import json
import faiss
import numpy as np
import os
import pickle
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()

# Leer la API key de OpenAI desde las variables de entorno
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

# Actualizar las rutas de los archivos
data_dir = os.path.join(settings.BASE_DIR, "data")
embedding_file = os.path.join(data_dir, "embeddings.pkl")
index_file = os.path.join(data_dir, "faiss_index.index")
json_file = os.path.join(data_dir, "preguntas_respuestas_procesadasV1.json")

def get_embedding(text, model="text-embedding-ada-002"):
    response = client.embeddings.create(input=text, model=model)
    return response.data[0].embedding

def save_embeddings(embeddings, file_name):
    with open(file_name, 'wb') as f:
        pickle.dump(embeddings, f)

def load_embeddings(file_name):
    with open(file_name, 'rb') as f:
        return pickle.load(f)

def process_data(json_file):
    with open(json_file, "r") as file:
        data = json.load(file)

    processed_data = []
    for item in data:
        if item['type'] == 'qa':
            text_for_embedding = f"{item['content']['pregunta']} {item['content']['respuesta']}"
        elif item['type'] == 'info':
            text_for_embedding = f"{item['content']['titulo']} {item['content'].get('descripcion', '')}"
        else:
            continue

        processed_data.append({
            'text_for_embedding': text_for_embedding,
            'full_content': item['content'],
            'type': item['type'],
            'url': item.get('url', ''),
            'metadata': item.get('metadata', {})
        })

    return pd.DataFrame(processed_data)

def initialize_or_load_index(df):
    if os.path.exists(embedding_file) and os.path.exists(index_file):
        embeddings = load_embeddings(embedding_file)
        index = faiss.read_index(index_file)
    else:
        df['embedding'] = df['text_for_embedding'].apply(lambda x: get_embedding(x))
        embedding_matrix = np.array(df['embedding'].tolist()).astype('float32')
        embedding_matrix /= np.linalg.norm(embedding_matrix, axis=1)[:, None]
        
        index = faiss.IndexFlatIP(embedding_matrix.shape[1])
        index.add(embedding_matrix)
        
        save_embeddings(df['embedding'].tolist(), embedding_file)
        faiss.write_index(index, index_file)
        embeddings = df['embedding'].tolist()

    return index, embeddings

def search(query, df, index, k=3):
    logger.info(f"Iniciando búsqueda para query: {query}")
    try:
        query_embedding = np.array(get_embedding(query)).astype('float32')
        query_embedding /= np.linalg.norm(query_embedding)
        D, I = index.search(np.array([query_embedding]), k)
    
        results = []
        for i in range(k):
            result = df.iloc[I[0][i]]
            results.append({
                'content': result['full_content'],
                'url': result['url'],
                'type': result['type'],
                'metadata': result['metadata'],
                'similarity_score': float(D[0][i])
            })
        logger.info(f"Búsqueda completada. Resultados: {results}")
        return results
    except Exception as e:
        logger.error(f"Error durante la búsqueda: {e}")
        return []

# Initialize data and index
df = process_data(json_file)
index, embeddings = initialize_or_load_index(df)
logger.info("Dataframe e índice inicializados")
